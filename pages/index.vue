<script setup lang="ts">

import RunningLine from "~/layouts/home/sections/RunningLine.vue";
import HomeBody from "~/layouts/home/sections/HomeBody.vue";
import HomeHeader from "~/layouts/home/sections/HomeHeader.vue";
import News from "~/layouts/news/sections/News.vue";
import Education from "~/layouts/education/sections/Education.vue";
</script>

<template>
  <div class="main-container">
    <div class="video-overlay">
      <video autoplay loop muted>
        <source src="../public/overlay.mp4" type="video/mp4">
        Ваш браузер не поддерживает видео.
      </video>
      <div class="overlay"></div>
    </div>
    <HomeHeader />
    <HomeBody />
  </div>
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
.main-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden; /* Чтобы избежать прокрутки */

}
@media (max-width: 768px) {
  .main-container {
    height: auto; /* Или другое значение, которое вам нужно */
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
  .video-overlay {
    display: ;
  }

}

@media (min-width: 561px) and (max-width: 765px) {

}

@media (min-width: 766px) and (max-width: 1280px) {

}
</style>