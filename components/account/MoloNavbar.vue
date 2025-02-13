<script setup lang="ts">
const route = useRoute();

</script>

<template>
  <section class="student-nav">
    <NuxtLink to="/student/schedule" class="nav-link" :class="{ active: route.path === '/student/schedule' }">
      <svg
          width="22"
          height="22"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="nav-icon"
          :style="{ stroke: route.path === '/student/schedule' ? 'blue' : 'black' }"
      >
        <path
            d="M19 6.00001H1M6 3.00001V1.00001M14 3V1M3 2.00001H2.9C1.85066 2.00001 1 2.85067 1 3.90001V16C1 17.1046 1.89543 18 3 18H17C18.1046 18 19 17.1046 19 16V3.90001C19 2.85067 18.1493 2.00001 17.1 2.00001H17M9 2.00001H11M5.93665 10.1792C6.2293 9.4881 6.75514 9.2647 7.23701 9.2304C7.71888 9.196 8.738 9.2304 8.9705 10.0737C9.2031 10.917 9.0758 11.6301 8.1622 12.1572C7.39449 12.6001 6.24463 13.1391 5.86202 13.9712C5.74241 14.2314 5.97499 14.479 6.26131 14.479H9.1902M13.9058 9.6277C13.024 9.0328 12.196 9.0636 11.4059 9.7453C10.722 10.3354 10.6197 12.078 10.8454 13.2519M10.8454 13.2519C10.8805 13.4344 10.9235 13.6031 10.9735 13.7516C11.3449 14.8558 13.5385 15.0523 14.0921 13.8924C14.6457 12.7326 13.7783 11.4799 12.7437 11.4799C11.709 11.4799 10.7378 12.006 10.8454 13.2519Z"
            :stroke="route.path === '/student/schedule' ? 'blue' : 'black'"
            stroke-width="1.25"
            stroke-linecap="round"
        />
      </svg>
      <span>Расписание</span>
    </NuxtLink>
    <NuxtLink to="/student/grade" class="nav-link" :class="{ active: route.path === '/student/grade' }">
      <svg
          width="18"
          height="22"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="nav-icon"
          :style="{ stroke: route.path === '/student/grade' ? 'blue' : 'black' }"
      >
        <path
            d="M15 15V1H3C1.89543 1 1 1.89543 1 3V17M15 15V19H3C1.89543 19 1 18.1046 1 17M15 15H3M1 17C1 15.8954 1.89543 15 3 15M3 15H12.4545M5 11H8"
            :stroke="route.path === '/student/grade' ? 'blue' : 'black'"
            stroke-width="1.25"
            stroke-linecap="round"
        />
      </svg>
      <span>Успеваемость</span>
    </NuxtLink>
    <NuxtLink to="/student/account" class="nav-link" :class="{ active: route.path === '/student/account' }">
      <svg
          width="18"
          height="22"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="nav-icon"
          :style="{ stroke: route.path === '/student/account' ? 'blue' : 'black' }"
      >
        <path
            d="M15 15V6.82842C15 6.29799 14.7794 5.80146 14.369 5.46531C13.2908 4.58195 11.0968 2.82622 9.3509 1.26565C8.5717 0.569171 7.3873 0.525171 6.5938 1.2053L1.69842 5.40135C1.25513 5.78131 1 6.33601 1 6.91986V15C1 16.1046 1.89543 17 3 17H3.5C4.60457 17 5.5 16.1046 5.5 15V13C5.5 11.8954 6.3954 11 7.5 11H8.5C9.6046 11 10.5 11.8954 10.5 13V15C10.5 16.1046 11.3954 17 12.5 17H13C14.1046 17 15 16.1046 15 15Z"
            :stroke="route.path === '/student/account' ? 'blue' : 'black'"
            stroke-width="1.25"
            stroke-linecap="round"
        />
      </svg>
      <span>Профиль</span>
    </NuxtLink>
  </section>
</template>

<style scoped>
.student-nav {
  display: flex;
  align-items: center;
  justify-content: center; /* Выравнивание содержимого по центру */
  width: fit-content;
  padding: 12px 25px;
  border-radius: 40px;
  height: fit-content;
  position: fixed;
  top: 95%; /* Перемещаем элемент на 50% от высоты родителя */
  left: 50%; /* Перемещаем элемент на 50% от ширины родителя */
  transform: translate(-50%, -50%); /* Корректируем позицию относительно центра самого элемента */
  gap: 30px;
  background-color: white;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center; /* Выравниваем содержимое ссылки по центру */
  text-align: center;
  text-decoration: none;
  color: black;
}
.nav-link .nav-icon {
  width: 22px;
  height: 22px;
}
.nav-link span {
  font-size: 10px;
  margin-top: 3px; /* Добавляем отступ между иконкой и текстом */
}
.nav-link.active {
  color: blue; /* Цвет текста для активного пункта */
}
</style>