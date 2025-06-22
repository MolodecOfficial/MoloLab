<script setup lang="ts">
import {onBeforeMount, ref} from 'vue';

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
</script>

<template>
  <AccountMoloMobile title="Оформление">
    <div class="design-container">
      <div class="design-header">
        <h1>Выбери свой стиль</h1>
        <p>Персонализируй внешний вид приложения</p>
      </div>

      <div class="theme-flex">
        <div
            v-for="theme in themeStore.availableThemes"
            :key="theme.id"
            class="theme-card"
            :class="{ selected: themeStore.selectedTheme === theme.id }"
            @click="selectTheme(theme.id)"
        >
          <div class="card-content">
            <img :src="theme.img" :alt="theme.name" class="theme-logo"/>
            <div class="theme-info">
              <span class="theme-name">{{ theme.name }}</span>
            </div>
          </div>
          <section class="vector">
            <svg fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L1 9" stroke="#7B7B7B" stroke-linecap="round" stroke-width="1.25"/>
            </svg>
          </section>
        </div>
      </div>
      <section class="in-progress">
        <span>В разработке</span>
      </section>
    </div>
  </AccountMoloMobile>
</template>

<style scoped>

.design-container {
  padding: 20px;
  width: 80%;
  background: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.design-header {
  text-align: center;
}

.design-header h1 {
  font-size: 1.8rem;
  margin-bottom: 8px;
  font-weight: 700;
}

.design-header p {
  font-size: 1rem;
  color: #7b8a8b;
}

.theme-flex {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 100%;
}

.theme-card {
  gap: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 10px 20px;
  border-radius: 16px;
  background: #dfe7f1;
  transition: all 0.3s ease;
  cursor: pointer;
}

.theme-card:hover {
  transform: translateY(-5px);
}

.card-content {
  display: flex;
  text-align: center;
  position: relative;
  z-index: 1;
}

.theme-logo {
  width: 40px;
  height: 30px;
  object-fit: contain;
}

.theme-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
}

.in-progress {
  display: flex;
  justify-content: center;
  color: #7b8a8b;
}
</style>