<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '~/stores/userStore'
import Cookies from "js-cookie";

useHead({
  title: 'УГНТУ | Регистрация аккаунта'
});

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const loading = ref(false);
const statusMessage = ref('');

const router = useRouter();
const userStore = useUserStore()

async function registerUser() {
  // Проверяем, что пароли совпадают
  if (password.value !== confirmPassword.value) {
    statusMessage.value = "Пароли не совпадают, будьте внимательнее";
    return;
  }

  // Создаем объект данных, который отправим на сервер
  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };

  try {
    loading.value = true;
    statusMessage.value = 'Идёт создание пользователя...';

    // Отправляем данные на сервер
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // Отправляем данные в формате JSON
    });

    // Проверяем успешность ответа от сервера
    if (response.ok) {
      const data = await response.json();
      statusMessage.value = 'Пользователь успешно создан! Переадресация...';

      // Логируем ID нового пользователя в консоль
      console.log('ID нового пользователя:', data.user._id);  // Выводим ID

      userStore.setUser({
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        _id: data.user._id,
        status: data.user.status,
        specialty: data.user.specialty,
        group: data.user.group,
        code: data.user.code,
        direction: data.user.direction,
        learning: data.user.learning,
        form_of_learning: data.user.form_of_learning,
        faculty: data.user.faculty,
        course: data.user.course,
        score: data.user.score || {},
        ranking: data.user.ranking,
        averageScore: data.user.averageScore,
        generalScore: data.user.generalScore,
      });
      userStore.setUser(data.user);

      localStorage.setItem('user', JSON.stringify({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        _id: data.user._id,
        status: data.user.status,
        specialty: data.user.specialty,
        group: data.user.group,
        code: data.user.code,
        direction: data.user.direction,
        learning: data.user.learning,
        form_of_learning: data.user.form_of_learning,
        faculty: data.user.faculty,
        course: data.user.course,
        scores: data.user.scores || {},
        averageScore: data.user.averageScore,
        generalScore: data.user.generalScore,
      }));

      Cookies.set('user', JSON.stringify({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        _id: data.user._id,
        status: data.user.status,
        specialty: data.user.specialty,
        group: data.user.group,
        code: data.user.code,
        direction: data.user.direction,
        learning: data.user.learning,
        form_of_learning: data.user.form_of_learning,
        faculty: data.user.faculty,
        course: data.user.course,
        scores: data.user.scores || {},
        averageScore: data.user.averageScore,
        generalScore: data.user.generalScore,

      }), { expires: 7 });

      userStore.setEmail(email.value);
      userStore.setFirstName(firstName.value);
      userStore.setLastName(lastName.value);

      setTimeout(() => router.push('/login/student'), 2000);
    } else {
      const errorData = await response.json();
      statusMessage.value = errorData.message || 'Произошла ошибка при регистрации';
    }
  } catch (error) {
    console.error('Ошибка:', error);
    statusMessage.value = 'Произошла ошибка при регистрации';
  } finally {
    loading.value = false;
  }
}
</script>


<template>
  <AuthPatternsMoloRegister>
    <template #firstName>
      <AccountMoloFormInput v-model="firstName" id="test" placeholder="Используйте настоящее имя"/>
    </template>
    <template #lastName>
      <AccountMoloFormInput v-model="lastName" placeholder="Используйте настоящую фамилию"/>
    </template>
    <template #email>
      <AccountMoloFormInput v-model="email" type="email" placeholder="Например example@gmail.com"/>
    </template>
    <template #password>
      <AccountMoloFormInput v-model="password" type="password" placeholder="Пароль должен содержать 8 символов"/>
    </template>
    <template #confirmPassword>
      <AccountMoloFormInput v-model="confirmPassword" type="password" placeholder="Пароли не должны отличаться"/>
    </template>

    <template #register>
      <AccountMoloFormSubmit
          label="Зарегистрироваться"
          :loading="loading"
          :message="statusMessage"
          @click="registerUser"
      />
    </template>
    <template #status>
      <ClickedCreating :message="statusMessage"/>
    </template>
  </AuthPatternsMoloRegister>
</template>

<style scoped>

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}





</style>