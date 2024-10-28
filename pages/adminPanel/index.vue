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

onMounted(() => {
  getAllUsers();
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
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in userStore.users" :key="user.id">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
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
  border-collapse: collapse; /* Убираем двойные границы */
  border-radius: 10px; /* Закругляем углы */
  overflow: hidden; /* Убираем переполнение */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Тень для таблицы */
}

.styled-table thead {
  background-color: #4c86af; /* Цвет фона заголовков */
  color: white; /* Цвет текста заголовков */
}

.styled-table th,
.styled-table td {
  padding: 12px 15px; /* Отступы внутри ячеек */
  text-align: left; /* Выравнивание текста */
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd; /* Граница между строками */
}

h3 {
  text-align: center;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1; /* Цвет фона при наведении на строку */
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #4c86af; /* Увеличенная граница для последней строки */
}
.back {
  color: #5a87e7;
  text-decoration: none;
  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 3px;
  }
}
</style>