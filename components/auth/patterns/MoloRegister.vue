<script setup lang="ts">

const router = useRouter()

function goToRedirect() {
  router.push('/login/student')
}

</script>

<template>
  <section class="body">
    <section class="blob">
      <div id="bg-wrap">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5">
              <animate attributeName="fx" dur="34s" values="0%;3%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stop-color="rgba(255, 0, 255, 1)"></stop>
              <stop offset="100%" stop-color="rgba(255, 0, 255, 0)"></stop>
            </radialGradient>
            <radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5">
              <animate attributeName="fx" dur="23.5s" values="0%;3%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stop-color="rgba(255, 255, 0, 1)"></stop>
              <stop offset="100%" stop-color="rgba(255, 255, 0, 0)"></stop>
            </radialGradient>
            <radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5">
              <animate attributeName="fx" dur="21.5s" values="0%;3%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stop-color="rgba(0, 255, 255, 1)"></stop>
              <stop offset="100%" stop-color="rgba(0, 255, 255, 0)"></stop>
            </radialGradient>
            <radialGradient id="Gradient4" cx="50%" cy="50%" fx="4.56417%" fy="50%" r=".5">
              <animate attributeName="fx" dur="23s" values="0%;5%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stop-color="rgba(0, 255, 0, 1)"></stop>
              <stop offset="100%" stop-color="rgba(0, 255, 0, 0)"></stop>
            </radialGradient>
            <radialGradient id="Gradient5" cx="50%" cy="50%" fx="2.65405%" fy="50%" r=".5">
              <animate attributeName="fx" dur="24.5s" values="0%;5%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stop-color="rgba(0,0,255, 1)"></stop>
              <stop offset="100%" stop-color="rgba(0,0,255, 0)"></stop>
            </radialGradient>
            <radialGradient id="Gradient6" cx="50%" cy="50%" fx="0.981338%" fy="50%" r=".5">
              <animate attributeName="fx" dur="25.5s" values="0%;5%;0%" repeatCount="indefinite"></animate>
              <stop offset="0%" stop-color="rgba(255,0,0, 1)"></stop>
              <stop offset="100%" stop-color="rgba(255,0,0, 0)"></stop>
            </radialGradient>
          </defs>
          <rect x="13.744%" y="1.18473%" width="100%" height="100%" fill="url(#Gradient1)" transform="rotate(334.41 50 50)">
            <animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite"></animate>
            <animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite"></animate>
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="7s" repeatCount="indefinite"></animateTransform>
          </rect>
          <rect x="-2.17916%" y="35.4267%" width="100%" height="100%" fill="url(#Gradient2)" transform="rotate(255.072 50 50)">
            <animate attributeName="x" dur="23s" values="-25%;0%;-25%" repeatCount="indefinite"></animate>
            <animate attributeName="y" dur="24s" values="0%;50%;0%" repeatCount="indefinite"></animate>
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"></animateTransform>
          </rect>
          <rect x="9.00483%" y="14.5733%" width="100%" height="100%" fill="url(#Gradient3)" transform="rotate(139.903 50 50)">
            <animate attributeName="x" dur="25s" values="0%;25%;0%" repeatCount="indefinite"></animate>
            <animate attributeName="y" dur="12s" values="0%;25%;0%" repeatCount="indefinite"></animate>
            <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="9s" repeatCount="indefinite"></animateTransform>
          </rect>
        </svg>
      </div>
    </section>
    <section class="container">
      <section class="container-image">
        <img src="/public/auth/MoloLab.png" alt="">
      </section>
      <section class="input-container">
        <section class="input-container_inside">
          <p class="header">Регистрация Вашего аккаунта</p>
          <p class="not_login">Уже имеете аккаунт?
            <AdminpanelUIMoloButton type="specialty" @click="goToRedirect">Войти</AdminpanelUIMoloButton>
          </p>
          <div class="inputs">
            <p class="input_helper">Имя</p>
            <slot name="firstName"/>
            <p class="input_helper">Фамилия</p>
            <slot name="lastName"/>
            <p class="input_helper">E-mail</p>
            <slot name="email"/>
            <p class="input_helper">Пароль</p>
            <slot name="password"/>
            <p class="input_helper">Подтвердите пароль</p>
            <slot name="confirmPassword"/>
          </div>
          <div class="remember">
            <input type="checkbox" id="consent" required>
            <label for="consent" class="consent">Даю согласие на обработку персональных данных</label>
          </div>
          <div class="register">
            <slot name="register"/>
            <slot name="status"/>
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
  background-color: var(--dk-bg-color);
  width: 100%;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

#bg-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  animation: fadeIn 5s ease-out forwards;
}

.blob {
  z-index: 0;
  position: absolute;
  --size: 750px;
  --speed: 50s;
  --easing: cubic-bezier(0.8, 0.2, 0.2, 0.8);
  width: var(--size);
  height: var(--size);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  overflow: hidden;
  filter: blur(calc(var(--size) / 5));
  animation: rotate var(--speed) var(--easing) alternate infinite;
}

.container {
  z-index: 1;
  display: flex;
  align-items: center;
  background-color: var(--dk-bg-ins-color);
  width: 50%;
  height: 80%;
  border-radius: 20px;
  border: 1px solid var(--dk-border-color);
}

.container-image {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 30px 0 30px;
  width: 50%;
  border-right: 1px solid var(--dk-border-color);
}

.input-container {
  display: flex;
  justify-content: center;
  width: 45%;
  align-items: center;
  height: 80%;
  background-color: var(--dk-bg-ins-color);
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
    color: whitesmoke;
    font-size: 21px;
  }

  & .not_login {
    font-size: 14px;
    color: var(--dk-border-color);
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
    color: whitesmoke;
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

.consent {
  color: whitesmoke;
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

@media (max-width: 560px) {
  .body {
    align-items: center;
    height: 100vh;
  }
  .container {
    flex-direction: column;
    width: 100%;
    height: max-content;

    align-items: center;
  }
  .container-image {
    width: 80%;
    height: 40%;
    display: flex;
    justify-content: center;
    border: none;
  }

  .input-container {
    width: 100%;
  }
  .blob {
    display: none
  }}

@media (min-width: 561px) and (max-width: 765px) {
  .body {
    display: flex;
    align-items: center;
    overflow: auto;
    justify-content: center;
  }
  .container {
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
  }
  .container-image {
    width: 80%;
    height: 40%;
    display: flex;
    justify-content: center;
    border: none;
  }

  .input-container {
    width: 100%;
    height: 50%;
  }
  .blob {
    display: none
  }
}

@media (min-width: 766px) and (max-width: 1280px) {
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0;
  }
  .body {
    display: flex;
    align-items: center;
    overflow: auto;
    justify-content: center;
  }
  .container-image {
    width: 70%;
    border: none;
  }
  .container {
    height: 100%;
    flex-direction: column;
    align-items: center;
  }
  .input-container {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0;
    height: 100%;
    justify-content: center;
    flex-direction: column;
  }
}

@media (min-width: 766px) and (max-width: 1280px) {
  .container {
    display: flex;
    flex-direction: column;
    height: 70%;
  }
  .body {
    display: flex;
    align-items: center;
    overflow: auto;
    justify-content: center;
  }
  .container-image {
    width: 70%;
    border: none;
    padding: 20px;
  }
  .container {
    flex-direction: column;
    align-items: center;
  }
  .input-container {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0;
    height: 100%;
    justify-content: center;
    flex-direction: column;
  }
}

</style>