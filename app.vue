<script setup lang="ts">

useSeoMeta({
  title: 'MoloLab - Пример подражания!',
  ogImage: '/favicon.ico',
})

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<style scoped>

/* Предотвращает мерцание до загрузки темы */
html:not([data-theme]) {
  visibility: hidden;
}
html[data-theme] {
  visibility: visible;
  transition: visibility 0s;
}

</style>