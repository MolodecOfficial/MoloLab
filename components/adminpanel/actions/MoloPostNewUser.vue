<script setup lang="ts">
defineProps({
  displayAs: {
    type: String,
    default: 'icon', // 'icon' | 'button'
  }
});
const openModal = ref(false);

const userStore = useUserStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const status = ref('');
const password = ref('');
const confirmPassword = ref('');

const statusMessage = ref('');



async function registerUser() {
  // Проверяем, что пароли совпадают
  if (password.value !== confirmPassword.value) {
    statusMessage.value = "Пароли не совпадают, будьте внимательнее";
    return;
  }

  // Создаем объект данных, который отправим на сервер
  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };


  const resetForm = () => {
    userData.firstName = '';
    userData.lastName = '';
    userData.email = '';
    userData.password = '';
  };

  try {
    statusMessage.value = 'Идёт создание пользователя...';

    // Отправляем данные на сервер
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // Отправляем данные в формате JSON
    });

    // Проверяем успешность ответа от сервера
    if (response.ok) {
      const data = await response.json();
      statusMessage.value = 'Пользователь успешно создан!';
      await userStore.getUsers()
      setTimeout(() => {
        openModal.value = false;
        statusMessage.value = '';
        resetForm();
      }, 1000);

      console.log('ID нового пользователя:', data.user._id);  // Выводим ID

    } else {
      const errorData = await response.json();
      statusMessage.value = errorData.message || 'Произошла ошибка при регистрации';
    }
  } catch (error) {
    console.error('Ошибка:', error);
    statusMessage.value = 'Произошла ошибка при регистрации';
  }
}

const modalTitle = 'Создание нового пользователя'
</script>

<template>
  <section class="add">
    <section
        class="add-note"
        :class="{ button: displayAs === 'button' }"
        @click="openModal = true"
    >
      <template v-if="displayAs === 'icon'">
        <img alt="" src="/public/adminPanel/add.png">
      </template>
      <template v-else>
          <AdminpanelMoloButton type="primary">
            Добавить пользователя
          </AdminpanelMoloButton>

      </template>
    </section>
    <AdminpanelMoloModal
        :visible="openModal"
        :title="modalTitle"
        @close="openModal = true"
    >
      <template #body>
        <AdminpanelMoloInput v-model="firstName" placeholder="Имя пользователя"/>
        <AdminpanelMoloInput v-model="lastName" placeholder="Фамилия пользователя"/>
        <AdminpanelMoloInput v-model="email" placeholder="Почта пользователя"/>
        <AdminpanelMoloInput v-model="password" type="password" placeholder="Пароль пользователя"/>
        <AdminpanelMoloInput v-model="confirmPassword" type="password" placeholder="Повтор пароля"/>
      </template>
      <template #confirm-button>
       <AdminpanelMoloButton type="confirm" @click="registerUser">
         Подтвердить
       </AdminpanelMoloButton>
      </template>
      <template #status>
        {{ statusMessage }}
      </template>
      <template #cancel-button>
        <AdminpanelMoloButton type="cancel" @click="openModal = false">
          Отмена
        </AdminpanelMoloButton>
      </template>
    </AdminpanelMoloModal>
  </section>
</template>

<style scoped>
.add {
  display: flex;
  justify-content: center;
}
.add-note {
  width: fit-content;
  display: flex;
  background-color: transparent;
  border: none;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  & img {
    width: 70%;
    display: block;
  }
  &:hover {
    transform: rotate(180deg);
  }
}

.add-note.button {
  transform: none !important;
  &:hover {
    transform: none !important;
  }
}


</style>