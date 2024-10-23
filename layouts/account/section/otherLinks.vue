<script setup lang="ts">

import android from "public/account/Android.png";
import dormitory from "public/account/Dormitory.png";
import payments from "public/account/Payments.png";
import receipts from "public/account/Receipts.png";
import rating from "public/account/Rating.png";

import library from "public/account/Library.png";
import sdo from "public/account/SDO.png";
import timetable from "public/account/Timetable.png";
import testResult from "public/account/TestResult.png";
import info from "public/account/Info.png";

</script>

<template>
  <section class="other">
            <span>
              Прочее
            </span>
    <section class="otherLinks_container">
      <NuxtLink class="other_link" to="/in-progress">
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
      <NuxtLink class="other_link" to="/in-progress">
        <img :src="rating" alt="">
        Рейтинг
      </NuxtLink>
    </section>
  </section>
  <section class="other_2">
    <span>
      Образовательные ресурсы
    </span>
    <section class="otherLinks_container">
      <NuxtLink class="other_link" to="/in-progress">
        <img :src="library" alt="">
        Библиотека
      </NuxtLink>
      <NuxtLink class="other_link" to="/in-progress">
        <img :src="sdo" alt="">
        СДО Дистанционное образование
      </NuxtLink>
      <NuxtLink class="other_link" to="/in-progress">
        <img :src="timetable" alt="">
        Расписание занятий
      </NuxtLink>
      <NuxtLink class="other_link" to="/in-progress">
        <img :src="testResult" alt="">
        Система тестирования
      </NuxtLink>
      <NuxtLink class="other_link" to="/account/news">
        <img :src="info" alt="">
        Информация по образовательным программам
      </NuxtLink>
    </section>
  </section>
</template>

<style scoped>
.other {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.other_link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  gap: 10px;
  text-decoration: none;
  color: #022469;
  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 3px;
  }
}
.otherLinks_container {
  padding-left: 20px;
  padding-top: 20px;
  display: grid;
  justify-items: center;
  text-align: center;
  grid-template-columns: repeat(5, 1fr);
}
.other_2 {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
}
</style>