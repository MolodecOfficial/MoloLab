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
    <ThemesAchievementsRusoil v-if="themeStore.currentTheme === 'rusoil'"/>
    <ThemesAchievementsRusML v-else-if="themeStore.currentTheme === 'rusml'"/>

  </template>
</template>

<style scoped>

</style>