<script setup lang="ts">
defineProps<{
  isLoading?: boolean;
}>();
</script>

<template>
  <div v-if="isLoading" class="loader-container">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top: 3px solid #0099ff;
  border-bottom: 3px solid #ff1800;
  animation: spin 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>