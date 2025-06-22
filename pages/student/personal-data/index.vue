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
    <ThemesPersonalRusoil v-if="themeStore.currentTheme === 'rusoil'"/>
    <ThemesPersonalRusML v-else-if="themeStore.currentTheme === 'rusml'"/>
  </template>
</template>

<style scoped>
.user-info {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.user-data {
  background-color: white;
  width: 100%;
  height: max-content;
  padding: 15px 20px;
  border-radius: 15px;
  gap: 15px;
  display: flex;
  flex-direction: column;

  & .info-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
    & .label {
      color: #7b7b7b;
    }
  }
}

.stay-with-us {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px 20px;
  border-radius: 15px;
  background-color: white;
  text-align: center;
  color: #7b7b7b;
  margin-bottom: 100px;
}

</style>