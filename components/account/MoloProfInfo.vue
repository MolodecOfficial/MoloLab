<script setup lang="ts">

import {onMounted, ref} from "vue";

const userSpecialty = ref('')
const userGroup = ref('')
const userCode = ref('')
const userDirection = ref('')
const userLearning = ref('')
const userFormOfLearning = ref('')
const userFaculty = ref('')
const userCourse = ref('')
const userStore = useUserStore()

useThemeStore()

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    console.log(user);
    userSpecialty.value = user.specialty;
    userGroup.value = user.group;
    userCode.value = user.code;
    userDirection.value = user.direction;
    userLearning.value = user.learning;
    userFormOfLearning.value = user.form_of_learning;
    userFaculty.value = user.faculty;
    userCourse.value = user.course;
  } else {
    userSpecialty.value = userStore.userSpecialty;
    userGroup.value = userStore.userGroup;
    userCode.value = userStore.userCode;
    userDirection.value = userStore.userDirection;
    userLearning.value = userStore.userLearning;
    userFormOfLearning.value = userStore.userFormOfLearning;
    userFaculty.value = userStore.userFaculty;
    userCourse.value = userStore.userCourse;
  }
})

</script>

<template>
  <section class="professionInfo">
    <span>Наименование: <code>{{ userSpecialty }}</code></span>
    <span>Группа: <code>{{ userGroup }}</code></span>
    <span>Направление: <code>{{ userDirection }}</code></span>
    <span>Код: <code>{{ userCode }}</code></span>
    <span>Форма обучения: <code>{{ userFormOfLearning }}</code></span>
    <span>Факультет: <code>{{ userFaculty }}</code></span>
    <span>Курс: <code>{{ userCourse }}</code></span>
  </section>
</template>

<style scoped>
.professionInfo {
  display: grid;
  justify-items: center; /* Центрирует элементы по горизонтали */
  align-items: center; /* Центрирует элементы по вертикали */
  text-align: center;
  grid-template-columns: repeat(3, 1fr); /* Три столбца */
  grid-template-rows: repeat(5, 1fr); /* Пять строк */
  grid-column-gap: 0;
  grid-row-gap: 2px;
  width: 100%;
  height: 100%;

  justify-content: center;
  & span {
    font-size: 18px;
    color: #052542;
  }
  & code {
    color: #5a87e7;
  }
}



.dark-theme span {
  color: #4e45e3;
  font-weight: bold;
}

.dark-theme code {
  color: white;
}

@media (max-width: 1024px) {
  .professionInfo {
    padding: 0 0;
    grid-row-gap: 0;
    & code {
      font-size: 10px;
    }
    & span {
      font-size: 11px;
    }
  }
}
@media (max-width: 1620px) {
  .professionInfo {

    grid-row-gap: 15px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    & code {
      font-size: 12px;
    }
    & span {
      font-size: 12px;
    }
  }
}

@media (max-width: 560px) {
  .professionInfo {
    grid-row-gap: 10px;
    grid-column-gap: 20px;
    padding: 20px;
    text-align: center;
    & span {
      font-size: 10px;
    }
    & code {
      font-size: 10px;

    }
  }
}

@media (min-width: 561px) and (max-width: 765px) {
  .professionInfo {
    grid-row-gap: 10px;
    grid-column-gap: 20px;
    padding: 20px;
    text-align: center;
    & span {
      font-size: 14px;
    }
    & code {
      font-size: 14px;

    }
  }
}

@media (min-width: 766px) and (max-width: 1280px) {
  .professionInfo {
    grid-row-gap: 8px;
    grid-column-gap: 20px;
    padding: 10px;
    text-align: center;
    & span {
      font-size: 11px;
    }
    & code {
      font-size: 12px;

    }
  }
}

</style>