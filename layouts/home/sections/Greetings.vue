<script setup lang="ts">

</script>

<template>
  <section class="main_header">
    <section class="header-name">
      <h2>Ведущий</h2>
      <h2>нефтегазовый вуз</h2>
      <h2>России</h2>
    </section>
  </section>
  <section class="main_info">
    <section class="main_info_plates">
      <NuxtLink class="link" to="/in-progress">Истории успеха</NuxtLink>
      <NuxtLink class="link" to="/in-progress">Есть идея?</NuxtLink>
      <NuxtLink class="link" to="/in-progress">Приёмная комиссия</NuxtLink>
      <NuxtLink class="link" to="/in-progress">Приоритет 2030</NuxtLink>
      <NuxtLink class="link" to="/in-progress">Кампусы</NuxtLink>
    </section>
  </section>
</template>

<style scoped>

.main_header {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(77%, 35%);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  z-index: 2;
}
h2 {
  font-size: clamp(20px, 5vw, 100px);
  font-family: "Samsung Sans", sans-serif;
  font-weight: bold;
  margin: -8px 0;
}
h2:first-child {
  color: #dedede;
}
h2:nth-child(2),
h2:nth-child(3){
  color: rgb(133, 144, 169);
}
.header-name {
  display: flex;
  flex-direction: column;
}
.main_info {
  display: flex;
  justify-content: end;
  margin-top: clamp(2px, 2vw, 40px);
  position: relative;
  align-items: flex-start;
}
.main_info_plates {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: clamp(150px, 17vw, 315px);
  z-index: 1;
  justify-content: start;
  align-items: start;
}
.main_info a {
  width: 100%;
  height: clamp(10px, 4vw, 70px);
  font-size: clamp(6px, 1vw, 16px);
  border-top: 1px solid rgba(180, 180, 180, 0.27);
  border-left: 1px solid rgba(155, 155, 155, 0.27);
  border-radius: 10px 10px 0 0;
  color: #c2c2c2;
  text-decoration: none;
  padding: 5px 10px;
  transition: 0.1s all ease-in-out;
  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 4px;
    color: #eee;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
  }
}
</style>