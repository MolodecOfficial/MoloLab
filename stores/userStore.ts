import { defineStore } from "pinia";
import { ref } from "vue";
import { achievementsList } from '~/stores/achievementsStore';  // Список доступных достижений

export const useUserStore = defineStore('user', () => {
 const userId = ref('');
 const userEmail = ref('');
 const userFirstName = ref('');
 const userLastName = ref('');
 const currentUser = ref<any>(null);
 const users = ref<any[]>([]);
 const loading = ref(false);
 const error = ref('');

 const achievements = ref<any[]>(achievementsList); // Список доступных достижений

 function setId(id: string) {
  userId.value = id
 }

 function setEmail(email: string): void {
  userEmail.value = email;
 }

 function setFirstName(firstName: string): void {
  userFirstName.value = firstName;
 }

 function setLastName(lastName: string): void {
  userLastName.value = lastName;
 }

 function setUser(user: { email: string; firstName: string; lastName: string; _id?: string }) {
  userEmail.value = user.email;
  userFirstName.value = user.firstName;
  userLastName.value = user.lastName;
  currentUser.value = user;
  userId.value = user._id || '';  // Сохраняем ID пользователя

  localStorage.setItem('user', JSON.stringify({
   firstName: user.firstName,
   lastName: user.lastName,
   email: user.email,
   _id: user._id
  }));
 }


 function clearUser() {
  userFirstName.value = '';
  userLastName.value = '';
  userEmail.value = '';
  currentUser.value = null;
 }

 // Получение всех пользователей
 const getUsers = async () => {
  try {
   loading.value = true;
   const response = await $fetch('/api/users');
   users.value = response.users;
   console.log("Загруженные пользователи:", users.value); // Выводим список пользователей
  } catch (e) {
   error.value = 'Ошибка при получении списка пользователей';
  } finally {
   loading.value = false;
  }
 };

 // Удаление пользователя
 async function deleteUser(userId: string) {
  const response = await fetch('/api/delete', {
   method: 'DELETE',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ userId }),
  });
  if (!response.ok) {
   throw new Error('Ошибка при удалении пользователя');
  }
  return await response.json();
 }

 // Метод для выдачи достижения
 async function giveAchievement(userId: string, achievementId: string) {
  if (!userId || !achievementId) {
   console.error("Не переданы userId или achievementId");
   throw new Error("Не переданы необходимые данные");
  }

  try {
   const response = await $fetch('/api/give-achievement', {
    method: 'POST',
    body: { userId, achievementId },
   });

   if (response && response.message === ' Достижение успешно выдано') {
    console.log(`Достижение ${achievementId} успешно выдано пользователю ${userId}`);
    return response;
   } else {
    throw new Error("Ошибка при выдаче достижения");
   }
  } catch (error) {
   console.error('Ошибка при выдаче достижения:', error);
   throw error;
  }
 }

 const getUserAchievements = (userId: string) => {
  const user = users.value.find(user => user._id === userId);
  if (user) {
   console.log("Пользователь найден:", user);
   const obtainedAchievements: any = achievementsList.filter(achievement =>
       user.achievements.includes(achievement.id)
   );
   console.log("Найденные достижения пользователя:", obtainedAchievements);
   return obtainedAchievements;
  }
  console.log("Пользователь не найден");
  return [];
 };

 onMounted(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
   const user = JSON.parse(savedUser);
   userId.value = user._id;
   userEmail.value = user.email;
   userFirstName.value = user.firstName;
   userLastName.value = user.lastName;
   currentUser.value = user;
  }
 });

 return {
  userEmail,
  userFirstName,
  userLastName,
  currentUser,
  users,
  loading,
  error,
  userId,
  achievements,
  setEmail,
  setFirstName,
  setLastName,
  setUser,
  clearUser,
  getUsers,
  deleteUser,
  giveAchievement,
  getUserAchievements,  // Экспортируем новый метод
 };
});
