<script setup lang="ts">

</script>

<template>
  <section class="main_header">
    <section class="header-name">
      <h3>Ведущий</h3>
      <h3>нефтегазовый вуз</h3>
      <h3>России</h3>
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
@media (max-width: 765px) {
  .header-name {
    gap: 10px;
    font-size: 6px;
  }

  .main_header {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(37%, 75%);
  }
}

.main_header {
  position: absolute;
  top: 1%;
  left: 0;
  transform: translate(70%, 0%);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  z-index: 2;
}

h3 {
  font-size: clamp(20px, 5vw, 180px);
  font-family: "Samsung Sans", sans-serif;
  font-weight: bolder;
  margin: -8px 0;
  opacity: 80%;
}

h3:first-child {
  color: #dedede;
}

h3:nth-child(2),
h3:nth-child(3) {
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
  border-radius: 10px 10px 0 10px;
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

  &:nth-child(5) {
    border-bottom: 1px solid rgba(180, 180, 180, 0.27);

    &:hover {
      border-bottom: 1px solid #eee;
    }
  }
}

@media (max-width: 560px) {

  .header-name {
    gap: 10px;
    font-size: 18px;
  }

  .main_header {
    position: absolute;
    top: 10%;
    left: 52%;
    transform: translate(-50%, 50%);
    padding: 0 20px;
    z-index: 2;
  }
}


@media (min-width: 561px) and (max-width: 765px) {
  .header-name {
    gap: 10px;
    font-size: 22px;
  }

  .main_header {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

}

@media (min-width: 766px) and (max-width: 1280px) {

}

</style>