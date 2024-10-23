<script setup lang="ts">
const props = defineProps({
  info: Object
});
</script>

<template>
  <section class="professionInfo">
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
    <span>Дата: <code>{{ info.date }}</code></span>
    <span>Дата начала: <code>{{ info.startDate }}</code></span>
    <span>Дата окончания: <code>{{ info.endDate }}</code></span>
  </section>
</template>

<style scoped>
.professionInfo {
  display: grid;
  justify-items: center;
  text-align: center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 5px;
  & span {
    font-size: 14px;
    color: #052542;
  }
  & code {
    color: #5a87e7;
  }
}

</style>