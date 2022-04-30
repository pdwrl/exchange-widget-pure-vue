<template>
<div class="exchange-widget">
  <div
    v-for="index in [0, 1]"
    :key="index"
    class="exchange-widget__row exchange-widget-row"
  >
    <div class="exchange-widget-row__text">
      <span v-if="index === 0">I have</span>

      <span v-else>I want</span>
    </div>

    <base-select
      :model-value="wData.ticker[index]"
      :options="options[index].value"
      class="exchange-widget-row__control"
      @update:model-value="applyChange('ticker', index, $event)"
    />

    <base-input
      :model-value="wData.amount[index]"
      placeholder="amount"
      type="number"
      :debounce="700"
      :loading="index === indexLoading"
      class="exchange-widget-row__control exchange-widget-row__amount"
      @update:model-value="applyChange('amount', index, $event)"
    />
  </div>
</div>
</template>

<script setup>
import { defineExpose, defineProps, reactive, computed, ref } from 'vue'
import { getRates } from '../lib/api.js'
import BaseInput from './base/BaseInput'
import BaseSelect from './base/BaseSelect'

const tickers = ['USD', 'EUR', 'BTC', 'ETH']
const roundDigitsByTicker = {
  USD: 2,
  EUR: 2,
  BTC: 8,
  ETH: 8
}
const fee = 0.01

const anotherIndex = index => (index + 1) % 2
const tickersExlude = excludingTicker => tickers
  .filter(_ => _ !== excludingTicker)
const round = (num, digits) => (Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits))
  .toFixed(digits)

const props = defineProps({
  initTickers: {
    type: Array,
    default: () => ['USD', 'BTC']
  }
})

const wData = reactive({
  ticker: [...props.initTickers],
  amount: [null, null]
})

const options = [
  computed(() => tickersExlude(wData.ticker[1])),
  computed(() => tickersExlude(wData.ticker[0]))
]

const indexLoading = ref(null)

const applyChange = async (subject, index, value) => {
  wData[subject][index] = value
  if (wData.amount[index]) {
    const srcIndex = subject === 'ticker' ? anotherIndex(index) : index
    const targetIndex = anotherIndex(srcIndex)

    indexLoading.value = targetIndex
    const res = await getRates(wData.ticker[0], wData.ticker[1])
    indexLoading.value = null
    const rate = res.data.conversion_rate

    const k = srcIndex === 0 ? 1 : -1
    const x = Number(rate) ** k * Number(wData.amount[srcIndex])
    const targetRoundDigits = roundDigitsByTicker[wData.ticker[targetIndex]]
    wData.amount[targetIndex] = round(x + k * fee * x, targetRoundDigits)
  } else {
    wData.amount = [null, null]
  }
}

defineExpose({
  wData,
  tickers,
  options,
  indexLoading,
  applyChange
})
</script>

<style lang="scss">
@import '../style/app.scss';

.exchange-widget {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  padding: $bar;

  &__row {
    display: flex;
    align-items: center;

    &:nth-child(2) {
      margin-top: $bar;
    }
  }
}

.exchange-widget-row {
  &__text {
    width: $bar * 3;
  }

  &__control {
    margin-left: $bar;
  }

  &__amount {
    width: $bar * 7;
  }
}
</style>
