<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useUserStore} from '~/stores/userStore';
import {achievementsList} from '~/stores/achievementsStore';

const userStore = useUserStore();

const userAchievements = ref<any[]>([]);

const updatedAchievements = ref<any[]>([]);

onMounted(async () => {
  await userStore.getUsers();
  if (userStore.userId) {
    userAchievements.value = userStore.getUserAchievements(userStore.userId);
    updatedAchievements.value = achievementsList.map((achievement) => ({
      ...achievement,
      obtained: userAchievements.value.some(ach => ach.id === achievement.id),
    }));
  }
});

</script>

<template>
  <AccountMoloMobile title="Достижения">
    <div class="achievements-list">
      <div
          v-for="achievement in updatedAchievements"
          :key="achievement.id"
          class="achievement-item"
          :class="{ obtained: achievement.obtained }"
      >
        <div class="achievement-content">
          <div class="achievement-text">
            <span class="achievement-title"> {{ achievement.title }} </span>
            <p class="achievement-description">{{ achievement.description }}</p>
          </div>
          <div class="achievement-image-container">
            <img
                :src="achievement.img"
                :alt="achievement.title"
                class="achievement-image"
                :class="{ obtained: achievement.obtained }"
            />
            <div v-if="achievement.obtained" class="obtained-badge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AccountMoloMobile>
</template>

<style scoped>

.achievements-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 100px;

}

.achievement-item {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  opacity: 0.9;
}

.achievement-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.achievement-item.obtained {
  opacity: 1;
  background: linear-gradient(to right, #ffffff 0%, #f8fff8 100%);
}

.achievement-content {
  display: flex;
  padding: 20px;
  gap: 20px;
}

.achievement-text {
  flex: 1;
}

.achievement-title {
  display: block;
  font-weight: 700;
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 8px;
}

.achievement-description {
  color: #5a6268;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.achievement-image-container {
  position: relative;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.achievement-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(1) opacity(0.7);
  transition: all 0.4s ease;
}

.achievement-image.obtained {
  filter: grayscale(0) opacity(1);
  transform: scale(1.05);
}

.obtained-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 28px;
  height: 28px;
  background: #3ada06;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(58, 218, 6, 0.4);
  animation: pulse 1.5s infinite;
}

.obtained-badge svg {
  width: 18px;
  height: 18px;
  fill: white;
}

.progress-bar {
  height: 4px;
  background: #e9ecef;
  width: 100%;
}

.progress-bar.full {
  background: linear-gradient(90deg, #3ada06 0%, #a2ff93 100%);
  animation: fillBar 0.8s ease-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes fillBar {
  0% { width: 0%; }
  100% { width: 100%; }
}

@media (max-width: 768px) {
  .achievement-content {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .achievement-image-container {
    align-self: center;
    width: 80px;
    height: 80px;
  }

  .achievement-text {
    text-align: center;
  }
}
</style>