<script setup lang="ts">
import { watch, ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

// Локальное значение, чтобы использовать v-model
const internalValue = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal;
});

watch(internalValue, (newVal) => {
  emit('update:modelValue', newVal);
});
</script>

<template>
  <select v-model="internalValue" :multiple="Array.isArray(modelValue)">
    <slot></slot>
  </select>
</template>

<style scoped>
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  background-color: #2c2c2c;
  color: white;
  margin-bottom: 20px;
  border: none;
}

select[multiple]:focus {
  border: none;
  outline: none;
}

</style>
