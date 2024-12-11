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
import admin from 'public/account/routeList/admin.png'
import {onMounted} from "vue";

const props = defineProps({
  darkTheme: Boolean,
  toggleTheme: Function,
});

const userStatus = ref('')

const userStore = useUserStore()

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    userStatus.value = user.status
  } else {
    userStatus.value = userStore.userStatus
  }
});

</script>

<template>
  <section class="routeList" :class="{ 'dark-theme': darkTheme }">
    <section class="routeList_container">
      <NuxtLink class="route" to="/account">
        <img :src="home" alt="">
        <span>Главная</span>
      </NuxtLink>
      <NuxtLink class="route" to="/account/news">
        <img :src="news" alt="">
        <span>Новости</span>
      </NuxtLink>
      <NuxtLink class="route" to="/account/schedule">
        <img :src="schedule" alt="">
        <span>Расписание</span>
      </NuxtLink>
      <div class="link-container">
        <NuxtLink class="route">
          <img :src="learning" alt="" class="icon">
          <span>Обучение</span>
        </NuxtLink>
        <div class="popup-links">
          <NuxtLink class="popup-link" to="/in-progress">Успеваемость</NuxtLink>
          <NuxtLink class="popup-link" to="/in-progress">Онлайн дисциплины</NuxtLink>
          <NuxtLink class="popup-link" to="/in-progress">Мои работы</NuxtLink>
          <NuxtLink class="popup-link" to="/in-progress">Защита ВКР</NuxtLink>
          <NuxtLink class="popup-link" to="/in-progress">Учебный план</NuxtLink>
          <NuxtLink class="popup-link" to="/in-progress">Результат освоения ООП</NuxtLink>
        </div>
      </div>
      <NuxtLink class="route" to="/in-progress">
        <img :src="chat" alt="">
        <span>Сообщения</span>
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="tracking" alt="">
        <span>Индивидуальный трек</span>
      </NuxtLink>
      <NuxtLink class="route" to="/account/achievements">
        <img :src="achievements" alt="">
        <span>Достижения</span>
      </NuxtLink>
      <NuxtLink class="route" to="/account/readers-form">
        <img :src="read" alt="">
        <span>Читательский формуляр</span>
      </NuxtLink>
      <div class="link-container">
        <NuxtLink class="route">
          <img :src="money" alt="" class="icon">
          <span>Финансы</span>
        </NuxtLink>
        <div class="popup-links">
          <NuxtLink class="popup-link" to="/in-progress">Стипендия</NuxtLink>
          <NuxtLink class="popup-link" to="/in-progress">Оплата обучения</NuxtLink>
          <NuxtLink class="popup-link" to="/in-progress">Общежитие</NuxtLink>
        </div>
      </div>
      <NuxtLink class="route" to="/account/flip-list">
        <img :src="flipList" alt="">
        <span>Обходной</span>
      </NuxtLink>
      <NuxtLink class="route" to="/account/electronic-reception">
        <img :src="onlineNote" alt="">
        <span>Электронная приёмная</span>
      </NuxtLink>
      <NuxtLink class="route" to="/account/resources">
        <img :src="resources" alt="">
        <span>Ресурсы</span>
      </NuxtLink>
      <NuxtLink class="route" to="/in-progress">
        <img :src="rating" alt="">
        <span>Рейтинг</span>
      </NuxtLink>
      <NuxtLink class="route" to="/adminPanel" v-if="userStatus === 'Администратор' || userStatus === 'Владелец'">
        <img :src="admin" alt="">
        <span>Панель администратора</span>
      </NuxtLink>
    </section>
  </section>
</template>

<style scoped>
.routeList {
  display: flex;
  flex-direction: column;
  width: 13vw;
}

.routeList_container {
  min-height: 93vh;
  width: 100%;
  background-color: #ffffff;
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

.link-container {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: default;
}


.popup-links {
  position: absolute;
  top: 20%;
  left: 100%;
  width: 10vw;
  gap: 5px;
  padding: 10px 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: none;
  flex-direction: column;
  z-index: 1000;
}

/* Всплывающая ссылка */
.popup-link {
  display: flex;
  padding: 8px 12px;
  color: #333;
  text-decoration: none;
  font-size: 12px;
}

.popup-link:first-child {
 border-radius: 10px 10px 0 0;
}

.popup-link:last-child {
  border-radius: 0 0 10px 10px;
}

/* Показать всплывающие ссылки при наведении */
.link-container:hover .popup-links {
  display: flex;
}

/* Эффект при наведении на ссылку */
.popup-link:hover {
  background-color: #f5f5f5;
  color: #000;
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

.dark-theme .popup-links {
  background-color: #1a1a1a;
  border: 1px solid #343434;
}

.dark-theme .popup-link {
  color: white;
}

.dark-theme .popup-link:hover {
  background-color: #2c2c2c;
}


@media (max-width: 560px) {
  .route span {
    display: none; /* Прячем текст */
  }

  .route {
    justify-content: center;
    padding: 10px 10px;
  }

  .routeList {
    min-height: 100vh;
  }

  .popup-links {
    width: 200%;
  }
}

@media (min-width: 561px) and (max-width: 765px) {
  .route span {
    display: none; /* Прячем текст */
  }
  .popup-links {
    width: 200%;
  }
}

@media (min-width: 766px) and (max-width: 1280px) {
  .routeList {
    width: 8%;
  }

  .route span {
    display: none; /* Прячем текст */
  }
  .route {
    justify-content: center;
    padding: 10px 20px;
  }
  .popup-links {
    width: 200%;
  }

}
@media (min-width: 1281px) and (max-width: 1920px) {

  .route span {
    font-size: 14px;
  }

}
</style>