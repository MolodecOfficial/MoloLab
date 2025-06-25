<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
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
    await router.push('/login/student')
  } catch (error) {
    console.error('Ошибка при выходе из аккаунта:', error)
  }

}

const greetings = computed(() => `Привет, ${firstName.value} ${lastName.value}`);

</script>

<template>
  <section class="header_container">
    <NuxtLink to="/student/account" class="logoSection">
      <img src="/public/account/choice/RusML.png" alt="">
      <span>RUSML</span>
    </NuxtLink>
    <section class="hello">
        <span class="greetings">
          {{ greetings }}
        </span>
      <NuxtLink class="change" to="/student/design">Сменить тему</NuxtLink>
      <button @click="logoutUser">Выйти</button>
    </section>
  </section>
</template>

<style scoped>

.header_container {
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
  text-decoration: none;
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
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.change {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  font-size: 18px;
}

@media (max-width: 560px) {
  .greetings {
    font-size: clamp(11px, 3vw, 16px);
  }

  .hello {
    text-align: center;
    & button {
      font-size: clamp(11px, 3vw, 16px);
    }
  }

  .logoSection {
    width: 20%;
    & img {
      width: 30px;
    }
    & span {
      font-size: 22px ;
    }
  }
}

@media (min-width: 561px) and (max-width: 765px) {
  .greetings {
    font-size: clamp(11px, 3vw, 16px);
  }

  .hello {
    text-align: center;
    & button {
      font-size: clamp(11px, 3vw, 16px);
    }
  }

  .logoSection {
    width: 20%;
    & img {
      width: 40px;
    }
    & span {
      font-size: 30px ;
    }
  }
}

</style>