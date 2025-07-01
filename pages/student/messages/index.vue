<script setup lang="ts">

import {onBeforeMount, ref} from "vue";

const isHydrated = ref(false);
const themeStore = useThemeStore();

onBeforeMount(() => {
  if (process.client) {
    themeStore.initTheme();
    isHydrated.value = true;
  }
});

useHead({
  title: 'MoloLab | Достижения'
})
</script>

<template>
  <template v-if="isHydrated">
    <ThemesMessagesRusoil v-if="themeStore.currentTheme === 'rusoil'"/>
    <ThemesMessagesRusML v-else-if="themeStore.currentTheme === 'rusml'"/>
    <ThemesMessagesMoloLab v-else-if="themeStore.currentTheme === 'mololab'"/>
  </template>
</template>

<style scoped>

</style>