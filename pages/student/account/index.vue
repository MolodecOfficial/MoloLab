<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";

useHead({
  title: 'MoloLab | Личный кабинет'
})

const themeStore = useThemeStore();

const isHydrated = ref(false);

onBeforeMount(() => {
  if (process.client) {
    themeStore.initTheme();
    isHydrated.value = true;
  }
});

</script>

<template>
  <template v-if="isHydrated">
    <ThemesAccountRusoil v-if="themeStore.currentTheme === 'rusoil'"/>
    <ThemesAccountRusML v-else-if="themeStore.currentTheme === 'rusml'"/>
    <ThemesAccountMoloLab v-else-if="themeStore.currentTheme === 'mololab'"/>
  </template>
</template>

<style scoped>


</style>