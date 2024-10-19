<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from "~/stores/userStore";

const email = ref('');
const firstName = ref('')
const lastName = ref('')
const password = ref('');
const loading = ref(false);
const statusMessage = ref('');
const router = useRouter();
const userStore = useUserStore()

useHead({
  title: 'УГНТУ | Вход в аккаунт'
});

onMounted(() => {
  firstName.value = userStore.userFirstName
  lastName.value = userStore.userLastName
  email.value = userStore.userEmail
})

async function loginUser() {
  const userData = {
    email: email.value,
    password: password.value,
  };

  try {
    loading.value = true;
    statusMessage.value = 'Идёт вход...';

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      const data = await response.json();
      // Изменяем статус сообщения на основе данных, полученных от сервера
      statusMessage.value = `Успешный вход! ${data.message}`; // Используем сообщение от сервера
      // Вы можете сохранить данные пользователя в store, если это необходимо
      userStore.setUser(data.user); // Предполагается, что у вас есть метод для сохранения пользователя в store
      setTimeout(() => router.push('/in-progress'), 2500);
    } else {
      const errorData = await response.json();
      statusMessage.value = errorData.message || 'Ошибка при входе';
    }
  } catch (error) {
    console.error('Ошибка:', error);
    statusMessage.value = 'Произошла ошибка при входе';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="body">
    <section class="container">
      <section class="container-image">
        <img src="/auth/logo.png" alt="Логотип">
      </section>
      <section class="input-container">
        <section class="input-container_inside">
          <p class="header">Вход в систему</p>
          <p class="not_login">Ещё не зарегистрированы?
            <NuxtLink class="redirect" to="/register">Регистрация</NuxtLink>
          </p>
          <div class="inputs">
            <p class="input_helper">E-mail</p>
            <AccountFormInput v-model="email"/>
            <p class="input_helper">Пароль</p>
            <AccountFormInput v-model="password" type="password"/>
          </div>
          <div class="remember">
            <input type="checkbox" id="remember-me"/>
            <label for="remember-me">Запомнить меня</label>
          </div>
          <div class="log-forget">
            <AccountFormSubmit
                label="Войти"
                :loading="loading"
                :message="statusMessage"
                @click="loginUser"
            />
            <NuxtLink class="forget" to="/in-progress">Восстановление пароля</NuxtLink>
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
  height: 50%;
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
  height: 100%;
}

.input-container_inside {
  width: 80%;
  height: 80%;

  & .header {
    color: #082459;
    font-size: 21px;
  }

  & .not_login {
    font-size: 11px;
  }

  & .redirect {
    text-decoration: none;
    transition: 0.2s all ease-in-out;
    color: #3c00ef;

    &:hover {
      text-decoration: underline 1px;
      text-underline-offset: 2px;
    }
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

.log-forget {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  gap: 6px;

  & .login {
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

  & .forget {
    text-align: center;
    font-size: 10px;
    color: #4e45e3;
    text-decoration: none;

    &:hover {
      text-decoration: underline 1px;
      text-underline-offset: 2px;
    }
  }

}


img {
  width: 100%;
}

</style>