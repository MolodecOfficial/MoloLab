<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { achievementsList } from '~/stores/achievementsStore';

const userStore = useUserStore();
const userAchievements = ref<any[]>([]);
const updatedAchievements = ref<any[]>([]);

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await userStore.getUsers();
  if (userStore.userId) {
    userAchievements.value = userStore.getUserAchievements(userStore.userId);
    updatedAchievements.value = achievementsList.map((achievement) => ({
      ...achievement,
      obtained: userAchievements.value.some(ach => ach.id === achievement.id),
    }));
    loading.value = false;
  }
});
</script>

<template>
  <AccountPatternsMoloLab>
    <AdminpanelUIMoloLoader :is-loading="loading" class="loader"/>
    <div class="achievements-container">
      <div class="achievements-header">
        <h2>Ваши достижения</h2>

        <div class="stats">
          <span class="obtained">{{ userAchievements.length }}</span>
          <span class="divider">/</span>
          <span class="total">{{ achievementsList.length }}</span>
        </div>
      </div>

      <!-- Прогресс-бар -->
      <div class="progress-container">
        <div
            class="progress-bar"
            :style="{ width: `${(userAchievements.length / achievementsList.length) * 100}%` }"
        ></div>
      </div>

      <!-- Список достижений -->
      <div class="achievements-grid">
        <div
            v-for="achievement in updatedAchievements"
            :key="achievement.id"
            class="achievement-card"
            :class="{ 'obtained': achievement.obtained }"
        >
          <div class="achievement-icon">
            <img
                :src="achievement.img"
                :alt="achievement.title"
                class="achievement-image"
                :class="{ obtained: achievement.obtained }"
            />
          </div>
          <div class="achievement-details">
            <h3>{{ achievement.title }}</h3>
            <p>{{ achievement.description }}</p>
          </div>
          <div class="achievement-status" :class="{ 'obtained': achievement.obtained }">
            {{ achievement.obtained ? 'Получено' : 'Не получено' }}
          </div>
        </div>
      </div>
    </div>
  </AccountPatternsMoloLab>
</template>

<style scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
}

.achievements-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.achievements-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.achievements-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stats {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
}

.stats .obtained {
  color: #68d391;
  font-weight: 600;
}

.stats .total {
  color: rgba(255, 255, 255, 0.7);
}

.stats .divider {
  color: rgba(255, 255, 255, 0.4);
}

.progress-container {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 32px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #9f7aea);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.achievement-card {
  background: rgba(32, 32, 35, 0.7);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.achievement-card.obtained {
  border-color: rgba(102, 126, 234, 0.5);
}

.achievement-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.achievement-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.achievement-image {
  width: 100%;
}

.achievement-card.obtained .achievement-icon svg {
  color: #9f7aea;
}

.achievement-details h3 {
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
  margin-bottom: 8px;
}

.achievement-details p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.5;
}

.achievement-status {
  position: absolute;
  padding: 6px 12px;
  right: 5%;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  align-self: flex-start;
  background: rgba(255, 59, 48, 0.2);
  color: #ff3b30;
}

.achievement-status.obtained {
  background: rgba(104, 211, 145, 0.2);
  color: #68d391;
}

/* Анимации */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Адаптивность */
@media (max-width: 768px) {
  .achievements-grid {
    grid-template-columns: 1fr;
  }

  .achievements-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .achievements-container {
    padding: 16px;
  }
}
</style>