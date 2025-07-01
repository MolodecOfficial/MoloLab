<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useThemeStore } from '~/stores/themeStore';
import { useHead } from '#imports';

const themeStore = useThemeStore();
const isHydrated = ref(false);

onBeforeMount(() => {
  if (process.client) {
    themeStore.initTheme();
    isHydrated.value = true;
  }
});

function selectTheme(themeCode: string) {
  themeStore.setTheme(themeCode);
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
  <AccountPatternsMoloLab>
    <div class="design-container">
      <!-- Заголовок -->
      <div class="design-header">
        <h2>Выбор оформления</h2>
      </div>

      <!-- Основной контент -->
      <div class="design-content">
        <!-- Предпросмотр текущей темы -->
        <div class="current-theme-preview">
          <div class="preview-card">
            <div class="preview-header">
              <div class="theme-name">{{ themeStore.selectedThemeName }}</div>
              <div class="theme-badge">Текущая</div>
            </div>
            <div class="preview-image">
              <img
                  :src="themeStore.selectedThemePic"
                  :alt="themeStore.selectedThemeName"
                  class="theme-image"
              >
            </div>
          </div>
        </div>

        <!-- Доступные темы -->
        <div class="available-themes">
          <h3>Доступные темы</h3>
          <div class="theme-grid">
            <div
                v-for="theme in otherThemes"
                :key="theme.code"
                class="theme-card"
                @click="selectTheme(theme.code)"
            >
              <div class="theme-image-wrapper">
                <img
                    :src="theme.img"
                    :alt="theme.name"
                    class="theme-image"
                >
              </div>
              <div class="theme-info">
                <div class="theme-name">{{ theme.name }}</div>
                <button class="select-button">
                  Выбрать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AccountPatternsMoloLab>
</template>

<style scoped>
.design-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.design-header {
  margin-bottom: 32px;
  text-align: center;
}

.design-header h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  margin: 0;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.current-theme {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8px;
}

.current-theme span {
  color: #9f7aea;
  font-weight: 500;
}

.design-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.current-theme-preview {
  display: flex;
  justify-content: center;
}

.preview-card {
  background: rgba(32, 32, 35, 0.7);
  border-radius: 16px;
  overflow: hidden;
  max-width: 500px;
  width: 100%;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.preview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
}

.theme-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
}

.theme-badge {
  background: rgba(104, 211, 145, 0.2);
  color: #68d391;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.preview-image {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.theme-image {
  max-width: 50%;
  height: auto;
  border-radius: 8px;
}

.available-themes h3 {
  font-size: 1.3rem;
  font-weight: 500;
  color: white;
  margin-bottom: 16px;
  text-align: center;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.theme-card {
  background: rgba(32, 32, 35, 0.7);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.theme-card:hover {
  transform: translateY(-4px);
  border-color: rgba(102, 126, 234, 0.3);
}

.theme-image-wrapper {
  padding: 16px;
  display: flex;
  justify-content: center;
}

.theme-image-wrapper img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.theme-info {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.select-button {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.select-button:hover {
  background: rgba(102, 126, 234, 0.3);
  color: white;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .theme-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .design-container {
    padding: 16px;
  }

  .theme-grid {
    grid-template-columns: 1fr;
  }
}
</style>