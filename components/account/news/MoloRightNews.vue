<script setup lang="ts">
const UniversityProps = defineProps({
  date: String,
  title: String,
  description: String
})

useThemeStore()
</script>

<template>
  <section class="news-rightBlock">
    <p class="news-date">{{ UniversityProps.date }}</p>
    <h2 class="news-title">{{ UniversityProps.title }}</h2>
    <span class="news-description" v-html="UniversityProps.description"> </span>
  </section>
</template>

<style scoped>

.dark-theme .news-rightBlock {
  background-color: #1e1e1e;
  & span {
    color: white;
  }
  & h2 {
    color: #838383;
  }
}

.news-rightBlock {
  background-color: #ffffff;
  margin-top: 45px;
  margin-left: 50px;
  width: 52vw;
  height: auto; /* Автоматическая высота для гибкости */
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Тень для глубины */
  padding: 20px; /* Отступы для внутреннего содержимого */
  display: flex;
  flex-direction: column;
  position: relative; /* Для абсолютного позиционирования даты */
  margin-bottom: 40px;

}

.news-date {
  position: absolute; /* Абсолютное позиционирование для даты */
  top: 10px; /* Отступ от верхней части блока */
  left: 20px; /* Отступ от левой части блока */
  font-size: 14px; /* Размер шрифта для даты */
  color: #888888; /* Цвет для текста даты */
}

.news-title {
  font-size: 24px; /* Размер шрифта заголовка */
  font-weight: bold; /* Жирный шрифт для заголовка */
  color: #333333; /* Цвет заголовка */
  margin-top: 40px; /* Отступ сверху для заголовка */
}

.news-description {
  font-size: 16px; /* Размер шрифта описания */
  color: #555555; /* Цвет описания */
  margin-top: 10px; /* Отступ сверху для описания */
  &:last-child {
    padding-bottom: 20px;
  }
}
@media (max-width: 768px) {
  .news-rightBlock {
    padding: 15px; /* Уменьшаем внутренние отступы */
    margin: 30px auto; /* Уменьшаем отступы на мобильных устройствах */
    flex-direction: column; /* Вертикальное расположение элементов */
    align-items: center; /* Центрируем элементы по горизонтали */
  }

  .news-date {
    font-size: 0.9rem; /* Уменьшаем размер шрифта даты на мобильных устройствах */
    top: 5px; /* Уменьшаем отступ сверху для даты */
    left: auto; /* Убираем абсолютное позиционирование слева */
    right: 10px; /* Добавляем отступ справа для даты */
    text-align: right; /* Выравниваем текст даты вправо */
  }

  .news-title {
    font-size: 1.25rem; /* Уменьшаем размер заголовка на мобильных устройствах */
    margin-top: 20px; /* Уменьшаем отступ сверху для заголовка */
    text-align: center; /* Центрируем заголовок */
  }

  .news-description {
    font-size: 0.9rem; /* Уменьшаем размер описания на мобильных устройствах */
    margin-top: 5px; /* Уменьшаем отступ сверху для описания */
    text-align: center; /* Центрируем описание */
  }
}

</style>