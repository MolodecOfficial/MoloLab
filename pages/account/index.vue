<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useUserStore} from '~/stores/userStore';
import logo from '~/public/favicon.ico';
import OtherLinks from "~/layouts/account/section/OtherLinks.vue";
import RouteList from "~/layouts/account/section/RouteList.vue";
import {useThemeStore} from "~/stores/themeStore";


useHead({
  title: 'УГНТУ | Личный кабинет'
})

const userStore = useUserStore();
const themeStore = useThemeStore()
const firstName = ref('');
const lastName = ref('');
const email = ref('')
const router = useRouter()

// Загрузка данных из localStorage
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

    professionInfos.length = 0
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

interface ProfessionInfoType {
  number: string,
  form: string,
  faculty: string,
  code: string,
  name: string,
  shift: string,
  course: string,
  direction: string,
  group: string,
  averageScore: string,
  recordBookNumber: string,
  action: string,
  basis: string,
  number2: string,
  date: string,
  startDate: string,
  endDate: string
}

const professionInfos: Array<ProfessionInfoType> = [
  {
    number: "1",
    form: "Заочная",
    faculty: "ФЗО",
    code: "09.03.03",
    name: "Искусственный интеллект и цифровая трансформация бизнеса",
    shift: "БПИ",
    course: "1",
    direction: "Бюджет",
    group: "БПИ, БПИ09з-24-01",
    averageScore: "5",
    recordBookNumber: "242772",
    action: "Зачислен",
    basis: "Общий конкурс",
    number2: "426-4",
    date: "07.08.2024",
    startDate: "01.09.2024",
    endDate: ""
  },
];

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
  <div class="container">
    <RouteList/>
    <section class="userInfo">
      <section class="userInfo_container">
          <span>
            Личные данные студента
          </span>
        <section class="userInfo_user-information">
          <p>ФИО: <code>{{ firstName }}</code> <code>{{ lastName }}</code></p>
          <p>Email: <code> {{ email }} </code></p>
        </section>
      </section>
      <section class="userInfo_information">
        <section class="userInfo_profession-information">
          <span>Сведения о специальности</span>
          <AccountMoloProfInfo v-for="(info, idx) in professionInfos"
                               :info="info"
                               :key="idx"
          />
        </section>
        <OtherLinks/>
      </section>
    </section>
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
  overflow: hidden;
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

.userInfo {
  display: flex;
  height: 93vh;
  background-color: #f5f7fa;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
}

.userInfo_container {
  background-color: #ffffff;
  height: 12vh;
  width: 90%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;

  & span {
    padding-top: 20px;
    color: #053969;
    font-size: 20px;
  }
}

.userInfo_user-information {
  display: flex;
  flex-direction: row;
  gap: 20px;
  & p {
    font-size: 20px;
    color: #052542;
  }
}

.userInfo_information {
  width: 90%;
  padding: 20px 0;
  border-radius: 20px;
  background-color: white;
}

.userInfo_profession-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  & span {
    padding: 10px 0 30px 0;
    color: #053969;
    font-size: 20px;
  }
}


.dark-theme header,
.dark-theme .userInfo_container,
.dark-theme .userInfo_information {
  background-color: #1e1e1e;
}

.dark-theme .userInfo {
  background-color: #1a1a1a;
}


.dark-theme .userInfo_user-information p {
  color: #838383;
}

.dark-theme .userInfo_user-information code {
  color: white;
}

.dark-theme .userInfo_profession-information span,
.dark-theme .userInfo_container span {
  color: #c2c2c2;
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
</style>