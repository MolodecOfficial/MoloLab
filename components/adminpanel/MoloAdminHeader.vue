<script setup lang="ts">

const userStore = useUserStore()
const router = useRouter()


async function logoutUser() {
  localStorage.removeItem('user')
  userStore.clearUser()
  await router.push('/login/applicant')
}

</script>

<template>
  <section class="admin-header">
    <NuxtLink class="Logo" to="/adminPanel">MoloAdminPanel<code>Beta</code></NuxtLink>
    <div class="header-buttons">
      <NuxtLink class="account-button" to="/applicant/account">В аккаунт</NuxtLink>
      <NuxtLink class="logout-button" @click="logoutUser">Выйти</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
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
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
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