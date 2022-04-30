<template>
<select
  class="base-select"
  @change="onSelect"
>
  <option
    v-for="(option, index) in options"
    :key="index"
    :value="option"
    :selected="modelValue === option"
    class="base-select__option"
  >
    {{ option }}
  </option>
</select>
</template>

<script setup>
import { defineProps, defineExpose, defineEmits } from 'vue'

defineProps({
  modelValue: {
    type: [String, Number]
  },
  options: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:model-value'])

const onSelect = (ev) => {
  emit('update:model-value', ev.target.value)
}

defineExpose({
  onSelect
})
</script>

<style lang="scss">
@import '../../style/app.scss';

.base-select {
  height: $baseElementHeight;
}
</style>
