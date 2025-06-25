<script setup lang="ts">
import {ref, onMounted} from 'vue';
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
  <AccountPatternsMoloAccount header="Ваши достижения">
    <div class="achievements-list">
      <div
          v-for="achievement in updatedAchievements"
          :key="achievement.id"
          class="achievement-item"
          :class="{ obtained: achievement.obtained }"
      >
        <img
            :src="achievement.img"
            :alt="achievement.title"
            class="achievement-image"
            :class="{ obtained: achievement.obtained }"
        />
        <div class="achievement-text">
          <h3>{{ achievement.title }}</h3>
          <p>{{ achievement.description }}</p>
        </div>

      </div>
    </div>
  </AccountPatternsMoloAccount>

</template>

<style scoped>

.achievements-list {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.achievement-item {
  display: flex;
  background-color: #ffffff;
  justify-content: space-evenly;

  margin: 10px;
  padding: 15px 20px;
  border-radius: 15px;
  gap: 14px;
  text-align: center;
  width: calc(25% - 50px); /* Четыре элемента в ряд с отступами */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  & h3 {
    color: #1e1e1e;
  }

  & p {
    color: #1a1a1a;
  }
}

.achievement-item.obtained {
  border-left: 6px solid #28a745; /* Зеленая полоска для полученных достижений */

  & h3, p {
    color: #1a1a1a;
  }
}

.achievement-image {
  width: 100px; /* Задайте нужный размер изображения */
  height: auto; /* Сохранить пропорции изображения */
  filter: grayscale(1);
}

.achievement-image.obtained {
  filter: grayscale(0);
}

h3 {
  font-size: 18px;
  color: #333;
}

p {
  font-size: 14px;
  color: #666;
}

.achievement-item.obtained {
  background-color: #d4edda; /* Цвет для полученных достижений */
}

@media (max-width: 765px) {
  .achievements-list {
    display: grid;
  }

  .achievement-item {
    width: 80%;
  }
}


@media (max-width: 560px) {
  .achievements-container {
    height: 100%;
  }

  .achievements-header span{
    font-size: clamp(18px, 5vw, 26px);
  }

  .achievements-list {
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .achievement-item {
    flex-direction: column;
    height: 90%;
    width: 75%;
    align-items: center;
  }
}

@media (min-width: 561px) and (max-width: 765px) {
  .achievements-container {
    height: 100%;
  }

  .achievements-list {
    width: min-content;
    height: min-content;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .achievement-item {
    flex-direction: column;
    height: 90%;
    width: 35%;
    align-items: center;

  }
}

@media (min-width: 766px) and (max-width: 1280px) {
  .achievements-container {
    height: 100%;
  }

  .achievements-list {
    display: flex;
    justify-content: space-between;

  }

  .achievement-item {
    flex-direction: column;
    height: 100%;
    width: 20%;
    align-items: center;

  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .achievements-list {
    display: flex;
  }

  .achievement-item {
    width: 27%;

    justify-content: space-around;
  }
}

@media (min-width: 1281px) and (max-width: 1520px) {
  .achievement-item {
    align-items: center;
  }

  .achievement-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 80%;
  }
}

</style>
