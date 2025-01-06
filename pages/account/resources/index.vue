<script setup lang="ts">
import library from "public/account/main/Library.png";
import sdo from "public/account/main/SDO.png";
import timetable from "public/account/main/Timetable.png";
import testResult from "public/account/main/TestResult.png";
import info from "public/account/main/Info.png";

useHead({
  title: 'УГНТУ | Ресурсы'
})
</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList />
    <section class="resources-container">
      <section class="resources-header">
        <span>Образовательные ресурсы</span>
      </section>
      <section class="otherLinks_container">
        <NuxtLink class="other_link" to="/in-progress">
          <img :src="library" alt="">
          <span>Библиотека</span>
        </NuxtLink>
        <NuxtLink class="other_link" to="https://do.rusoil.net/login/index.php">
          <img :src="sdo" alt="">
          <span>СДО Дистанционное образование</span>
        </NuxtLink>
        <NuxtLink class="other_link" to="/account/schedule">
          <img :src="timetable" alt="">
          <span>Расписание занятий</span>
        </NuxtLink>
        <NuxtLink class="other_link" to="/in-progress">
          <img :src="testResult" alt="">
          <span>Система тестирования</span>
        </NuxtLink>
        <NuxtLink class="other_link" to="/in-progress">
          <img :src="info" alt="">
          <span>Информация по образовательным программам</span>
        </NuxtLink>
      </section>
      <section class="feedback-header">
        <span>Обратная связь</span>
      </section>
      <section class="feedback_container">
      <span>
          Отзывы, замечания и предложения отправляйте на почту <a href="">oau@rusoil.net</a> c указанием темы личный кабинет студента.
      </span>
      </section>
    </section>

  </div>
</template>

<style scoped>

.container {
  display: flex;
  overflow-x: hidden;
  background-color: white;
}

.dark-theme .container {
  background-color: #1e1e1e;
}

.resources-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 30px;
  background-color: rgba(237, 244, 255, 0.82);
  min-height: 93vh;
  border-top-left-radius: 20px;
  border: 1px solid #e0e0e0;
}

.resources-header {
  background-color: #ffffff;
  width: 90%;
  height: 12vh;
  margin-top: 74px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  & span {
    font-size: 30px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.other_link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  width: 100%;
  text-decoration: none;
  color: #5a87e7;
  gap: 12px;
  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 3px;
  }
}

a {
  color: #4e45e3;
}

.otherLinks_container {
  display: grid;
  justify-items: center;
  text-align: center;
  grid-template-columns: repeat(5, 1fr);
  width: 90%;
  padding: 20px 0;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
}


.feedback-header {
  background-color: #ffffff;
  width: 90%;
  height: 11vh;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  & span {
    font-size: 30px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.feedback_container {
  display: flex;
  justify-items: center;
  text-align: center;
  justify-content: center;
  grid-template-columns: repeat(5, 1fr);
  width: 90%;
  padding: 20px 0;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  color: #5a87e7;
}

.dark-theme span {
  color: #c2c2c2;
}

.dark-theme .resources-container {
  background-color: #151515;
  border: 1px solid #2c2c2c;
}

.dark-theme .resources-header,
.dark-theme .feedback-header {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
  & span {
    color: white;
  }
}

.dark-theme .otherLinks_container,
.dark-theme .feedback_container {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
  & span {
    color: white;
  }
}

@media (max-width: 560px) {
  .resources-header span,
  .feedback-header span {
    font-size: clamp(18px, 5vw, 26px);
  }

  .otherLinks_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
  }
  .other_link {
    display: flex;
    justify-content: flex-start;
  }
}

@media (min-width: 561px) and (max-width: 765px) {
  .resources-header span,
  .feedback-header span {
    font-size: clamp(18px, 5vw, 26px);
  }

  .otherLinks_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
  }
  .other_link {
    display: flex;
    justify-content: flex-start;
  }
}

@media (min-width: 766px) and (max-width: 1280px) {
  .resources-header span,
  .feedback-header span {
    font-size: clamp(18px, 5vw, 26px);
  }

  .otherLinks_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .other_link {
    display: flex;
    padding: 20px 0 0 20px;
    justify-content: flex-start;
  }
}


</style>