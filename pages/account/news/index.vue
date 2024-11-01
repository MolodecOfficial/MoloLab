<script setup lang="ts">

import logo from '~/public/favicon.ico';
import {computed, onMounted, ref} from "vue";
import {useUserStore} from "~/stores/userStore";
import {useRouter} from "vue-router";
import RouteList from "~/layouts/account/section/RouteList.vue";
import MyNews from "~/layouts/account/news/News.vue";

const firstName = ref('');
const lastName = ref('');
const userStore = useUserStore()
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
  <header>
    <section class="logoSection">
      <img :src="logo" alt="">
      <span>УГНТУ</span>
    </section>
    <section class="hello">
        <span class="greetings">
          {{ greetings }}
        </span>
      <button @click="logoutUser">Выйти</button>
    </section>
  </header>
  <div class="container">
    <RouteList />
    <MyNews />
  </div>
</template>

<style scoped>

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.hello {
  display: flex;
  flex-direction: row;
  & button {
    background-color: transparent;
    border: none;
    padding-right: 26px;
    font-size: 18px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    transition: 1ms all ease-in-out;
    &:hover {
      color: #0028ef;
    }
  }
}
.container {
  overflow: auto;
  display: flex;
}

.logoSection {
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  & img {
    width: 45px;
  }

  & span {
    font-size: 40px;
    line-height: 24px;
    letter-spacing: -.02em;
    color: #123e98;
    padding-left: 6px;
  }
}

.greetings {
  padding: 10px 20px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
}


</style>