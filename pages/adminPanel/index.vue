<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useUserStore} from '~/stores/userStore';
import {useRouter} from 'vue-router';


useHead({
  title: 'УГНТУ | Панель администратора'
})

const router = useRouter();
const userStore = useUserStore();

const loading = ref(true);
const showAchievementModal = ref(false);
const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('');
const selectedAchievement = ref<string | null>(null);
const achievements = ref<any[]>([]); // Список достижений
const selectedStatus = ref<string | null>(null);
const showSpecialtyModal = ref(false);
const showStatusModal = ref(false);
const selectedSpecialty = ref<string | null>(null);
const showLearningModal = ref(false);
const selectedLearning = ref<string | null>(null);
const selectedForm = ref<string | null>(null);
const selectedCourse = ref<string | null>(null);
const statusMessage = ref('')
const showDeleteModal = ref(false)
const selectedSubject = ref<string | null>(null);
const selectedScore = ref<number | null>(null);
const showScoresModal = ref(false);
const userFirstName = ref('');
const userLastName = ref('');
const userEmail = ref('')
const userStatus = ref('')
const userData = ref(null);
const availableSubjects = ref<any[]>()
const currentUser = ref<any>(null); // Это будет объект с данными текущего пользователя

const showScheduleModal = ref(false);  // Состояние для отображения модального окна для расписания
const selectedSchedule = ref<any[]>([]);  // Данные расписания
const newSchedule = ref({
  day: '',
  time: '',
  subject: '',
  group: '',
});


// Загрузка данных из localStorage
onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    userFirstName.value = user.firstName;
    userLastName.value = user.lastName;
    userEmail.value = user.email;
    userStatus.value = user.status
  } else {
    userFirstName.value = userStore.userFirstName;
    userLastName.value = userStore.userLastName;
    userEmail.value = userStore.userEmail;
    userStatus.value = userStore.userStatus
  }

});

async function getAllUsers() {
  try {
    await userStore.getUsers();
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
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
async function deleteUser(userId: any) {
  if (!userId) {
    console.error('Идентификатор пользователя не определен');
    return;
  }
  const user = userStore.users.find((u: any) => u._id === userId);
  if (user?.status === 'Владелец') {
    statusMessage.value = 'Данного пользователя нельзя удалить.';
    return;
  }
  try {
    await userStore.deleteUser(userId);
    setTimeout(() => showDeleteModal.value = false, 1500)
    statusMessage.value = 'Пользователь успешно удалён!'
    await getAllUsers();

  } catch (error) {
    statusMessage.value = 'Произошла ошибка при удалении'
    console.error('Ошибка при удалении пользователя:', error);
  }
}


// Открытие модального окна для удаления пользователя
const openDeleteModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`; // Исправлено
  showDeleteModal.value = true;
};

// Открытие модального окна для выдачи достижения
const openAchievementModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`; // Исправлено
  showAchievementModal.value = true;
};

// Открытие модального окна для изменения статуса
const openStatusModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`; // Имя пользователя
  selectedStatus.value = user.status; // Текущий статус
  showStatusModal.value = true; // Показываем модальное окно
};

// Открытие модального окна для выбора специальности
const openSpecialtyModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  showSpecialtyModal.value = true;
};

// Открытие модального окна для выбора обучения
const openLearningModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  selectedLearning.value = user.learning;
  selectedForm.value = user.form_of_learning;
  selectedCourse.value = user.course;
  showLearningModal.value = true;
};

const openScoresModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  selectedScore.value = user.scores || 0; // Текущие оценки пользователя
  showScoresModal.value = true;
};

const openScheduleModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  showScheduleModal.value = true;
};

// Выдача достижения
const giveAchievementToUser = async () => {
  if (selectedUserId.value && selectedAchievement.value) {
    try {
      await userStore.giveAchievement(selectedUserId.value, selectedAchievement.value);
      setTimeout(() => showAchievementModal.value = false, 1500)
      statusMessage.value = 'Достижение успешно выдано!'
      await getAllUsers()
      setTimeout(() => statusMessage.value = '', 1500)
    } catch (error) {
      console.error('Ошибка при выдаче достижения:', error);
      statusMessage.value = 'Не удалось выдать достижение.'
    }
  } else {
    statusMessage.value = 'Выберите пользователя и достижение.'
  }
};

// Изменение статуса
const changeUserStatus = async () => {
  if (selectedUserId.value && selectedStatus.value) {
    try {
      await userStore.changeStatus(selectedUserId.value, selectedStatus.value);
      setTimeout(() => showStatusModal.value = false, 1500)
      statusMessage.value = 'Статус пользователя успешно изменен!'
      await getAllUsers();
      setTimeout(() => statusMessage.value = '', 1500)
    } catch (error) {
      console.error('Ошибка при изменении статуса:', error);
      statusMessage.value = 'Не удалось изменить статус пользователя.'
    }
  } else {
    statusMessage.value = 'Выберите пользователя и новый статус.'
  }
};

// Выбор специальности
const assignSpecialty = async () => {
  if (selectedUserId.value && selectedSpecialty.value) {
    try {
      await userStore.addSpecialty(selectedUserId.value, selectedSpecialty.value);
      setTimeout(() => showSpecialtyModal.value = false, 1500)
      statusMessage.value = `Специальность успешно добавлена!`
      await getAllUsers()
      setTimeout(() => statusMessage.value = '', 1500)
    } catch (error) {
      console.error('Ошибка при добавлении специальности:', error);
      statusMessage.value = 'Не удалось добавить специальность.'
    }
  } else {
    statusMessage.value = 'Выберите пользователя и специальность.'
  }
};

// Выбор обучения
const updateLearningDetails = async () => {
  if (selectedUserId.value && selectedLearning.value && selectedForm.value && selectedCourse.value) {
    try {
      await userStore.addLearningDetails(
          selectedUserId.value,
          selectedLearning.value,
          selectedForm.value,
          selectedCourse.value
      );
      statusMessage.value = 'Данные обучения успешно обновлены!'
      setTimeout(() => showLearningModal.value = false, 1500)
      await getAllUsers();
      setTimeout(() => statusMessage.value = '', 1500)
    } catch (error) {
      console.error('Ошибка при обновлении данных обучения:', error);
      statusMessage.value = 'Не удалось обновить данные обучения.'
    }
  } else {
    statusMessage.value = 'Пожалуйста, заполните все поля.'
  }
};

const updateUserScores = async () => {
  console.log('Updating user scores', selectedUserId.value, selectedSubject.value, selectedScore.value); // Логирование

  if (selectedUserId.value && selectedSubject.value && selectedScore.value !== null) {
    try {
      // Добавляем или обновляем оценку
      await userStore.addScore(selectedUserId.value, selectedSubject.value, selectedScore.value);

      // Обновляем средний балл и рейтинг пользователя
      const updatedUser = userStore.users.find((user) => user._id === selectedUserId.value);
      if (updatedUser) {
        console.log('Обновленные данные пользователя:', updatedUser); // Логирование обновленных данных пользователя
        setTimeout(() => showScoresModal.value = false, 1500);
        await getAllUsers();
        statusMessage.value = 'Оценки пользователя успешно обновлены!';
        setTimeout(() => statusMessage.value = '', 1500);
      }
    } catch (error) {
      console.error('Ошибка при обновлении оценок:', error);
      statusMessage.value = 'Не удалось обновить оценки.';
    }
  } else {
    statusMessage.value = 'Пожалуйста, укажите предмет и оценку.';
  }
};

const calculateAverage = (scores: any) => {
  if (Array.isArray(scores) && scores.length > 0) {
    const sum = scores.reduce((acc, score) => acc + Number(score), 0);
    return (sum / scores.length).toFixed(2);
  }
  return 'Нет оценок';
}


async function fetchAvailableSubjects() {
  try {
    const response = await fetch('/api/edit-scores');
    if (response.ok) {
      const data = await response.json();
      availableSubjects.value = data.allowedSubjects.sort((a, b) => a.localeCompare(b, 'ru'));
    } else {
      console.error('Не удалось получить список предметов');
    }
  } catch (error) {
    console.error('Ошибка при загрузке предметов:', error);
  }
}

// const addSchedule = async () => {
//   if (newSchedule.value.day && newSchedule.value.time && newSchedule.value.subject && newSchedule.value.group) {
//     try {
//       // Подготовим данные для отправки в нужном формате
//       const scheduleData: any = {
//         userId: selectedUserId.value,  // Убедитесь, что selectedUserId передается
//         date: newSchedule.value.day,   // Используем день для даты
//         groups: {
//           [newSchedule.value.group]: [
//             {
//               time: newSchedule.value.time,
//               subject: newSchedule.value.subject,
//             }
//           ]
//         }
//       };
//
//       // Добавляем новое расписание
//       await userStore.addSchedule(scheduleData);
//
//       statusMessage.value = 'Расписание успешно добавлено!';
//       setTimeout(() => showScheduleModal.value = false, 1500);
//       await getAllUsers();  // Обновляем список пользователей
//       setTimeout(() => statusMessage.value = '', 1500);
//     } catch (error) {
//       console.error('Ошибка при добавлении расписания:', error);
//       statusMessage.value = 'Не удалось добавить расписание.';
//     }
//   } else {
//     statusMessage.value = 'Пожалуйста, заполните все поля.';
//   }
// }

// Вычисляем цвет на основе среднего балла
function getAverageColor(scores: any) {
  const average = parseFloat(calculateAverage(scores));
  if (isNaN(average)) return '#ffffff';

  if (average >= 4.5) return '#0cb000';  // Green
  if (average >= 4.0) return '#8ab000';  // Yellow-Green
  if (average >= 3.5) return '#ffcc00';  // Yellow
  if (average >= 3.0) return '#ff5900';  // Orange
  if (average >= 2.5) return '#ff0000';  // Red
  if (average >= 2.0) return '#ff0000';  // Max red
  return '#731601';  // Dark Red
}


// Метод для получения всех пользователей
onMounted(async () => {
  await getAllUsers();
  await getAllAchievements();
  await fetchAvailableSubjects();
});
</script>

<template>
  <AccountMoloGuard>
    <div class="bg">
      <section class="hyperlinks">
        <NuxtLink class="back" to="/login" @click="logoutUser">Вернуться на страницу входа</NuxtLink>
        <NuxtLink class="back" to="/account">Вернуться на страницу аккаунта</NuxtLink>
      </section>

      <h3>Добро Пожаловать в панель администратора</h3>
      <h3>Текущий список пользователей</h3>
      <div v-if="loading" class="fun-loader">
        <div class="loader">
          <div class="dot"></div>
        </div>
      </div>
      <section class="user-section_v-else" v-else>
        <section v-for="user in userStore.users"
                 :key="user._id"
                 class="user-section"
        >
          <hr>
          <section>
            <span>Данные о пользователе</span>
          </section>
          <hr>
          <span class="user-span"> Имя пользователя: <span class="user">{{ user.firstName }} </span></span>
          <span class="user-span"> Фамилия: <span class="user">{{ user.lastName }}</span> </span>
          <span class="user-span"> Почта: <span class="user">{{ user.email }}</span> </span>
          <span class="user-span"> Статус: <span class="user">{{ user.status }}</span> </span>
          <span class="user-span"> Достижения:
            <span class="user">
              {{
                Array.isArray(user.achievements) && user.achievements.length > 0
                    ? user.achievements.sort((a: any, b: any) => parseInt(a) - parseInt(b)).join(', ')
                    : 'Нет достижений'
              }}
            </span>
          </span>
          <hr>
          <section>
            <span>Данные о специальности</span>
          </section>
          <hr>
          <span class="user-span"> Специальность: <span class="user">{{ user.specialty }}</span> </span>
          <span class="user-span"> Группа: <span class="user">{{ user.group }}</span> </span>
          <span class="user-span"> Направление: <span class="user">{{ user.direction }}</span> </span>
          <span class="user-span"> Код: <span class="user">{{ user.code }}</span> </span>
          <span class="user-span"> Факультет: <span class="user">{{ user.faculty }}</span> </span>
          <span class="user-span"> Форма обучения: <span class="user">{{ user.form_of_learning }}</span> </span>
          <span class="user-span"> Обучение: <span class="user">{{ user.learning }}</span> </span>
          <span class="user-span"> Курс: <span class="user">{{ user.course }}</span> </span>
          <hr>
          <section>
            <span>Данные о успеваемости</span>
          </section>
          <hr>
          <section>
            <span>
              Общий балл: {{ user.generalScore }}
            </span>
          </section>
          <section>
            <span>
              Средний балл: {{ user.averageScore }}
            </span>
          </section>
          <hr>
          <div v-for="(scores, subject) in user.score" :key="subject" class="user-scores">
            <span class="user-span">{{ subject }}</span>
            <span v-if="Array.isArray(scores)" class="user" :data-average="calculateAverage(scores)"
                  :style="{ color: getAverageColor(scores) }">
              {{ calculateAverage(scores) }}
            </span>
          </div>
          <hr>
          <section>
            <span>Действия</span>
          </section>
          <hr>
          <section class="actions">
            <button class="delete-button" v-if="user.email !== 'MolodecOfficial'" @click="() => openDeleteModal(user)">
              Удалить
            </button>
            <span v-else class="restricted-action">
              Удаление запрещено для данного пользователя
            </span>
            <button class="achievement-button" @click="() => openAchievementModal(user)">Выдать достижение</button>
            <button class="status-button" v-if="user.email !== 'MolodecOfficial'" @click="() => openStatusModal(user)">
              Изменить статус
            </button>
            <span v-else class="restricted-action">
              Смена статуса запрещена для данного пользователя
            </span>
            <button class="specialty-button" @click="() => openSpecialtyModal(user)">Выбор специальности</button>
            <button class="learning-button" @click="() => openLearningModal(user)">Выбор обучения</button>
            <button class="scores-button" @click="() => openScoresModal(user)">Добавить оценку</button>
<!--            <button class="schedule-button" @click="() => openScheduleModal(user)">Добавить расписание</button>-->

          </section>
        </section>

        <!-- Модальное окно для удаления пользователя -->
        <div v-if="showDeleteModal" class="modal-overlay">
          <div class="modal-content">
            <h4>Удалить пользователя {{ selectedUserName }} ?</h4>
            <div class="modal-buttons">
              <button class="confirm-button" @click="() => deleteUser(selectedUserId)">Подтвердить</button>
              <span> {{ statusMessage }} </span>
              <button class="cancel-button" @click="showDeleteModal = false">Отмена</button>

            </div>
          </div>
        </div>

        <!-- Модальное окно для выдачи достижения -->
        <div v-if="showAchievementModal" class="modal-overlay">
          <div class="modal-content">
            <h4>Выдача достижения пользователю {{ selectedUserName }}</h4>
            <select v-if="achievements.length > 0" v-model="selectedAchievement" class="select">
              <option value="" disabled>Выберите достижение</option>
              <option v-for="achievement in achievements" :value="achievement.id" :key="achievement.id">
                {{ achievement.title }}
              </option>
            </select>
            <p v-else>Нет доступных достижений.</p>
            <div class="modal-buttons">
              <button class="confirm-button" @click="giveAchievementToUser">Подтвердить</button>
              <span> {{ statusMessage }} </span>
              <button class="cancel-button" @click="showAchievementModal = false">Отмена</button>

            </div>
          </div>
        </div>

        <div v-if="showStatusModal" class="modal-overlay">
          <div class="modal-content">
            <h4>Изменение статуса для пользователя {{ selectedUserName }}</h4>
            <select v-model="selectedStatus" class="select">
              <option value="Студент">Студент</option>
              <option value="Преподаватель">Преподаватель</option>
              <option value="Администратор">Администратор</option>
            </select>
            <div class="modal-buttons">
              <button class="confirm-button" @click="changeUserStatus">Подтвердить</button>
              <span> {{ statusMessage }} </span>
              <button class="cancel-button" @click="showStatusModal = false">Отмена</button>
            </div>
          </div>
        </div>

        <div v-if="showSpecialtyModal" class="modal-overlay">
          <div class="modal-content">
            <h4>Добавление специальности пользователю {{ selectedUserName }}</h4>
            <select v-model="selectedSpecialty" class="select">
              <option value="" disabled>Выберите специальность</option>
              <option v-for="specialty in specialtyList" :value="specialty.specialty_name" :key="specialty.id">
                {{ specialty.specialty_name }}
              </option>
            </select>
            <div class="modal-buttons">
              <button class="confirm-button" @click="assignSpecialty">Подтвердить</button>
              <span> {{ statusMessage }} </span>
              <button class="cancel-button" @click="showSpecialtyModal = false">Отмена</button>
            </div>
          </div>
        </div>

        <div v-if="showLearningModal" class="modal-overlay">
          <div class="modal-content">
            <h4>Изменение данных обучения для пользователя {{ selectedUserName }}</h4>
            <div>
              <label for="learning-select">Обучение:</label>
              <select id="learning-select" v-model="selectedLearning" class="select">
                <option value="Очное">Очное</option>
                <option value="Заочное">Заочное</option>
              </select>
            </div>
            <div>
              <label for="form-select">Форма обучения:</label>
              <select id="form-select" v-model="selectedForm" class="select">
                <option value="Коммерция">Коммерция</option>
                <option value="Бюджет">Бюджет</option>
              </select>
            </div>
            <div>
              <label for="course-select">Курс:</label>
              <select id="course-select" v-model="selectedCourse" class="select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="modal-buttons">
              <button class="confirm-button" @click="updateLearningDetails">Подтвердить</button>
              <span> {{ statusMessage }} </span>
              <button class="cancel-button" @click="showLearningModal = false">Отмена</button>
            </div>
          </div>
        </div>
        <div v-if="showScoresModal" class="modal-overlay">
          <div class="modal-content">
            <h4>Добавить оценку для пользователя {{ selectedUserName }}</h4>
            <div>
              <label for="subject-select">Предмет:</label>
              <select id="subject-select" v-model="selectedSubject" class="select">
                <option v-for="subject in availableSubjects" :key="subject" :value="subject">
                  {{ subject }}
                </option>
              </select>
            </div>
            <div>
              <label for="score-input">Оценка:</label>
              <select type="number" id="score-input" v-model.number="selectedScore" class="select">
                <option :value="5">Отлично</option>
                <option :value="4">Хорошо</option>
                <option :value="3">Удовлетворительно</option>
                <option :value="2">Неудовлетворительно</option>
                <option :value="1">Плохо</option>
              </select>
            </div>
            <div class="modal-buttons">
              <button class="confirm-button" @click="updateUserScores">Подтвердить</button>
              <span>{{ statusMessage }}</span>
              <button class="cancel-button" @click="showScoresModal = false">Отмена</button>
            </div>
          </div>
        </div>

<!--        <div v-if="showScheduleModal" class="modal-overlay">-->
<!--          <div class="modal-content">-->
<!--            <div>-->
<!--              <label for="date-input">Дата:</label>-->
<!--              <input type="date" id="date-input" v-model="newSchedule.date" class="select">-->
<!--            </div>-->

<!--            <div>-->
<!--              <label for="time-input">Время:</label>-->
<!--              <input type="time" id="time-input" v-model="newSchedule.time" class="select">-->
<!--            </div>-->

<!--            <div>-->
<!--              <label for="subject-input">Предмет:</label>-->
<!--              <input type="text" id="subject-input" v-model="newSchedule.subject" class="select">-->
<!--            </div>-->

<!--            <div>-->
<!--              <label for="group-input">Группа:</label>-->
<!--              <input type="text" id="group-input" v-model="newSchedule.group" class="select">-->
<!--            </div>-->

<!--            <div class="modal-buttons">-->
<!--              <button class="confirm-button" @click="addSchedule">Подтвердить</button>-->
<!--              <span>{{ statusMessage }}</span>-->
<!--              <button class="cancel-button" @click="showScheduleModal = false">Отмена</button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </section>
    </div>
  </AccountMoloGuard>
</template>


<style scoped>

.bg {
  background-color: #151515;
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
}

.hyperlinks {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 20px;
  align-items: center;
  & .back {
    background-color: #1e1e1e;
    color: white;
    text-decoration: none;
    display: inline-block;
    padding: 15px;
    border: 1px solid #2c2c2c;
    border-radius: 20px;
    transition: 0.3s all ease-in-out;

    &:hover {
      text-decoration: none;
    }

    &:nth-child(1):hover {
      border: 1px solid red;
      color: red;
    }

    &:nth-child(2):hover {
      border: 1px solid #00ff00;
      color: #00ff00
    }
  }
}

.fun-loader {
  display: flex;
  justify-content: center;
}

.loader {

  width: 300px;
  height: 10px;
  background: #333;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  & .dot {
    width: 0;
    background: linear-gradient(90deg, #ff6a00, #ab0028);
    height: 100%;
    box-shadow: 0 0 10px #ff6a00, 0 0 20px #ab0028;
    animation: bounce 2s forwards;
  }
}

@keyframes bounce {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.user-section_v-else {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 15px;
  padding: 0 15px 20px;

}

.user-section {
  border: 1px solid #2c2c2c;
  background-color: #1e1e1e;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  gap: 10px;
  text-align: center;
  border-radius: 20px;
  width: 20%;
}

.user-span {
  color: #4e45e3;
  font-weight: bold;

  & .user {
    color: white;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

h3 {
  text-align: center;
  color: white;
}

.delete-button {
  border: 1px solid #ab1000; /* Красный цвет для кнопки удаления */
  background-color: #3f0000;
  color: white; /* Белый текст */
  border-radius: 5px; /* Закругляем углы */
  padding: 8px 12px; /* Отступы внутри кнопки */
  cursor: pointer; /* Курсор в виде указателя */
  transition: background-color 0.3s ease; /* Плавный переход цвета фона */
}

.delete-button:hover {
  background-color: #ab1000; /* Темнее при наведении */
}

.achievement-button {
  border: 1px solid #0cb000;
  background-color: #0e4400;
  color: white; /* Белый текст */
  border-radius: 5px; /* Закругляем углы */
  padding: 8px 12px; /* Отступы внутри кнопки */
  cursor: pointer; /* Курсор в виде указателя */
  transition: background-color 0.3s ease; /* Плавный переход цвета фона */
}

.achievement-button:hover {
  background-color: #0cb000;
}

.status-button {
  border: 1px solid #beae00;
  background-color: #5b5000;
  color: white;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.status-button:hover {
  background-color: #beae00;
}

.specialty-button {
  border: 1px solid #0020be;
  background-color: #00055b;
  color: white;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.specialty-button:hover {
  background-color: #0020be;
}

.learning-button {
  border: 1px solid #be4f00;
  background-color: #5b2900;
  color: white;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.learning-button:hover {
  background-color: #be4f00;

}

.scores-button {
  border: 1px solid #00bea8;
  background-color: #005b50;
  color: white;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.scores-button:hover {
  background-color: #00bea8;

}

.user-scores {
  display: flex;
  justify-content: space-between;
  text-align: start;
  align-items: start;

  & .user-span {
    width: 70%;
  }

  & .user {
    padding: 2px;
    text-decoration: underline 1px;
    text-underline-offset: 4px;
    text-align: end;
  }
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
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  border: 1px solid #2c2c2c;
  color: white;
  border-radius: 8px;
  padding: 20px;
  gap: 8px;
  width: 400px; /* Ширина модального окна */
  max-height: 80vh; /* Ограничение по высоте */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease; /* Анимация появления */
  overflow-y: auto; /* Добавляем прокрутку, если содержимое слишком большое */
  text-align: center;
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

.modal-buttons {
  display: flex;
  justify-content: space-between;
  height: 8%;
}


.confirm-button,
.cancel-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 4%;
}

.confirm-button {
  border: 1px solid #0cb000;
  background-color: #0e4400;
  color: white; /* Белый текст */
  border-radius: 5px; /* Закругляем углы */
  padding: 8px 12px; /* Отступы внутри кнопки */
  cursor: pointer; /* Курсор в виде указателя */
  transition: background-color 0.3s ease; /* Плавный переход цвета фона */

  &:hover {
    background-color: #0cb000;
  }
}


.cancel-button {
  border: 1px solid #ab1000; /* Красный цвет для кнопки удаления */
  background-color: #3f0000;
  color: white; /* Белый текст */
  border-radius: 5px; /* Закругляем углы */
  padding: 8px 12px; /* Отступы внутри кнопки */
  cursor: pointer; /* Курсор в виде указателя */
  transition: background-color 0.3s ease; /* Плавный переход цвета фона */

  &:hover {
    background-color: #ab1000;
  }
}


.select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

hr {
  width: 100%;
  border: 1px solid #3c3c3c;
}

.rating-invisible {
  display: none;
}

@media (max-width: 560px) {
  .hyperlinks {
    display: flex;
    flex-direction: column;
  }

  .user-section_v-else {
    width: 95%;
  }

  .user-section {
    width: 100%;
  }
}

@media (min-width: 561px) and (max-width: 765px) {

}

@media (min-width: 766px) and (max-width: 1280px) {
}
</style>