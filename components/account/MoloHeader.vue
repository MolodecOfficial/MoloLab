<script setup lang="ts">

import logo from "public/favicon.ico";
import {computed, onMounted, ref} from "vue";
import {useUserStore} from "~/stores/userStore";
import {useThemeStore} from "~/stores/themeStore";



const userStore = useUserStore();
const themeStore = useThemeStore()
const firstName = ref('');
const lastName = ref('');
const email = ref('')
const router = useRouter()

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    email.value = user.email;
  } else {
    firstName.value = userStore.userFirstName;
    lastName.value = userStore.userLastName
    email.value = userStore.userEmail
  }
});

async function logoutUser() {
  try {
    localStorage.removeItem('user')
    userStore.clearUser()
    await router.push('/login')
  } catch (error) {
    console.error('Ошибка при выходе из аккаунта:', error)
  }

}

const greetings = computed(() => `Привет, ${firstName.value} ${lastName.value}`);

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
      <button @click="themeStore.toggleTheme()">Сменить тему</button>
      <button @click="logoutUser">Выйти</button>
    </section>
  </header>
</template>

<style scoped>


.dark-theme header {
  background-color: #1e1e1e;
}

.dark-theme .greetings {
  color: white;
}

.dark-theme .hello button {
  color: #ffffff;
}

.dark-theme .hello button:hover {
  color: #bb86fc;
}
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #ffffff;
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

.dark-theme .greetings {
  color: white;
}

.dark-theme .hello button {
  color: #ffffff;
}

.dark-theme .hello button:hover {
  color: #bb86fc;
}

.hello {
  display: flex;
  flex-direction: row;
  gap: 10px;
  & button {
    background-color: transparent;
    border: none;
    font-size: 18px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    transition: 1ms all ease-in-out;

    &:hover {
      color: #0028ef;
    }
    &:last-child {
      margin-right: 20px;
    }
  }
}

.greetings {
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}


</style>