<script setup lang="ts">
const props = defineProps({
  info: Object,
  darkTheme: Boolean,
  toggleTheme: Function,
});
</script>

<template>
  <section class="professionInfo" :class="{'dark-theme': darkTheme}">
    <span>№м.уч.: <code>{{ info.number }}</code></span>
    <span>Форма: <code>{{ info.form }}</code></span>
    <span>Факультет: <code>{{ info.faculty }}</code></span>
    <span>Код: <code>{{ info.code }}</code></span>
    <span>Наименование: <code>{{ info.name }}</code></span>
    <span>Шифр: <code>{{ info.shift }}</code></span>
    <span>Курс: <code>{{ info.course }}</code></span>
    <span>Направление: <code>{{ info.direction }}</code></span>
    <span>Группа: <code>{{ info.group }}</code></span>
    <span>Средний балл: <code>{{ info.averageScore }}</code></span>
    <span>№ Зачетки: <code>{{ info.recordBookNumber }}</code></span>
    <span>Действие: <code>{{ info.action }}</code></span>
    <span>Основание: <code>{{ info.basis }}</code></span>
    <span>№: <code>{{ info.number2 }}</code></span>
    <span>Дата приказа: <code>{{ info.date }}</code></span>
    <span>Дата начала: <code>{{ info.startDate }}</code></span>
    <span>Дата окончания: <code>{{ info.endDate }}</code></span>
  </section>
</template>

<style scoped>
.professionInfo {
  display: grid;
  justify-items: center;
  text-align: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 2px;
  & span {
    font-size: 14px;
    color: #052542;
  }
  & code {
    color: #5a87e7;
  }
}

.dark-theme span {
  color: #4e45e3;
  font-weight: bold;
}

.dark-theme code {
  color: white;
}

@media (max-width: 1024px) {
  .professionInfo {
    padding: 0 0;
    grid-row-gap: 0;
    & code {
      font-size: 10px;
    }
    & span {
      font-size: 11px;
    }
  }
}
@media (max-width: 1620px) {
  .professionInfo {

    grid-row-gap: 15px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    & code {
      font-size: 12px;
    }
    & span {
      font-size: 12px;
    }
  }
}

@media (max-width: 560px) {
  .professionInfo {
    grid-row-gap: 10px;
    grid-column-gap: 20px;
    padding: 20px;
    text-align: center;
    & span {
      font-size: 10px;
    }
    & code {
      font-size: 10px;

    }
  }
}

@media (min-width: 561px) and (max-width: 765px) {

}

@media (min-width: 766px) and (max-width: 1280px) {

}
@media (min-width: 1281px) and (max-width: 1920px) {

}
</style>