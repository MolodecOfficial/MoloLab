<script lang="ts" setup>

const userStore = useUserStore()
const router = useRouter()


async function logoutUser() {
  localStorage.removeItem('user')
  userStore.clearUser()
  await router.push('/login/applicant')
}

</script>

<template>
  <section class="admin-header-container">
    <section class="admin-header">
      <NuxtLink class="Logo" to="/adminPanel">MoloAdminPanel<code>Beta</code></NuxtLink>
      <div class="header-buttons">
        <section class="routes">
          <NuxtLink class="route" to="/adminPanel/users">Пользователи</NuxtLink>
          <NuxtLink class="route" to="/adminPanel/messages">Мессенджер</NuxtLink>
          <NuxtLink class="route" to="/adminPanel/schedule">Расписание</NuxtLink>
        </section>
        <section class="actions">
          <NuxtLink class="account-button" to="/student/account">В аккаунт</NuxtLink>
          <NuxtLink class="logout-button" @click="logoutUser">Выйти</NuxtLink>
        </section>
      </div>
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
}
.Logo {
  display: flex;
  flex-direction: column;
  text-align: start;
  text-decoration: none;
  font-size: 22px;
  color: white;
}

.admin-header h1 {
  margin: 0;
}

.header-buttons {
  display: flex;
  gap: 40px;
  width: 100%;
  justify-content: end;
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

</style>