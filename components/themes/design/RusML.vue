<script setup lang="ts">
const themeStore = useThemeStore();

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
</script>

<template>
  <AccountPatternsMoloAccount header="Оформление">
    <div class="current-design">
      <span>Текущий стиль оформления - {{ themeStore.selectedThemeName }}</span>
      <img
          :src="themeStore.selectedThemePic"
          :alt="themeStore.selectedThemeName"
          class="current-theme-img"
      />
    </div>

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
  </AccountPatternsMoloAccount>
</template>

<style scoped>

.achievements-header span {
  font-size: 30px;
  color: #3b3b7f;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.current-design {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  color: #2c3e50;
  border: 1px solid #d1d8e0;
  border-radius: 15px;
  padding: 15px 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-weight: 600;
}

.current-design span {
  font-size: 18px;
  font-weight: 500;
  color: #3b3b7f;
}

.current-theme-img {
  width: 40px;
  height: 30px;
  object-fit: contain;
  border-radius: 5px;
  padding: 8px;
}

.choices {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
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