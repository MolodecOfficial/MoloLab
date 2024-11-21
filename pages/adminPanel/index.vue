<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '~/stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const loading = ref(true);
const showAchievementModal = ref(false);
const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('');
const selectedAchievement = ref<string | null>(null);
const achievements = ref<any[]>([]); // Список достижений

async function getAllUsers() {
  try {
    await userStore.getUsers();
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
}

// Получаем достижения из хранилища
async function getAllAchievements() {
  achievements.value = userStore.achievements; // Берем достижения из хранилища
}

// Логика для выхода из аккаунта
async function logoutUser() {
  localStorage.removeItem('admin');
  userStore.clearUser();
  await router.push('/login');
}

// Логика для удаления пользователя
async function deleteUser(userId: string) {
  if (!userId) {
    console.error('Идентификатор пользователя не определен');
    return;
  }

  try {
    await userStore.deleteUser(userId);
    await getAllUsers();
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
  }
}

// Открытие модального окна для выдачи достижения
const openAchievementModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`; // Исправлено
  showAchievementModal.value = true;
};

// Подтверждение выдачи достижения
const giveAchievementToUser = async () => {
  if (selectedUserId.value && selectedAchievement.value) {
    try {
      await userStore.giveAchievement(selectedUserId.value, selectedAchievement.value);
      alert('Достижение успешно выдано!');
      showAchievementModal.value = false;
    } catch (error) {
      console.error('Ошибка при выдаче достижения:', error);
      alert('Не удалось выдать достижение.');
    }
  } else {
    alert('Выберите пользователя и достижение.');
  }
};

// Метод для получения всех пользователей
onMounted(() => {
  getAllUsers();
  getAllAchievements();
});
</script>

<template>
  <AccountMoloGuard>
    <div>
      <NuxtLink class="back" to="/login" @click="logoutUser">Вернуться на страницу входа</NuxtLink>
      <h3>Добро Пожаловать в панель администратора</h3>
      <h3>Текущий список пользователей</h3>
      <p v-if="loading">Загрузка пользователей...</p>
      <section v-else>
        <table class="styled-table">
          <thead>
          <tr>
            <th>Имя пользователя</th>
            <th>Фамилия</th>
            <th>Почта</th>
            <th>Достижения</th>
            <th>Действия</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in userStore.users" :key="user._id">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>
              {{
                Array.isArray(user.achievements) && user.achievements.length > 0
                    ? user.achievements.sort((a, b) => parseInt(a) - parseInt(b)).join(', ')
                    : 'Нет достижений'
              }}
            </td>
            <td class="btns">
              <button class="delete-button" @click="() => deleteUser(user._id)">Удалить</button>
              <button class="give-achievement" @click="() => openAchievementModal(user)">Выдать достижение</button>
            </td>
          </tr>
          </tbody>
        </table>

        <!-- Модальное окно для выдачи достижения -->
        <div v-if="showAchievementModal" class="modal-overlay">
          <div class="modal-content">
            <h4>Выдача достижения пользователю {{ selectedUserName }}</h4>
            <select v-if="achievements.length > 0" v-model="selectedAchievement" class="achievement-select">
              <option value="" disabled>Выберите достижение</option>
              <option v-for="achievement in achievements" :value="achievement.id" :key="achievement.id">
                {{ achievement.title }}
              </option>
            </select>
            <p v-else>Нет доступных достижений.</p>
            <div class="modal-buttons">
              <button class="confirm-button" @click="giveAchievementToUser">Подтвердить</button>
              <button class="cancel-button" @click="showAchievementModal = false">Отмена</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AccountMoloGuard>
</template>



<style scoped>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.styled-table thead {
  background-color: #4c86af;
  color: white;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: left;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

h3 {
  text-align: center;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #4c86af;
}

.back {
  color: #5a87e7;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 20px;
}

.back:hover {
  text-decoration: underline;
}

.btns {
  display: flex;
  gap: 30px;
}

.delete-button {
  background-color: #e74c3c; /* Красный цвет для кнопки удаления */
  color: white; /* Белый текст */
  border: none; /* Убираем границу */
  border-radius: 5px; /* Закругляем углы */
  padding: 8px 12px; /* Отступы внутри кнопки */
  cursor: pointer; /* Курсор в виде указателя */
  transition: background-color 0.3s ease; /* Плавный переход цвета фона */
}

.delete-button:hover {
  background-color: #c0392b; /* Темнее при наведении */
}

.give-achievement {
  background-color: #32a428;
  color: white; /* Белый текст */
  border: none; /* Убираем границу */
  border-radius: 5px; /* Закругляем углы */
  padding: 8px 12px; /* Отступы внутри кнопки */
  cursor: pointer; /* Курсор в виде указателя */
  transition: background-color 0.3s ease; /* Плавный переход цвета фона */
}

.give-achievement:hover {
  background-color: #288520;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Убедитесь, что модальное окно поверх других элементов */
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px; /* Ширина модального окна */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease; /* Анимация появления */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h4 {
  margin-bottom: 15px;
}

.achievement-select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.confirm-button,
.cancel-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button {
  background-color: #28a745; /* Зеленый цвет для подтверждения */
  color: white;
}

.cancel-button {
  background-color: #dc3545; /* Красный цвет для отмены */
  color: white;
}

.confirm-button:hover,
.cancel-button:hover {
  opacity: 0.9; /* Эффект при наведении */
}
</style>