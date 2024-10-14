<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section>
    <p>{{ message }}</p>
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  & p {
    text-align: center;
  }
}
</style>