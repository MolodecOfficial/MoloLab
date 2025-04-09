<script setup lang="ts">
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <select @change="handleChange" :value="modelValue">
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
</style>