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
    await router.push('/login/applicant')
  } catch (error) {
    console.error('Ошибка при выходе из аккаунта:', error)
  }

}

const greetings = computed(() => `Привет, ${firstName.value} ${lastName.value}`);

</script>

<template>
  <section class="header_container">
    <NuxtLink to="/" class="logoSection">
      <img :src="logo" alt="">
      <span>УГНТУ</span>
    </NuxtLink>
    <section class="hello">
        <span class="greetings">
          {{ greetings }}
        </span>
      <button @click="themeStore.toggleTheme()">Сменить тему</button>
      <button @click="logoutUser">Выйти</button>
    </section>
  </section>
</template>

<style scoped>


.dark-theme .header_container {
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
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
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

@media (min-width: 766px) and (max-width: 1280px) {

}
@media (min-width: 1281px) and (max-width: 1920px) {

}

</style>