<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

useHead({
  title: 'УГНТУ | Регистрация аккаунта'
});

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const router = useRouter();

const registerUser = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Пароли не совпадают, будьте внимательнее");
    return;
  }

  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      alert('Регистрация успешна!');
      await router.push('/login'); // Перенаправление на страницу входа
    } else {
      const errorData = await response.json();
      alert(`Ошибка регистрации: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при регистрации');
  }
};
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
            <MoloInput v-model="firstName" />
            <p class="input_helper">Фамилия</p>
            <MoloInput v-model="lastName" />
            <p class="input_helper">E-mail</p>
            <MoloInput v-model="email" />
            <p class="input_helper">Пароль</p>
            <MoloInput type="password" v-model="password" />
            <p class="input_helper">Подтвердите пароль</p>
            <MoloInput type="password" v-model="confirmPassword" />
          </div>
          <div class="remember">
            <input type="checkbox" id="consent">
            <label for="consent">Даю согласие на обработку персональных данных</label>
          </div>
          <div class="register">
            <button class="register_btn" @click="registerUser">Зарегистрироваться</button>
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
  margin-right: 5px; /* Отступ между чекбоксом и текстом */
}

.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  gap: 6px;
  & .register_btn {
    background-color: #4e45e3;
    border: none;
    height: 40px;
    color: #eee;
    border-radius: 5px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    transition: 0.2s all ease-in-out;
    &:hover {
      background-color: #4038bb;
    }
  }
}

img {
  width: 100%;
}

</style>