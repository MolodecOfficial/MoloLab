<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  },
});
</script>

<template>
  <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :type="type"
  />
</template>

<style scoped>
input {
  background-color: #f1f2f4;
  border: none;
  height: 30px;
  border-radius: 5px;
  padding: 2px 10px;
  &:focus {
    outline: 3px solid #bac9e7;
    padding: 2px 10px;
  }
}
</style>