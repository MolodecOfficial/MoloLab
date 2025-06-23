<script setup lang="ts">

import android from "public/account/main/Android.png";
import dormitory from "public/account/main/Dormitory.png";
import payments from "public/account/main/Payments.png";
import receipts from "public/account/main/Receipts.png";
import rating from "public/account/main/Rating.png";

import library from "public/account/main/Library.png";
import sdo from "public/account/main/SDO.png";
import timetable from "public/account/main/Timetable.png";
import testResult from "public/account/main/TestResult.png";
import info from "public/account/main/Info.png";

const props = defineProps({
  darkTheme: Boolean,
  toggleTheme: Function,
});

</script>

<template>
  <section class="other-links" :class="{'dark-theme': darkTheme}">
    <section class="other">
      <span>Прочее</span>
      <section class="otherLinks_container">
        <NuxtLink class="other_link" to="https://ams.rusoil.net/oau/docs/ams.rusoil.net_usptuapp_2.0.1.sig.apk" target="_blank">
          <img :src="android" alt="">
          Версия ЛК на Android версия: 2.0.1
        </NuxtLink>
        <NuxtLink class="other_link" to="/in-progress">
          <img :src="dormitory" alt="">
          Общежитие
        </NuxtLink>
        <NuxtLink class="other_link" to="/in-progress">
          <img :src="payments" alt="">
          Выплаты
        </NuxtLink>
        <NuxtLink class="other_link" to="/in-progress">
          <img :src="receipts" alt="">
          Квитанции на оплату
        </NuxtLink>
        <NuxtLink class="other_link" to="/student/rating">
          <img :src="rating" alt="">
          Рейтинг
        </NuxtLink>
      </section>
    </section>
    <hr>
    <section class="other_2">
      <span>
      Образовательные ресурсы
      </span>
      <section class="otherLinks_container">
        <NuxtLink class="other_link" to="/in-progress">
          <img :src="library" alt="">
          Библиотека
        </NuxtLink>
        <NuxtLink class="other_link" to="https://do.rusoil.net/login/index.php" target="_blank">
          <img :src="sdo" alt="">
          СДО Дистанционное образование
        </NuxtLink>
        <NuxtLink class="other_link" to="/student/schedule">
          <img :src="timetable" alt="">
          Расписание занятий
        </NuxtLink>
        <NuxtLink class="other_link" to="https://testirov.rusoil.net/" target="_blank">
          <img :src="testResult" alt="">
          Система тестирования
        </NuxtLink>
        <NuxtLink class="other_link" to="/applicant/news">
          <img :src="info" alt="">
          Информация по образовательным программам
        </NuxtLink>
      </section>
    </section>
  </section>

</template>

<style scoped>

.other-links {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box; /* Гарантирует правильный расчет ширины с учетом отступов */
}

hr {
  width: 80%;
  height: 2px;
  border: none;
  background-color: #ccc; /* Нейтральный цвет */
  opacity: 0.2;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
}

.other {
  display: flex;
  align-items: center;
  flex-direction: column;

  & span {
    padding-top: 20px;
    color: #053969;
    font-size: 20px;
  }
}

.other_link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  gap: 10px;
  text-decoration: none;
  color: #5a87e7;

  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 3px;
  }
}

.otherLinks_container {
  display: grid;
  padding: 20px;
  justify-items: center;
  text-align: center;
  grid-template-columns: repeat(5, 1fr);
}

.other_2 {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 0 20px 0;

  span {
    padding-top: 10px;
    color: #053969;
    font-size: 20px;
  }

}


.dark-theme span {
  color: #c2c2c2;
}

.dark-theme .other-links {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
}

.dark-theme .other_link {
  color: white;
}

@media (max-width: 560px) {

  .otherLinks_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;

  }

}

@media (min-width: 561px) and (max-width: 765px) {
  .other-links {
    width: 100%;
  }

  .otherLinks_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
  }
  .other_link {

    padding: 0 10px;
  }
}

@media (min-width: 766px) and (max-width: 1280px) {
  .other_link img {
    width: 30%;
  }

  .other_link {
    font-size: 12px;
    width: 80%;
  }
}

</style>