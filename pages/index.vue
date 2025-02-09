<script setup lang="ts">

import RunningLine from "~/layouts/home/sections/RunningLine.vue";
import HomeBody from "~/layouts/home/sections/HomeBody.vue";
import HomeHeader from "~/layouts/home/sections/HomeHeader.vue";
import News from "~/layouts/news/sections/News.vue";
import Education from "~/layouts/education/sections/Education.vue";

import Icon from 'public/icon_account_2.png'
import bg_img from 'public/img.png'

</script>

<template>
  <section class="mobile-container">
    <section class="mobile-header">
      <img :src="Icon" alt="" class="icon">
      <span>Версия 0.15 (Сборка 99)</span>
    </section>
    <section class="mobile-description">
      <section class="mobile-name">
        <img :src="bg_img" alt="" class="bg_img">
        <section class="name-header">
          <span>Ведущий</span>
          <span>Нефтегазовый</span>
          <span>ВУЗ</span>
          <span>России</span>
        </section>
        <section class="right-logo">
          <a class="main-logo" href="">
            <img class="logo" src="/public/home/logo.svg" alt="">
            <img class="logo-circle" src="/public/home/logo-circle.svg" alt="">
          </a>
        </section>
      </section>
      <!-- Переместили ссылку на личный кабинет в конец -->
    </section>
    <section class="mobile-functional">
      <NuxtLink to="/login" class="info-button">
        <span>
          Личный Кабинет абитуриента
        </span>
      </NuxtLink>
      <NuxtLink to="/login-student" class="info-button">
        <span>
          Личный Кабинет студента
        </span>
      </NuxtLink>
    </section>
  </section>

  <section class="pc-container">
    <div class="main-container">
      <div class="video-overlay">
        <video autoplay loop muted>
          <source src="../public/overlay.mp4" type="video/mp4">
          Ваш браузер не поддерживает видео.
        </video>
        <div class="overlay"></div>
      </div>
      <HomeHeader/>
      <HomeBody/>
    </div>
  </section>
  <div>
    <RunningLine/>
  </div>
  <div>
    <News/>
  </div>
  <div>
    <Education/>
  </div>
</template>

<style scoped>

.mobile-container, .pc-container {
  width: 100%; /* Используйте % вместо фиксированных размеров */
  max-width: 100%; /* Гарантирует, что элементы не выйдут за пределы экрана */
}

.mobile-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10%;
  width: 100%;
  background-color: #092059;

  & img {
    width: 35%;
    padding-left: 10px;
  }

  & span {
    color: rgba(162, 162, 162, 0.54);
    padding-right: 10px;
  }
}

.mobile-description {
  display: flex;
  flex-direction: column;
  gap: 150px;
}

.mobile-name {
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 100%;

  & .bg_img {
    filter: blur(20%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
  }

  & .name-header {
    position: relative;
    background-color: rgba(9, 32, 89, 0.6);
    width: auto;
    z-index: 1;
    padding: 20px;
    backdrop-filter: blur(10px);

    & span {
      display: flex; /* Изменено на block для вертикального расположения */
      font-size: clamp(25px, 8vw, 50px);
      color: #a4a4a4; /* Цвет текста */

      &:first-child {
        color: white
      }
    }
  }
}
.right-logo {
  position: absolute;
  left: 68%;
  top: 16%;
  z-index: 1;

  & .main-logo {
    background-color: #022469;
    width: clamp(60px, 25vw, 240px);
    height: clamp(60px, 25vw, 240px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    z-index: 1;
  }

  & .logo {
    height: clamp(30px, 14vw, 100px);
    width: clamp(30px, 14vw, 100px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .logo-circle {
    position: absolute;
    z-index: 3;
    height: clamp(30px, 22vw, 160px);
    width: clamp(30px, 25vw, 160px);
    animation: spin 15s linear infinite; /* Используем 'linear' для равномерного вращения */
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg); /* Начальная позиция */
  }
  to {
    transform: rotate(-360deg); /* Конечная позиция */
  }
}

.mobile-functional {
  display: flex;

  z-index: 1;
  margin-top: 20px;
  flex-direction: column;
  gap: 20px;
}


.info-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: rgba(9, 32, 89, 0.6);
  padding: 10px 20px;
  width: max-content;
  & span {
    font-size: 12px;
    text-align: start;
    color: white;
  }
}

.main-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden; /* Чтобы избежать прокрутки */

}

@media (max-width: 768px) {
  .main-container {
    height: auto;
  }
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Убедимся, что видео позади других элементов */
}

video {
  height: auto; /* Позволяет видео адаптироваться */
  max-height: 150%; /* Ограничение по высоте */
  min-width: 100%; /* Убирает сжатие по ширине */
  object-fit: cover; /* Сохраняет пропорции */
  width: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: clamp(20vw, 100vw, 100vw);
  height: clamp(20%, 65vw, 57vw);
  background-color: rgba(9, 60, 171, 0.46); /* Правый фильтр */
  z-index: 1; /* Фильтр над видео */
}

@media (max-width: 1600px) {
  video {
    height: auto; /* Позволяет видео адаптироваться */
    max-height: 100vh; /* Ограничение по высоте */
    min-width: 100%; /* Убирает сжатие по ширине */
    object-fit: cover; /* Сохраняет пропорции */
  }

  .main-container {
    height: auto; /* Или другое значение, которое вам нужно */
  }
}

@media (max-width: 1890px) {
  .main-container {
    height: auto; /* Или другое значение, которое вам нужно */
  }
}

@media (max-width: 768px) {
  video {
    height: auto; /* Позволяет видео адаптироваться */
    max-height: 100vh; /* Ограничение по высоте */
    min-width: 100%; /* Убирает сжатие по ширине */
    object-fit: cover; /* Сохраняет пропорции */
  }
}

@media (max-width: 560px) {
  .pc-container {
    display: none;
  }
}

@media (min-width: 561px) and (max-width: 765px) {
  .pc-container {
    display: none;
  }
}

@media (min-width: 766px) and (max-width: 1280px) {
  .mobile-container {
    display: none;
  }
}

@media (min-width: 1281px) {
  .mobile-container {
    display: none;
  }
}
</style>