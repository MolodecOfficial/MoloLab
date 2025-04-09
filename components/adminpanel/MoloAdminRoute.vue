<script setup lang="ts">

</script>

<template>
  <section class="admin-route-list">
    <NuxtLink class="route" to="/adminPanel/users">Пользователи</NuxtLink>
    <NuxtLink class="route" to="/adminPanel/messages">Мессенджер</NuxtLink>
    <NuxtLink class="route" to="/adminPanel/schedule">Расписание</NuxtLink>
  </section>
</template>

<style scoped>
.admin-route-list {
  min-height: 100%;
  width: fit-content;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}


.route {
  color: whitesmoke;
  text-decoration: none;
  font-size: 20px;
  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 3px;
  }
}

</style>