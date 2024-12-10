import { defineStore } from "pinia";
import { ref } from "vue";
import { achievementsList } from '~/stores/achievementsStore';

export const useUserStore = defineStore('user', () => {
 const userId = ref('');
 const userEmail = ref('');
 const userFirstName = ref('');
 const userLastName = ref('');
 const userStatus = ref('')
 const userSpecialty = ref('')
 const userGroup = ref('')
 const userCode = ref('')
 const userDirection = ref('')
 const userLearning = ref('')
 const userFormOfLearning = ref('')
 const userFaculty = ref('')
 const userCourse = ref('')
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

 function setUser(user:
                  {
                   email: string;
                   firstName: string;
                   lastName: string;
                   _id?: string;
                   status: string;
                   specialty: string,
                   group: string,
                   code: string,
                   direction: string,
                   learning: string,
                   form_of_learning: string,
                   faculty: string,
                   course: string
                  }) {
  userEmail.value = user.email;
  userFirstName.value = user.firstName;
  userLastName.value = user.lastName;
  currentUser.value = user;
  userId.value = user._id || '';  // Сохраняем ID пользователя
  userStatus.value = user.status
  userSpecialty.value = user.specialty
  userGroup.value = user.group
  userCode.value = user.code
  userDirection.value = user.direction
  userLearning.value = user.learning
  userFormOfLearning.value = user.form_of_learning
  userFaculty.value = user.faculty
  userCourse.value = user.course

  localStorage.setItem('user', JSON.stringify({
   firstName: user.firstName,
   lastName: user.lastName,
   email: user.email,
   _id: user._id,
   status: user.status,
   specialty: user.specialty,
   group: user.group,
   code: user.code,
   direction: user.direction,
   learning: user.learning,
   form_of_learning: user.form_of_learning,
   faculty: user.faculty,
   course: user.course
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

   console.log('Ответ от сервера:', response); // Логируем ответ

// Исправьте строку без пробела в начале
   if (response && response.message === 'Достижение успешно выдано') {
    console.log(`Достижение ${achievementId} успешно выдано пользователю ${userId}`);
    return response;
   } else {
    console.error("Ошибка при выдаче достижения:", response);
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
 }

 async function changeStatus(userId: string, newStatus: string) {
  try {
   const response = await $fetch(`/api/edit-status`, {
    method: 'POST',
    body: { userId, newStatus }
   });
   return response;
  } catch (error) {
   console.error('Error updating user status:', error);
   throw error;
  }
 }

 async function addSpecialty(userId: string, specialtyName: string) {
  if (!userId || !specialtyName) {
   console.error("Не переданы userId или specialtyName");
   throw new Error("Не переданы необходимые данные");
  }

  try {
   console.log('Ищем специальность с названием:', specialtyName);
   console.log('Список специальностей:', specialtyList);

   // Ищем специальность по названию
   const selectedSpecialty = specialtyList.find(specialty => specialty.specialty_name === specialtyName);

   if (!selectedSpecialty) {
    console.error("Специальность не найдена");
    throw new Error("Специальность не найдена");
   }

   const response = await $fetch('/api/give-specialty', {
    method: 'POST',
    body: {
     userId,
     specialtyId: selectedSpecialty.id // Передаем ID найденной специальности
    },
   });

   console.log('Ответ от сервера:', response); // Логируем ответ

   if (response && response.message === 'Специальность успешно добавлена') {
    // Обновляем данные пользователя в store
    const user = users.value.find(user => user._id === userId);
    if (user) {
     user.specialty = selectedSpecialty.specialty_name;
     user.group = selectedSpecialty.group;
     user.code = selectedSpecialty.code;
     user.direction = selectedSpecialty.direction;
     user.faculty = selectedSpecialty.faculty
    }
    console.log(`Специальность ${selectedSpecialty.specialty_name} успешно добавлена пользователю ${userId}`);
    return response;
   } else {
    console.error("Ошибка при добавлении специальности:", response);
    throw new Error("Ошибка при добавлении специальности");
   }
  } catch (error) {
   console.error('Ошибка при добавлении специальности:', error);
   throw error;
  }
 }

 async function addLearningDetails(userId: string, learning: string, formOfLearning: string, course: string) {
  if (!userId || !learning || !formOfLearning || !course) {
   console.error("Не переданы userId, learning, formOfLearning или course");
   throw new Error("Не переданы необходимые данные");
  }

  try {
   const response = await $fetch('/api/give-learning', {
    method: 'POST',
    body: { userId, learning, formOfLearning, course }
   });

   if (response && response.message === 'Данные обучения успешно обновлены') {
    const user = users.value.find(user => user._id === userId);
    if (user) {
     user.learning = learning;
     user.form_of_learning = formOfLearning;
     user.course = course;
    }
    return response;
   } else {
    console.error("Ошибка при обновлении данных обучения:", response);
    throw new Error("Ошибка при обновлении данных обучения");
   }
  } catch (error) {
   console.error("Ошибка при обновлении данных обучения:", error);
   throw error;
  }
 }

 onMounted(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
   const user = JSON.parse(savedUser);
   userId.value = user._id;
   userEmail.value = user.email;
   userFirstName.value = user.firstName;
   userLastName.value = user.lastName;
   userStatus.value = user.status;
   userSpecialty.value = user.specialty
   userGroup.value = user.group;
   userCode.value = user.code;
   userDirection.value = user.direction;
   userLearning.value = user.learning;
   userFormOfLearning.value = user.form_of_learning;
   userFaculty.value = user.faculty;
   userCourse.value = user.course;
   currentUser.value = user;
  }
 });

 return {
  userEmail,
  userFirstName,
  userLastName,
  userStatus,
  userSpecialty,
  userGroup,
  userCode,
  userDirection,
  userLearning,
  userFormOfLearning,
  userFaculty,
  userCourse,
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
  changeStatus,
  giveAchievement,
  getUserAchievements,
  addSpecialty,
  addLearningDetails
 };
});