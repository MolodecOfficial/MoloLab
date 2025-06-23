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
  title: 'MoloLab | Расписание'
})

</script>

<template>
  <template v-if="isHydrated">
    <ThemesScheduleRusoil v-if="themeStore.currentTheme === 'rusoil'"/>
    <ThemesScheduleRusML v-else-if="themeStore.currentTheme === 'rusml'"/>
  </template>
</template>