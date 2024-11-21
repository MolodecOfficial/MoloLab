<script setup lang="ts">

</script>

<template>
  <div>
    <header>
      <p>Образовательные программы</p>
    </header>
    <section class="programs-container">
      <ul class="programs-list">
        <li class="program-item">
          Программа 1: Бакалавриат по Информатике
          <ul class="test">
            <li>Тест для программы 1</li>
          </ul>
        </li>
        <li class="program-item">
          Программа 2: Магистратура по Управлению проектами
          <ul class="test">
            <li>Тест для программы 2</li>
          </ul>
        </li>
        <li class="program-item">
          Программа 3: Специалитет по Электронике
          <ul class="test">
            <li>Тест для программы 3</li>
          </ul>
        </li>
        <li class="program-item">
          Программа 4: Курс по Искусственному интеллекту
          <ul class="test">
            <li>Тест для программы 4</li>
          </ul>
        </li>
        <li class="program-item">
          Программа 5: Программирование для начинающих
          <ul class="test">
            <li>Тест для программы 5</li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
header {
  background-color: #091e4d;
  color: #e3e3e3;
  display: flex;
  font-size: 25px;
  justify-content: center;
  padding: 20px;
}

.programs-container {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.programs-list {
  list-style-type: none;
  padding: 0;
}

.program-item {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
  transition: background-color 0.3s ease, transform 0.2s ease;
  position: relative; /* Для позиционирования внутренних элементов */
}

.program-item:hover {
  background-color: #e3e3e3;
  transform: translateY(-2px);
}

.test {
  display: none; /* Скрыто по умолчанию */
}

.program-item:hover .test {
  display: flex; /* Показываем при наведении */
}
</style>