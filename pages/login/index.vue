<script setup lang="ts">

useHead({
  title: 'УГНТУ | Войти в Аккаунт'
})

</script>

<template>
  <section class="body">
    <section class="container">
      <section class="container-image">
        <img src="public/auth/logo.png" alt="">
      </section>
      <section class="input-container">
        <section class="input-container_inside">
          <p class="header">Вход в систему</p>
          <p class="not_login">Ещё не зарегистрированы?
            <NuxtLink class="register" to="/register">Регистрация</NuxtLink>
          </p>
          <div class="inputs">
            <p class="input_helper">E-mail</p>
            <MoloInput />
            <p class="input_helper">Пароль</p>
            <MoloInput />
          </div>
          <div class="remember">
            <input type="checkbox" name="" id="">
            <label for="">Запомнить меня</label>
          </div>
          <div class="log-forget">
            <NuxtLink class="login" to="/in-progress">Войти</NuxtLink>
            <NuxtLink class="forget" to="/in-progress">Восстановление пароля</NuxtLink>
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

  & .register {
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