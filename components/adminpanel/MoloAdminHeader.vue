<script lang="ts" setup>
import { ref } from 'vue'

const userStore = useUserStore()
const router = useRouter()
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

async function logoutUser() {
  localStorage.removeItem('user')
  userStore.clearUser()
  closeMenu()
  await router.push('/login/student')
}
</script>

<template>
  <section class="admin-header-container">
    <section class="admin-header">
      <NuxtLink class="Logo" to="/adminPanel" @click="closeMenu">MoloAdminPanel<code>Beta</code></NuxtLink>

      <!-- Бургер-меню для мобильных -->
      <button class="burger-button" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>

      <div class="header-buttons" :class="{ 'mobile-menu': isMenuOpen }">
        <section class="routes">
          <NuxtLink class="route" to="/adminPanel/users" @click="closeMenu">Пользователи</NuxtLink>
          <NuxtLink class="route" to="/adminPanel/messages" @click="closeMenu">Мессенджер</NuxtLink>
          <NuxtLink class="route" to="/adminPanel/schedule" @click="closeMenu">Расписание</NuxtLink>
        </section>
        <section class="actions">
          <NuxtLink class="account-button" to="/student/account" @click="closeMenu">В аккаунт</NuxtLink>
          <button class="logout-button" @click="logoutUser">Выйти</button>
        </section>
      </div>

      <!-- Затемнение фона для мобильного меню -->
      <div v-if="isMenuOpen" class="menu-overlay" @click="closeMenu"></div>
    </section>
  </section>
</template>

<style scoped>
.admin-header-container {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border: 1px solid var(--dk-border-color);
  width: 70%;
  border-radius: 30px;
  margin: 20px auto;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
}

.Logo {
  display: flex;
  flex-direction: column;
  text-align: start;
  text-decoration: none;
  font-size: 22px;
  color: white;
  z-index: 101;
}

.header-buttons {
  display: flex;
  gap: 40px;
  width: 100%;
  justify-content: end;
  transition: transform 0.3s ease-in-out;
}

.account-button,
.logout-button {
  padding: 10px 25px;
  border: none;
  text-decoration: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.routes {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.route {
  border-radius: 10px;
  border: 1px solid var(--dk-border-color);
  padding: 10px 25px;
  background-color: var(--dk-bg-ins-color);
  text-decoration: none;
  color: white;
  &:hover {
    background-color: var(--dk-border-color);
  }
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.account-button {
  background-color: #002244;
  border: 1px solid #007bff;
  color: white;

  &:hover {
    background-color: #007bff;
  }
}

.logout-button {
  background-color: #420004;
  border: 1px solid #ff0015;
  color: white;

  &:hover {
    background-color: #ff0015;
  }
}

/* Стили бургер-кнопки */
.burger-button {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
}

.burger-line {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease-in-out;
}

/* Анимация бургера при открытии */
.burger-button.active .burger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger-button.active .burger-line:nth-child(2) {
  opacity: 0;
}

.burger-button.active .burger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Затемнение фона для меню */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

@media (max-width: 1320px) {
  .admin-header {
    width: 85%;
  }

  .header-buttons {
    gap: 20px;
  }

  .route {
    padding: 8px 15px;
    font-size: 14px;
  }

  .account-button,
  .logout-button {
    padding: 8px 15px;
    font-size: 14px;
  }
}


/* Планшеты (768px - 1024px) */
@media (max-width: 1024px) {
  .admin-header {
    width: 85%;
  }

  .header-buttons {
    gap: 20px;
  }

  .route {
    padding: 8px 15px;
    font-size: 14px;
  }

  .account-button,
  .logout-button {
    padding: 8px 15px;
    font-size: 14px;
  }
}

/* Большие смартфоны (576px - 768px) */
@media (max-width: 900px) {
  .admin-header {
    width: 90%;
    padding: 12px 15px;
  }

  .Logo {
    font-size: 18px;
  }

  .routes {
    gap: 10px;
  }

  .route {
    padding: 6px 12px;
    font-size: 13px;
  }

  .actions {
    gap: 10px;
  }

  .account-button,
  .logout-button {
    padding: 6px 12px;
    font-size: 13px;
  }
}

/* Мобильные устройства (до 576px) */
@media (max-width: 765px) {
  .admin-header {
    width: 90%;
    margin: 10px auto;
    padding: 10px 15px;
  }

  .burger-button {
    display: flex;
  }

  .header-buttons {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: fit-content;
    border: 1px solid var(--dk-border-color);
    border-radius: 20px;
    height: fit-content;
    background-color: var(--dk-bg-dark-color);
    flex-direction: column;
    justify-content: flex-start;
    padding: 80px 40px 20px;
    gap: 30px;
    transform: translateX(100%);
    z-index: 100;
    display: none;
  }

  .header-buttons.mobile-menu {
    display: flex;
    transform: translateX(0);
  }

  .routes {
    flex-direction: column;
    width: 100%;
    gap: 15px;
  }

  .route {
    width: 100%;
    text-align: center;
    padding: 12px;
    font-size: 16px;
  }

  .actions {
    flex-direction: column;
    width: 100%;
    gap: 15px;
    margin-top: 20px;
  }

  .account-button,
  .logout-button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    text-align: center;
  }

  .Logo code {
    display: none;
  }
}

/* Очень маленькие устройства (до 400px) */
@media (max-width: 400px) {
  .Logo {
    font-size: 16px;
  }

  .header-buttons {
    width: 80%;
  }
}
</style>