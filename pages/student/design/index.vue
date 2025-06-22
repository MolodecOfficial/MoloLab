<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

const themeStore = useThemeStore();
const isHydrated = ref(false);

onBeforeMount(() => {
  if (process.client) {
    themeStore.initTheme();
    isHydrated.value = true;
  }
});

function selectTheme(themeId: number) {
  const selected = themeStore.availableThemes.find(t => t.id === themeId);
  if (selected) {
    themeStore.setTheme(selected.code);
  }
}

useHead({
  title: 'MoloLab | Оформление'
});
</script>

<template>
  <template v-if="isHydrated">
    <ThemesDesignRusoil v-if="themeStore.currentTheme === 'rusoil'"/>
    <ThemesDesignRusML v-else-if="themeStore.currentTheme === 'rusml'"/>
    <div v-else>
      <span>
        Не дождётесь!
      </span>
      <button @click="selectTheme(1)">сменить тему на Rusoil</button>
      <button @click="selectTheme(2)">сменить тему на RusML</button>
    </div>
  </template>
</template>


<style scoped>
div {
  display: flex;
  flex-direction: column;
  width: fit-content;
}
span {
  color: red;
  font-size: 50px;
}
</style>