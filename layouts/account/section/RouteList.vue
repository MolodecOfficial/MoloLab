<script setup lang="ts">
import news from 'public/account/routeList/news.png'
import home from 'public/account/routeList/home.png'
import schedule from 'public/account/routeList/schedule.png'
import achievements from 'public/account/routeList/achievements.png'
import read from 'public/account/routeList/read.png'
import learning from 'public/account/routeList/learning.png'
import chat from 'public/account/routeList/chat.png'
import tracking from 'public/account/routeList/tracking.png'
import money from 'public/account/routeList/money.png'
import flipList from 'public/account/routeList/flip-list.png'
import onlineNote from 'public/account/routeList/online-note.png'
import resources from 'public/account/routeList/resources.png'
import rating from 'public/account/routeList/star-list.png'

const props = defineProps({
  darkTheme: Boolean,
  toggleTheme: Function,
});

</script>

<template>
  <section class="routeList" :class="{ 'dark-theme': darkTheme }">
    <section class="routeList_container">
      <NuxtLink class="route" to="/account/news">
        <img :src="news" alt="">
        Новости
      </NuxtLink>
      <NuxtLink class="route" to="/account">
        <img :src="home" alt="">
        Главная
      </NuxtLink>
      <NuxtLink class="route" to="/account/schedule">
        <img :src="schedule" alt="">
        Расписание
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="learning" alt="">
        Обучение
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="chat" alt="">
        Сообщения
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="tracking" alt="">
        Индивидуальный трек
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="achievements" alt="">
        Достижения
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="read" alt="">
        Читательский формуляр
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="money" alt="">
        Финансы
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="flipList" alt="">
        Обходной
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="onlineNote" alt="">
        Электронная приёмная
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="resources" alt="">
        Ресурсы
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="rating" alt="">
        Рейтинг
      </NuxtLink>
    </section>
  </section>
</template>

<style scoped>
.routeList {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 13vw;

}

.routeList_container {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  border-radius: 20px;
}
img {
  width: 30px;
}
.route {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 20px;
  text-decoration: none;
  transition: 1ms all ease-in-out;
  color: #919191;
  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 3px;
    color: black;
  }
}
.dark-theme {
  background-color: #333; /* Пример темной темы */
  color: white; /* Цвет текста в темной теме */
}

.dark-theme section {
  background-color: #1e1e1e;
}



.dark-theme .route {
  color: white;
}
</style>