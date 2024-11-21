<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import MyNews from "~/layouts/account/news/News.vue";

useHead({
  title: 'УГНТУ | Новости'
})

const firstName = ref('');
const lastName = ref('');
const userStore = useUserStore()
const themeStore = useThemeStore()
const router = useRouter()


onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    console.log('Данные пользователя загружены из localStorage:', user);
    firstName.value = user.firstName;
    lastName.value = user.lastName;
  } else {
    firstName.value = userStore.userFirstName;
    lastName.value = userStore.userLastName;
  }
});

const greetings = computed(() => `Привет, ${firstName.value} ${lastName.value}`);

async function logoutUser() {
  try {
    localStorage.removeItem('user')
    userStore.clearUser()
    await router.push('/login')
  } catch (error) {
    console.error('Ошибка при выходе из аккаунта:', error)
  }

}



</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList />
    <MyNews />
  </div>
</template>

<style scoped>

.container {
  overflow: auto;
  display: flex;
}

</style>