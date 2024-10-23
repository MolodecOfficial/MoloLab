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
    <p>Если вы видите эту страницу, значит в данный момент выполняется инициализация входа в систему</p>
    <p>Если по истечении минуты вас не перенаправило в систему, просьба заново выполнить вход</p>
    <router-link to="/login">Войти</router-link>
  </div>
</template>

<style scoped>

</style>