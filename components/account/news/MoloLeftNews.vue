<script setup lang="ts">
const myProps = defineProps({
  title: String,
  link: String
})

useThemeStore()

</script>

<template>
  <section class="news-leftBlock">
    <NuxtLink :to="myProps.link" class="link" target="_blank">
      <span>{{ myProps.title }}</span>
    </NuxtLink>
  </section>
</template>

<style scoped>

.dark-theme .news-leftBlock {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
}

.news-leftBlock {
  overflow: hidden;
  margin-top: 45px;
  width: 20vw;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; /* Отступы для внутреннего содержимого */
  background-color: #ffffff;
  border-radius: 15px; /* Округлые углы */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Тень для глубины */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Плавный переход для эффектов */
  border: 1px solid #e0e0e0;

}

.news-leftBlock:hover {
  transform: translateY(-5px); /* Подъем блока при наведении */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2); /* Увеличенная тень при наведении */
}

.link {
  text-decoration: none;
  color: #4e45e3; /* Основной цвет текста */
  font-size: 18px; /* Размер шрифта */
  font-weight: bold; /* Жирный шрифт */
  transition: color 0.2s ease; /* Плавный переход цвета */
  text-align: center;
}

.link:hover {
  color: #3b3b7f; /* Цвет текста при наведении */
}
span {
  text-align: center;
}

@media (max-width: 560px) {
  .news-leftBlock {
    padding: 5px;
    width: 75%;
  }

  .link {
    display: flex;
  }
  .link span {
    font-size: 9px;
  }
}

@media (min-width: 561px) and (max-width: 765px) {

}

@media (min-width: 766px) and (max-width: 1280px) {

}
</style>