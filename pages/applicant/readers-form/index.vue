<script setup lang="ts">
import {computed, onMounted, ref} from "vue";

const userStore = useUserStore()

const id = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const status = ref('')
const userSpecialty = ref('')
const userGroup = ref('')
const userCode = ref('')
const userDirection = ref('')
const userLearning = ref('')
const userFormOfLearning = ref('')
const userFaculty = ref('')
const userCourse = ref('')

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    email.value = user.email;
    id.value = user._id
    status.value = user.status
    userSpecialty.value = user.specialty;
    userGroup.value = user.group;
    userCode.value = user.code;
    userDirection.value = user.direction;
    userLearning.value = user.learning;
    userFormOfLearning.value = user.form_of_learning;
    userFaculty.value = user.faculty;
    userCourse.value = user.course;
  } else {
    firstName.value = userStore.userFirstName;
    lastName.value = userStore.userLastName
    email.value = userStore.userEmail
    id.value = userStore.userId
    status.value = userStore.userStatus
    userSpecialty.value = userStore.userSpecialty;
    userGroup.value = userStore.userGroup;
    userCode.value = userStore.userCode;
    userDirection.value = userStore.userDirection;
    userLearning.value = userStore.userLearning;
    userFormOfLearning.value = userStore.userFormOfLearning;
    userFaculty.value = userStore.userFaculty;
    userCourse.value = userStore.userCourse;
  }
});

useHead({
  title: 'УГНТУ | Читательский формуляр'
})
</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList />
    <section class="read-form-container">
      <section class="read-form-header">
        <span>Читательский формуляр</span>
      </section>
      <section class="read-form-info">
        <span class="info-span">Ваш ID:</span>
        <span class="info">{{ id }}</span>
        <span class="info-span">Ваша категория:</span>
        <span class="info">{{ status }}</span>
        <span class="info-span">Ваше ФИО:</span>
        <span class="info">{{ firstName }} {{ lastName }}</span>
        <span class="info-span">Ваша дата рождения:</span>
        <span class="no-info">данные пока не доступны</span>
        <span class="info-span">Ваш пол:</span>
        <span class="no-info">данные пока не доступны</span>
        <span class="hr-container"><hr></span>
        <span class="info-span">Ваш домашний адрес:</span>
        <span class="no-info">данные пока не доступны</span>
        <span class="info-span">Ваш Email:</span>
        <span class="info">{{ email }}</span>
        <span class="info-span">Ваша специальность:</span>
        <span class="info">{{ userSpecialty }}</span>
        <span class="info-span">Ваше обучение:</span>
        <span class="info">{{ userLearning }}</span>
        <span class="info-span">Ваша форма обучения:</span>
        <span class="info">{{ userFormOfLearning }}</span>
        <span class="info-span">Ваш факультет:</span>
        <span class="info">{{ userFaculty }}</span>
        <span class="info-span">Ваша группа:</span>
        <span class="info"> {{ userGroup }}</span>
        <span class="info-span">Ваш код:</span>
        <span class="info">{{ userCode }}</span>
        <span class="hr-container"><hr></span>
        <span class="info-span">Автор сайта:</span>
        <span class="info">Максим или Moloдец</span>
        <span class="info-span">Используемые технологии:</span>
        <span class="info">Nuxt | TypeScript | MongoDB | Pinia | SCSS | Vercel</span>
        <span class="info-span">ВКонтакте:</span>
        <span class="info">https://vk.com/molodec_official</span>
        <span class="info-span">Телеграм:</span>
        <span class="info">https://t.me/molodec_official</span>
      </section>
    </section>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  overflow-x: hidden;
  background-color: white;
}

.dark-theme .container {
  background-color: #1e1e1e;
}

.read-form-container {
  width: 100%;
  background-color: rgba(237, 244, 255, 0.82);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  min-height: 93vh;
  border-top-left-radius: 20px;
  border: 1px solid #e0e0e0;
}

.read-form-header {
  background-color: #ffffff;
  width: 90%;
  height: 12vh;
  margin-top: 74px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  & span {
    font-size: 30px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.no-info {
  align-self: center; /* Вертикальное выравнивание по центру */
  font-style: italic;
  color: #999; /* Для придания дополнительного визуального акцента */
}

.read-form-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Две колонки одинаковой ширины */
  grid-template-rows: repeat(5, auto); /* Пять строк для данных и линии */
  grid-column-gap: 10px; /* Расстояние между колонками */
  grid-row-gap: 10px; /* Расстояние между строками */
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  border: 1px solid #e0e0e0;

  & .info-span {
    font-weight: bold;
    text-align: end;
  }
  & .info {
    text-align: start;
    align-self: center;
  }
  & .hr-container {
    grid-column: 1 / 3; /* Линия занимает обе колонки */
    text-align: center;
  }

  & .hr-container hr {
    width: 100%; /* Линия растягивается на всю ширину */
    border: none;
    border-top: 1px solid #ccc; /* Цвет и стиль линии */
  }
}

.dark-theme .read-form-container {
  background-color: #151515;
  border: 1px solid #2c2c2c;

}

.dark-theme .read-form-header {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
  & span {
    color: white;
  }
}

.dark-theme .read-form-info {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;

  & .info-span {
    color: #4e45e3;
  }
  & .info {
    color: white;
    font-weight: bold;
  }
}

@media (max-width: 560px) {
  .read-form-header span{
    font-size: clamp(18px, 5vw, 26px);
  }

  .read-form-info {
    width: 65%;
    text-align: center;
    font-size: clamp(8px, 2vw, 12px);
  }
  hr {
    width: 100%;
  }
}

@media (min-width: 561px) and (max-width: 765px) {


  .read-form-info {
    width: 80%;
    text-align: center;
    height: 100%;

  }
}

@media (min-width: 766px) and (max-width: 1280px) {
  .read-form-container {
    min-height: 94vh;
  }
  .read-form-info {
    width: 80%;
  }
}


</style>