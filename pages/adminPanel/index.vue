<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useUserStore} from '~/stores/userStore';

useHead({
  title: 'УГНТУ | Панель администратора'
})

const userStore = useUserStore();
const loading = ref(true);
const router = useRouter();

async function getAllUsers() {
  try {
    await userStore.getUsers();
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
}

async function logoutUser() {
  try {
    localStorage.removeItem('admin');
    userStore.clearUser();
    await router.push('/login');
  } catch (error) {
    console.error('Ошибка при выходе из аккаунта:', error);
  }
}

async function deleteUser(userId: string) {
  if (!userId) {
    console.error('Идентификатор пользователя не определен');
    return; // Прекращаем выполнение функции, если идентификатор отсутствует
  }

  try {
    await userStore.deleteUser(userId);
    await getAllUsers(); // Обновляем список пользователей после удаления
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
  }
}

onMounted(() => {
  getAllUsers();
})

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
            <th>Действия</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in userStore.users" :key="user.id">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="delete-button" @click="() => deleteUser(user._id)">Удалить</button>
            </td>
          </tr>
          </tbody>
        </table>
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
</style>