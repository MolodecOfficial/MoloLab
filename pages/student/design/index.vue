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
// Получаем все темы кроме текущей для кнопок переключения
const otherThemes = computed(() => {
  return themeStore.availableThemes.filter(t => t.code !== themeStore.currentTheme);
});
useHead({
  title: 'MoloLab | Оформление'
});
</script>

<template>
  <template v-if="isHydrated">
    <ThemesDesignRusoil v-if="themeStore.currentTheme === 'rusoil'"/>
    <ThemesDesignRusML v-else-if="themeStore.currentTheme === 'rusml'"/>
    <div v-else class="else">
      <section class="no-molo">
        <span>
        Не дождётесь!
      </span>
        <section class="choices">
          <button
              v-for="theme in otherThemes"
              :key="theme.id"
              @click="selectTheme(theme.id)"
              class="theme-button"
          >
            Сменить тему на {{ theme.name }}
            <img
                :src="theme.img"
                :alt="theme.name"
                class="theme-button-img"
            />
          </button>
        </section>
      </section>

    </div>
  </template>
</template>


<style scoped>
.else {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-molo {
  border: 1px solid #c2c2c2;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  gap: 10px;
  align-items: center;
  margin: 25px;
  padding: 10px 20px;
  & span {
    color: red;
  }
}

.choices {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.theme-button {
  cursor: pointer;
  border-radius: 15px;
  background-color: white;
  border: 1px solid #e0e0e0;
  padding: 12px 20px;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #3b3b7f;
  }
}

.theme-button-img {
  width: 30px;
  height: 22px;
  object-fit: contain;
  border-radius: 3px;
}

</style>