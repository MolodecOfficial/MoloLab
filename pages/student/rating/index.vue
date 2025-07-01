<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

const themeStore = useThemeStore();

const isHydrated = ref(false);

onBeforeMount(() => {
  if (process.client) {
    themeStore.initTheme();
    isHydrated.value = true;
  }
});

useHead({
  title: 'MoloLab | Персональные данные'
})

</script>

<template>
  <template v-if="isHydrated">
    <ThemesRatingRusoil v-if="themeStore.currentTheme === 'rusoil'"/>
    <ThemesRatingRusML v-else-if="themeStore.currentTheme === 'rusml'"/>
    <ThemesRatingMoloLab v-else-if="themeStore.currentTheme === 'mololab'"/>
  </template>
</template>