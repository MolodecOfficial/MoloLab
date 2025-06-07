<script setup lang="ts">
defineProps<{
  isLoading: boolean;
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
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    border-top-color: #3498db;
  }
  50% {
    border-top-color: #2980b9;
  }
  100% {
    transform: rotate(360deg);
    border-top-color: #3498db;
  }
}
</style>