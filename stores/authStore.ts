import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
 const isAuthenticated = ref(false);
 const isAdmin = ref(false);

 const login = async (email: string) => {
  try {
   const response: any = await axios.post('http://localhost:3000/api/login', { email });
   isAuthenticated.value = response.data.isAuthenticated;
   isAdmin.value = response.data.isAdmin;

   // Сохранение данных в localStorage (по желанию)
   if (isAuthenticated.value) {
    localStorage.setItem('user', email);
    localStorage.setItem('admin', JSON.stringify({ email }));
   }
  } catch (error) {
   console.error('Ошибка при аутентификации:', error);
  }
 };

 const logout = () => {
  isAuthenticated.value = false;
  isAdmin.value = false;
  localStorage.removeItem('user');
  localStorage.removeItem('admin');
 };

 return { isAuthenticated, isAdmin, login, logout };
});