<template>
<input
  :type="type"
  :value="modelValue"
  :placeholder="placeholder"
  class="base-input"
  :class="{'base-input--loading': loading === true}"
  @input="onInput"
/>
</template>

<script setup>
import { defineProps, defineEmits, defineExpose } from 'vue'
import { debounce as debounceFn } from '../../lib/helpers'

const props = defineProps({
  modelValue: {
    type: [String, Number]
  },
  type: {
    type: String
  },
  debounce: {
    type: Number,
    default: 300
  },
  placeholder: {
    type: String
  },
  loading: {
    type: Boolean
  }
})

const emit = defineEmits(['update:model-value'])

const onInput = debounceFn((ev) => {
  emit('update:model-value', ev.target.value)
}, props.debounce)

defineExpose({
  onInput,
  debounceFn
})
</script>

<style lang="scss">
@import '../../style/app.scss';

$spinnerSize: $baseElementHeight * 0.7;

.base-input {
  height: $baseElementHeight;
  box-sizing: border-box;

  &--loading {
    background: url('../../style/spinner.svg') right no-repeat;
    background-size: $spinnerSize $spinnerSize;
  }
}
</style>
