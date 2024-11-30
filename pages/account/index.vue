<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useUserStore} from '~/stores/userStore';
import logo from '~/public/favicon.ico';
import OtherLinks from "~/layouts/account/section/OtherLinks.vue";
import RouteList from "~/components/account/MoloRouteList.vue";
import {useThemeStore} from "~/stores/themeStore";
import MoloHeader from "~/components/account/MoloHeader.vue";


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
    endDate: "undefined"
  },
];

const greetings = computed(() => `Привет, ${firstName.value} ${lastName.value}`);

const userStatus = computed(() => {
  return email.value === 'MolodecOfficial' ? 'Администратор' : 'Студент';
});

</script>

<template>
  <MoloHeader/>
  <div class="container">
    <AccountMoloRouteList/>
    <section class="user-info">
      <section class="user-info__main">
        <section class="user-card">
          <span>
            Личные данные студента
          </span>
          <section class="user-card__details">
            <p>ФИО: <code>{{ firstName }}</code> <code>{{ lastName }}</code></p>
            <p>Email: <code>{{ email }}</code></p>
            <p>Статус: <code>{{ userStatus }}</code></p>
          </section>
        </section>
        <section class="specialty-info">
          <section class="specialty-info__list">
            <span>Сведения о специальности</span>
            <AccountMoloProfInfo
                v-for="(info, idx) in professionInfos"
                :info="info"
                :key="idx"
            />
          </section>
        </section>
      </section>
      <section class="additional-links">
        <OtherLinks/>
      </section>
    </section>
  </div>
</template>

<style scoped>

.container {
  overflow: hidden;
  display: flex;
}

.user-info {
  display: flex;
  height: 93vh;
  background-color: #f5f7fa;
  width: 95%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  padding: 0 40px 0 40px;
}

.user-info__main {
  display: flex;
  height: 35%;
  gap: 40px;

}

.user-card {
  background-color: #ffffff;
  height: 100%;
  width: 30%;
  border-radius: 20px;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  & span {
    padding-top: 20px;
    color: #053969;
    font-size: 20px;
  }
}

.user-card__details {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 20px;

  & p {
    text-align: center;
    font-size: clamp(14px, 1.3vw, 20px);
    color: #052542;
  }

  & code {
    color: #5a87e7;
  }
}

.specialty-info {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.specialty-info__list {
  display: flex;
  flex-direction: column;
  align-items: center;

  & span {
    padding: 20px 0 20px 0;
    color: #053969;
    font-size: 20px;
  }
}


.dark-theme header,
.dark-theme .user-card,
.dark-theme .specialty-info {
  background-color: #1e1e1e;
}

.dark-theme .user-card,
.dark-theme .specialty-info {
  border: 1px solid #2c2c2c;
}

.dark-theme .user-info {
  background-color: #1a1a1a;
}

.additional-links {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
}

.dark-theme .user-card__details p {
  color: #838383;
}

.dark-theme .user-card__details code {
  color: white;
}

.dark-theme .specialty-info__list span,
.dark-theme .user-card span {
  color: #c2c2c2;
}


</style>