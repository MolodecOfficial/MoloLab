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

// Метод для получения всех пользователей
onMounted(() => {
  getAllUsers();
  getAllAchievements();
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
      <p v-if="loading">Загрузка пользователей...</p>
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
          <span class="user-span"> Достижения: <span class="user">{{
              Array.isArray(user.achievements) && user.achievements.length > 0
                  ? user.achievements.sort((a: any, b: any) => parseInt(a) - parseInt(b)).join(', ')
                  : 'Нет достижений'
            }}</span>
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
            <span>Действия</span>
          </section>
          <hr>
          <section class="actions">
            <button class="delete-button"  v-if="user.status !== 'Владелец'" @click="() => openDeleteModal(user)">Удалить</button>
            <span v-else class="restricted-action">
              Удаление запрещено для данного пользователя
            </span>
            <button class="achievement-button" @click="() => openAchievementModal(user)">Выдать достижение</button>
            <button class="status-button"  v-if="user.status !== 'Владелец'" @click="() => openStatusModal(user)">Изменить статус</button>
            <span v-else class="restricted-action">
              Смена статуса запрещена для данного пользователя
            </span>
            <button class="specialty-button" @click="() => openSpecialtyModal(user)">Выбор специальности</button>
            <button class="learning-button" @click="() => openLearningModal(user)">Выбор обучения</button>
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
            <select v-if="achievements.length > 0" v-model="selectedAchievement" class="achievement-select">
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
            <select v-model="selectedStatus" class="status-select">
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
            <select v-model="selectedSpecialty" class="specialty-select">
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
              <select id="learning-select" v-model="selectedLearning" class="learning-select">
                <option value="Очное">Очное</option>
                <option value="Заочное">Заочное</option>
              </select>
            </div>
            <div>
              <label for="form-select">Форма обучения:</label>
              <select id="form-select" v-model="selectedForm" class="form-select">
                <option value="Коммерция">Коммерция</option>
                <option value="Бюджет">Бюджет</option>
              </select>
            </div>
            <div>
              <label for="course-select">Курс:</label>
              <select id="course-select" v-model="selectedCourse" class="course-select">
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
      </section>
    </div>
  </AccountMoloGuard>
</template>


<style scoped>

.bg {
  background-color: #1a1a1a;
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
}

.hyperlinks {
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;

  & .back {
    color: #5a87e7;
    text-decoration: none;
    display: inline-block;
    padding: 15px;
    border: 1px solid;
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
      border: 1px solid green;
      color: green
    }
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

.status-select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
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
  background-color: #28a745; /* Зеленый цвет для подтверждения */
  color: white;
  transition: 0.2s all ease-in-out;
}

.cancel-button {
  background-color: #dc3545; /* Красный цвет для отмены */
  color: white;
}

.confirm-button:hover,
.cancel-button:hover {
  opacity: 0.8; /* Эффект при наведении */
}


.specialty-select {
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