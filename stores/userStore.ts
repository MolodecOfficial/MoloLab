 import {defineStore} from "pinia";
 import {ref} from "vue";

 export const useUserStore = defineStore('user', () => {
  const userEmail = ref('');
  const userFirstName = ref('');
  const userLastName = ref('');
  const users = ref<any[]>([]); // Массив пользователей
  const loading = ref(false); // Статус загрузки
  const error = ref('');


  function setEmail(email: string): void {
   userEmail.value = email;
  }

  function setFirstName(firstName: string): void {
   userFirstName.value = firstName;
  }

  function setLastName(lastName: string): void {
   userLastName.value = lastName;
  }

  function setUser(user: { email: string; firstName: string; lastName: string }): void {
   userEmail.value = user.email;
   userFirstName.value = user.firstName;
   userLastName.value = user.lastName;
  }

  function clearUser() {
   userFirstName.value = '';
   userLastName.value = '';
   userEmail.value = '';
  }

  async function getUsers() {
   try {
    loading.value = true;
    const response = await $fetch('/api/users');
    users.value = response.users;

   } catch (e) {
    error.value = 'Ошибка при получении списка пользователей';
   } finally {
    loading.value = false;
   }
  }

   async function deleteUser(userId: string) {
    const response = await fetch('/api/delete', { // Укажите правильный путь к вашему API
     method: 'DELETE',
     headers: {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify({ userId }), // Передаем userId в теле запроса
    });

    if (!response.ok) {
     throw new Error('Ошибка при удалении пользователя');
    }

    return await response.json(); // Возвращаем ответ от сервера
   }


  return {
   userEmail,
   userFirstName,
   userLastName,
   users,
   loading,
   error,
   setEmail,
   setFirstName,
   setLastName,
   setUser,
   clearUser,
   getUsers,
   deleteUser
  }
 })