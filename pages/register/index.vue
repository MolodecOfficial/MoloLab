<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '~/stores/userStore'

useHead({
  title: 'УГНТУ | Регистрация аккаунта'
});

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const loading = ref(false);
const statusMessage = ref('');

const router = useRouter();
const userStore = useUserStore()

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

  try {
    loading.value = true;
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
      statusMessage.value = 'Пользователь успешно создан! Переадресация...';

      // Логируем ID нового пользователя в консоль
      console.log('ID нового пользователя:', data.user._id);  // Выводим ID

      // Сохраняем данные в store (например, email, имя, фамилию)
      userStore.setUser({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        _id: data.user._id,
        status: data.user.status,
        specialty: data.user.specialty,
        group: data.user.group,
        code: data.user.code,
        direction: data.user.direction,
        learning: data.user.learning,
        form_of_learning: data.user.form_of_learning,
        faculty: data.user.faculty,
        course: data.user.course
      })
      userStore.setEmail(email.value);
      userStore.setFirstName(firstName.value);
      userStore.setLastName(lastName.value);

      setTimeout(() => router.push('/login'), 2000);
    } else {
      const errorData = await response.json();
      statusMessage.value = errorData.message || 'Произошла ошибка при регистрации';
    }
  } catch (error) {
    console.error('Ошибка:', error);
    statusMessage.value = 'Произошла ошибка при регистрации';
  } finally {
    loading.value = false;
  }
}
</script>


<template>
  <section class="body">
    <section class="container">
      <section class="container-image">
        <img src="/auth/logo.png" alt="">
      </section>
      <section class="input-container">
        <section class="input-container_inside">
          <p class="header">Регистрация</p>
          <p class="not_login">Уже имеете аккаунт?
            <NuxtLink class="redirect" to="/login">Войти</NuxtLink>
          </p>
          <div class="inputs">
            <p class="input_helper">Имя</p>
            <AccountMoloFormInput v-model="firstName" id="test" placeholder="Используйте настоящее имя"/>
            <p class="input_helper">Фамилия</p>
            <AccountMoloFormInput v-model="lastName" placeholder="Используйте настоящую фамилию"/>
            <p class="input_helper">E-mail</p>
            <AccountMoloFormInput v-model="email" type="email" placeholder="Например example@gmail.com"/>
            <p class="input_helper">Пароль</p>
            <AccountMoloFormInput v-model="password" type="password" placeholder="Пароль должен содержать 8 символов"/>
            <p class="input_helper">Подтвердите пароль</p>
            <AccountMoloFormInput v-model="confirmPassword" type="password" placeholder="Пароли не должны отличаться"/>
          </div>
          <div class="remember">
            <input type="checkbox" id="consent" required>
            <label for="consent">Даю согласие на обработку персональных данных</label>
          </div>
          <div class="register">
            <AccountMoloFormSubmit
                label="Зарегистрироваться"
                :loading="loading"
                :message="statusMessage"
                @click="registerUser"
            />
            <ClickedCreating :message="statusMessage"/>
          </div>
        </section>
      </section>
    </section>
  </section>
</template>

<style scoped>

.body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eef7fd;
}

.container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 50%;
  height: 80%;
  border-radius: 20px;
}

.container-image {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 30px 0 30px;
  width: 50%;
  border-right: 1px solid #e3e5e9;
}

.input-container {
  display: flex;
  justify-content: center;
  width: 45%;
  align-items: center;
  height: 80%;
  background-color: #ffffff;
}

.redirect {
  text-decoration: none;
  transition: 0.2s all ease-in-out;
  color: #3c00ef;

  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 2px;
  }
}

.input-container_inside {
  width: 80%;
  height: 100%;

  & .header {
    color: #082459;
    font-size: 21px;
  }

  & .not_login {
    font-size: 11px;
  }
}

.inputs {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & .input_helper {
    font-size: 12px;
  }
}

.remember {
  font-size: 14px; /* Уменьшите размер шрифта по вашему усмотрению */
  color: #333; /* Цвет текста (по желанию) */
  margin-top: 5px;
  display: flex;
}

.remember input {
  margin-right: 5px;
}

.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  gap: 6px;
}

img {
  width: 100%;
}

</style>