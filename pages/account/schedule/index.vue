<script setup lang="ts">
import MySchedule from "~/layouts/account/schedule/Schedule.vue"
useHead({
  title: 'УГНТУ | Расписание'
})


useThemeStore()
</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList />
    <MySchedule />
  </div>
</template>


<style scoped>



.dark-theme .container {
  background-color: #1e1e1e;
  & h1 {
    color: white;
  }
}

.container {
  background-color: #ffffff; /* Белый фон */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
  display: flex;
  height: 100vh;
}


</style>

