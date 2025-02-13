<script setup lang="ts">
import { onMounted } from 'vue';

const userStatus = ref('')

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    userStatus.value = user.status
  }
});
</script>

<template>
  <div v-if="userStatus === 'Администратор', 'Владелец'">
    <slot></slot>
  </div>
  <div v-else>
    <p>Добро пожаловать в загрузочный экран.</p>
    <p>Если вы сюда попали, значит вы пытались зайти на страницу, доступ к которой вам запрещён.</p>
    <p class="warn">Пользуйтесь сайтом честно.</p>
    <router-link to="/applicant/account">Вернуться обратно</router-link>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.warn {
  color: red;
}
</style>