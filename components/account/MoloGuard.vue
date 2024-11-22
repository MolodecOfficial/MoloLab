<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '~/stores/authStore';

const authStore = useAuthStore();

onMounted(() => {
  const user = localStorage.getItem('user');
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  authStore.isAuthenticated = !!user;
  authStore.isAdmin = admin && admin.email === 'MolodecOfficial';
});
</script>

<template>
  <div v-if="authStore.isAdmin">
    <slot></slot>
  </div>
  <div v-else>
    <p>В данный момент идёт инициализация входа</p>
    <p>Система ещё в разработке, поэтому вас может выбросить сюда просто так</p>
    <p>Прошу прощения за неудобства</p>
    <router-link to="/login">Войти</router-link>
  </div>
</template>

<style scoped>

</style>