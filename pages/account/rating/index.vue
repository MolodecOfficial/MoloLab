<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '~/stores/userStore';

useHead({
  title: 'УГНТУ | Рейтинг'
})

const userAverageScore = ref('');
const userGeneralScore = ref('');
const userRanking = ref('Не определено'); // Для хранения ранга текущего пользователя
const userStore = useUserStore();

async function getAllUsers() {
  try {
    await userStore.getUsers();

    // Сортируем пользователей по `generalScore` по убыванию
    userStore.users.sort((a, b) => parseFloat(b.generalScore) - parseFloat(a.generalScore));

    // После загрузки данных вычисляем ранг текущего пользователя
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);

      // Находим индекс текущего пользователя в отсортированном списке
      const rankIndex = userStore.users.findIndex(
          (user) => user.email === currentUser.email
      );

      if (rankIndex !== -1) {
        userRanking.value = String(rankIndex + 1); // Ранг начинается с 1
        userGeneralScore.value = currentUser.generalScore;
        userAverageScore.value = currentUser.averageScore;
      }
    }
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  }
}

onMounted(() => {
  getAllUsers();
});

</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList/>
    <section class="rating-container">
      <section class="rating-header">
        <span>Ваш рейтинг!</span>
      </section>
      <section class="rating-info">
        <section class="rating-section">
          <section class="rating-plate">
            <span>Ваше место: <strong>{{ userRanking }}</strong></span>
          </section>
          <section class="rating-plate">
            <span>Ваш общий балл: <strong>{{ userGeneralScore }}</strong></span>
          </section>
          <section class="rating-plate">
            <span>Ваш средний балл: <strong>{{ userAverageScore }}</strong></span>
          </section>
        </section>
        <section class="rating-all-users">
          <div class="rating-header-row">
            <div class="rating-cell">Место</div>
            <div class="rating-cell">Имя</div>
            <div class="rating-cell">Фамилия</div>
            <div class="rating-cell">Общий балл</div>
            <div class="rating-cell">Средний балл</div>
          </div>
          <div class="rating-body">
            <div class="rating-row" v-for="(user, idx) in userStore.users" :key="idx">
              <div class="rating-cell">{{ idx + 1 }}</div>
              <div class="rating-cell">{{ user.firstName }}</div>
              <div class="rating-cell">{{ user.lastName }}</div>
              <div class="rating-cell">{{ user.generalScore }}</div>
              <div class="rating-cell">{{ user.averageScore }}</div>
            </div>
          </div>
        </section>
      </section>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  overflow-x: hidden;
  background-color: white;
}

.dark-theme .container {
  background-color: #1e1e1e;
}

.rating-container {
  width: 100%;
  background-color: rgba(237, 244, 255, 0.82);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  min-height: 93vh;
  border-top-left-radius: 20px;
  border: 1px solid #e0e0e0;
}

.rating-header {
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
  border: 1px solid #e0e0e0;
  & span {
    font-size: 30px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.rating-info {
  display: flex;
  width: 90%;
  justify-content: space-between;
  gap: 30px;
}

.rating-section {
  gap: 20px;
  display: flex;
  flex-direction: column;
  width: 32%;

}

.rating-plate {
  text-align: center;
  border-radius: 20px;
  padding: 20px 30px;
  background-color: #ffffff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e0e0e0;

}

.rating-plate:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.rating-plate span {
  font-size: 26px;
  font-weight: bold;
  color: #424242;
}

.rating-plate strong {
  color: #4e45e3;
}

.rating-all-users {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  max-height: fit-content;
  margin: 0 auto;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
}

.rating-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Равномерное распределение */
  background: linear-gradient(135deg, #8e24aa, #4e45e3);
  color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 5px; /* Такой же padding, как у rating-row */
  text-transform: uppercase;
  letter-spacing: 1px;
}

.rating-row {
  display: flex;
  align-items: center; /* Вертикальное выравнивание */
  justify-content: space-between; /* Равномерное распределение */
  background: #ffffff;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  transition: background 0.3s ease, transform 0.3s ease;
  padding: 2px; /* Такой же padding, как у rating-header-row */
}

.rating-cell {
  flex: 1;
  text-align: center;
  padding: 15px;
  font-size: 16px;
  font-weight: 400;
}

.rating-header-row .rating-cell {
  font-size: 16px; /* Размер шрифта совпадает с ячейками */
  font-weight: bold; /* Для акцента */
  text-align: center; /* Центрирование текста */
  padding: 15px; /* Совпадает с другими строками */
}

.rating-body {
  display: flex;
  flex-direction: column;
}

.rating-row:last-child {
  border-bottom: none;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.rating-row:hover {
  background: #f3e5f5;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.dark-theme .rating-container {
  background-color: #151515;
  border: 1px solid #2c2c2c;
}

.dark-theme .rating-header {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
  & span {
    color: white;
  }
}

.dark-theme .rating-plate {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
  & span {
    color: #4e45e3;
  }
  & strong {
    color: white;
  }
}

.dark-theme .rating-all-users {
  border: 1px solid #2c2c2c;
  background-color: #1e1e1e;
}

.dark-theme .rating-header-row {
  background: linear-gradient(135deg, #42104d, #13114f);
  color: white;
}

@media (max-width: 560px) {

  .rating-info {
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .rating-section {
    width: 90%;
    align-items: center;
    justify-content: center;

  }
  .rating-plate {
    width: 90%;
  }

  .rating-all-users {
    width: 85%;
  }
  .rating-header-row {
    & .rating-cell {
      font-size: 5px;
      padding: 6px 11px;
    }
  }

  .rating-cell {
    font-size: 7px;
  }
}

@media (min-width: 561px) and (max-width: 765px) {
  .rating-info {
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .rating-section {
    width: 90%;
    align-items: center;
    justify-content: center;

  }
  .rating-plate {
    width: 100%;
  }

  .rating-all-users {
    width: 85%;
  }
  .rating-header-row {
    & .rating-cell {
      font-size: 8px;
      padding: 6px 11px;
    }
  }

  .rating-cell {
    font-size: 12px;
  }
}

@media (min-width: 766px) and (max-width: 1280px) {


}

</style>