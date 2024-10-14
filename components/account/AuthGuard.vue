<script setup lang="ts">
const isAuthenticated = ref(false);

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('token');
});

</script>

<template>
  <div v-if="isAuthenticated">
    <slot></slot>
  </div>
  <div v-else>
    <p>Вы должны войти в систему, чтобы увидеть эту страницу.</p>
    <router-link to="/login">Войти</router-link>
  </div>
</template>

<style scoped>

</style>