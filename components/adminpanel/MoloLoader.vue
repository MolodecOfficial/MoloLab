<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>

<template>
  <div v-if="isLoading">
    <div class="fun-loader">
      <div class="loader">
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fun-loader {
  display: flex;
  justify-content: center;
}

.loader {

  width: 300px;
  height: 10px;
  background: #333;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  & .dot {
    width: 0;
    background: linear-gradient(90deg, #ff6a00, #ab0028);
    height: 100%;
    box-shadow: 0 0 10px #ff6a00, 0 0 20px #ab0028;
    animation: bounce 2s forwards;
  }
}

@keyframes bounce {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>