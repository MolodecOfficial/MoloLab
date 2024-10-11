<script setup lang="ts">

const MoloNewsProps = defineProps({
  image: String,
  description: String,
  link: String,
})

</script>

<template>
  <div>
    <section class="news-container">
      <section class="news">
        <img class="news-image" :src='MoloNewsProps.image' alt="">
        <p class="news-description">{{ MoloNewsProps.description }}</p>
        <NuxtLink class="news-redirect" :to="MoloNewsProps.link">Узнать подробнее</NuxtLink>
      </section>
    </section>
  </div>
</template>

<style scoped>

.news-image {
  width: 100%;
  border-radius: 12px;
}

.news-container {
  width: 400px;
  padding: 10px 0;
}

.news {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Изменено на space-between */
  align-items: center;
  border-radius: 12px;
  border-right: 1px solid rgba(213, 213, 213, 0.2);
  border-left: 1px solid rgba(213, 213, 213, 0.2);
  border-bottom: 1px solid rgba(213, 213, 213, 0.2);
  background-color: #eeefff;
  height: 370px; /* Фиксированная высота */
  overflow: hidden; /* Скрывает переполнение */
}

.news-description {
  text-align: center;
  padding: 5px; /* Уменьшено до 5px */
  margin: 0; /* Удален отступ */
}

.news-redirect {
  padding: 5px 0; /* Уменьшено до 15px */
  margin: 0; /* Удален отступ */
  text-decoration: none;
  transition: 0.2s all ease-in-out;
  color: #797979;

  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 4px;
    color: #1a1a1a;
  }
}
</style>