<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useUserStore} from '~/stores/userStore';
import logo from '~/public/favicon.ico';
import MoloProfInfo from "~/components/account/MoloProfInfo.vue";

import android from 'public/account/Android.png'
import dormitory from 'public/account/Dormitory.png'
import payments from 'public/account/Payments.png'
import receipts from 'public/account/Receipts.png'
import rating from 'public/account/Rating.png'

import library from 'public/account/Library.png'
import sdo from 'public/account/SDO.png'
import timetable from 'public/account/Timetable.png'
import testResult from 'public/account/TestResult.png'
import info from 'public/account/Info.png'

const userStore = useUserStore();
const firstName = ref('');
const lastName = ref('');
const email = ref('')
const router = useRouter()

// Загрузка данных из localStorage
onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    console.log('Данные пользователя загружены из localStorage:', user);
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    email.value = user.email;
  } else {
    firstName.value = userStore.userFirstName;
    lastName.value = userStore.userLastName
  }
});

async function logoutUser() {
  try {
    localStorage.removeItem('user')
    userStore.clearUser()
    router.push('/login')
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
  <AccountMoloGuard>
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
      <section class="routeList">
        <section class="routeList_container">
          Список....в разработке
        </section>
      </section>
      <section class="userInfo">
        <section class="userInfo_container">
          <span>
            Личные данные студента
          </span>
          <section class="userInfo_user-information">
            <p>ФИО: <code>{{ firstName }}</code> <code>{{ lastName }}</code></p>
            <p>Email: <code> {{ email }} </code></p>
          </section>
          <section class="userInfo_profession-information">
            <span>Сведения о специальности</span>
            <MoloProfInfo v-for="(info, idx) in professionInfos"
                          :info="info"
                          :key="idx"
            />
          </section>
          <section class="other">
            <span>
              Прочее
            </span>
            <section class="otherLinks_container">
              <NuxtLink class="other_link" to="/in-progress">
                <img :src="android" alt="">
                Версия ЛК на Android версия: 2.0.1
              </NuxtLink>
              <NuxtLink class="other_link" to="/in-progress">
                <img :src="dormitory" alt="">
                Общежитие
              </NuxtLink>
              <NuxtLink class="other_link" to="/in-progress">
                <img :src="payments" alt="">
                Выплаты
              </NuxtLink>
              <NuxtLink class="other_link" to="/in-progress">
                <img :src="receipts" alt="">
                Квитанции на оплату
              </NuxtLink>
              <NuxtLink class="other_link" to="/in-progress">
                <img :src="rating" alt="">
                Рейтинг
              </NuxtLink>
            </section>
          </section>
          <section class="other_2">
            <span>
              Образовательные ресурсы
            </span>
            <section class="otherLinks_container">
              <NuxtLink class="other_link" to="/in-progress">
                <img :src="library" alt="">
                Библиотека
              </NuxtLink>
              <NuxtLink class="other_link" to="/in-progress">
                <img :src="sdo" alt="">
                СДО Дистанционное образование
              </NuxtLink>
              <NuxtLink class="other_link" to="/in-progress">
                <img :src="timetable" alt="">
                Расписание занятий
              </NuxtLink>
              <NuxtLink class="other_link" to="/in-progress">
                <img :src="testResult" alt="">
                Система тестирования
              </NuxtLink>
              <NuxtLink class="other_link" to="/in-progress">
                <img :src="info" alt="">
                Информация по образовательным программам
              </NuxtLink>
            </section>
          </section>
        </section>
      </section>
    </div>
  </AccountMoloGuard>
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
    transition: 0.1s all ease-in-out;
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
  height: 92.7vh;
  background-color: #f5f7fa;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.userInfo_container {
  background-color: #ffffff;
  height: 80vh;
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

.routeList {
  display: flex;
  flex-direction: column;
  height: 92.9%;
  width: 20%;

}

.routeList_container {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
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

.other {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.other_link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  gap: 10px;
  text-decoration: none;
  color: #022469;
  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 3px;
  }
}
.otherLinks_container {
  padding-left: 20px;
  padding-top: 20px;
  display: grid;
  justify-items: center;
  text-align: center;
  grid-template-columns: repeat(5, 1fr);
}
.other_2 {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
}
</style>