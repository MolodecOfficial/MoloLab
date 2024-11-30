<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '~/stores/userStore';  // Импортируем store для пользователя
import { achievementsList } from '~/stores/achievementsStore';  // Список достижений

// Получаем доступ к userStore
const userStore = useUserStore();

// Берем ID текущего пользователя
const userId = userStore.userId;

// Логика для загрузки достижений пользователя
const userAchievements = ref<any[]>([]);

// Применяем динамическое состояние "получено"
const updatedAchievements = ref<any[]>([]);
console.log("Обновленные достижения:", updatedAchievements.value);
// При монтировании компонента получаем достижения пользователя
onMounted(async () => {
  await userStore.getUsers();  // Загружаем пользователей
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
  <section class="achievements-container">
    <section class="achievements-header">
      <span>Ваши достижения!</span>
    </section>
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
        <h3>{{ achievement.title }}</h3>
        <p>{{ achievement.description }}</p>
      </div>
    </div>
  </section>
</template>




<style scoped>

@keyframes load {
  0% {
    color: #2c2c2c;
  }
  50% {
    color: #9c9c9c;
  }
  100% {
    color: #2c2c2c;
  }
}


.dark-theme .achievements-container {
  background-color: #1a1a1a;
}

.dark-theme .achievements-header {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
  & span {
    color: white;
  }
}

.dark-theme .achievement-item {
  background-color: #1e1e1e;
  & h3 {
    color: white;
  }
  & p {
    color: white;
  }
}

.dark-theme .achievement-item.obtained {
  border-left: 5px solid #28a745; /* Зеленая полоска для полученных достижений */
  & h3, p {
    color: #1a1a1a;
  }
}

.achievements-container {
  width: 100%;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  height: 300vh;
}

.achievements-header {
  background-color: #ffffff;
  width: 90%;
  height: 12vh;
  margin-top: 74px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  & span {
    font-size: 30px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.achievements-list {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

}

.achievement-item {
  background-color: #ffffff;
  margin: 10px;
  padding: 15px;
  border-radius: 15px;
  text-align: center;
  width: calc(25% - 50px); /* Четыре элемента в ряд с отступами */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
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

</style>