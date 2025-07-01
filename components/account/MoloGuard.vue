<script setup lang="ts">
import { onMounted } from 'vue';

const userStatus = ref('')

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    userStatus.value = user.status;
  } else {
    console.log('No user data found in localStorage');
  }
});

function goBack() {
  window.history.back()
}

</script>

<template>
  <div v-if="userStatus === 'Преподаватель' || userStatus === 'Администратор' || userStatus === 'Владелец'">
    <slot></slot>
  </div>
  <div v-else class="ban">
    <section>
      <p>Добро пожаловать в загрузочный экран.</p>
      <p>Если вы сюда попали, значит вы пытались зайти на страницу, доступ к которой вам запрещён, или в данный момент идёт проверка Вашего статуса.</p>
      <p class="warn">Пользуйтесь сайтом честно.</p>
      <NuxtLink @click="goBack" class="back">Вернуться обратно</NuxtLink>
    </section>
  </div>
</template>

<style scoped>

.ban {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
}

section {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: black;
  color: whitesmoke;
  padding: 20px;
  font-size: 20px;
  border-radius: 20px;
  & p:first-child {
    font-size: 30px;
    padding: 10px;
    rotate: 4deg;
    border-radius: 10px;
    background-color: white;
    color: black;
  }
  & .back {
    background-color: whitesmoke;
    text-decoration: none;
    padding: 10px;
    border-radius: 10px;
    color: black;
    cursor: pointer;
    &:hover {
      text-decoration: underline 1px black;
      text-underline-offset: 3px;
    }
  }
}

.warn {
  color: red;
}
</style>