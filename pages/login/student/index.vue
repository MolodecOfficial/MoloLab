<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from "~/stores/userStore";
import Cookies from 'js-cookie';

const email = ref('');
const firstName = ref('')
const lastName = ref('')
const password = ref('');
const loading = ref(false);
const statusMessage = ref('');
const router = useRouter();
const userStore = useUserStore()
const status = ref('')

useHead({
  title: 'MoloLab | Вход в аккаунт'
})

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    email.value = user.email;
  }
});

async function loginUser() {
  const userData = {
    email: email.value,
    password: password.value,
  };

  try {
    loading.value = true;
    statusMessage.value = 'Произвожу вход...';

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      const data = await response.json();
      statusMessage.value = `Успешный вход! ${data.message}`;

      userStore.setUser(data.user);
      // Сохраняем данные пользователя в store, включая _id
      if (data.user && data.user._id) {
        userStore.setUser(data.user);
      } else {
        console.error('Отсутствует ID пользователя в ответе:', data);
      }

      // Сохранение данных пользователя в Cookies, включая оценки
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
        score: data.user.score || {},
        averageScore: data.user.averageScore,
        generalScore: data.user.generalScore,
      }), { expires: 7 });

      // Сохраняем данные в localStorage, включая оценки
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
        score: data.user.score || {},
        averageScore: data.user.averageScore,
        generalScore: data.user.generalScore,
      }));

      // Обновляем store с полными данными пользователя
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
      if (data.user.status === 'Администратор' && userStore.userStatus === 'Администратор') {
        statusMessage.value = `Добро пожаловать, Администратор ${userStore.userFirstName}`;
        setTimeout(() => router.push('/student/account'), 2000);
      } else if (data.user.status === 'Владелец' && userStore.userStatus === 'Владелец') {
        statusMessage.value = `Добро пожаловать, Владелец ${userStore.userFirstName}`;
        setTimeout(() => router.push('/student/account'), 2000);
      } else {
        setTimeout(() => router.push('/student/account'), 2500);
      }
    } else {
      const errorData = await response.json();
      statusMessage.value = errorData.message || 'Ошибка при входе';
    }
  } catch (error) {
    console.error('Ошибка:', error);
    statusMessage.value = 'Произошла ошибка при входе';
  } finally {
    loading.value = false;
  }
}

async function loginAsGuest() {
  const guestData = {
    email: 'guest@example.com',
    password: 'guest-password',
  };

  try {
    loading.value = true;
    statusMessage.value = 'Идёт вход как Гость...';

    // Симуляция успешного входа для гостя
    const response = { ok: true };

    if (response.ok) {
      // Примерные данные для гостя
      const guestUser: any = {
        firstName: 'Гость',
        lastName: 'Гость',
        status: 'Гость',
        email: 'guest@example.com',
        _id: 'guest-id',
        specialty: 'Гостевая специальность',
        group: 'Гостевая группа',
        code: '00.00.00',
        direction: 'Гостевое направление',
        course: 1,
        faculty: 'Гостевой факультет',
        form_of_learning: 'Гостевая форма',
        averageScore: 0,
        generalScore: 0,
        scores: {},
      };
      statusMessage.value = 'Добро пожаловать, Гость!';
      setTimeout(() => router.push('/student/account'), 1000);


      // Сохранение данных пользователя в Cookies
      Cookies.set('user', JSON.stringify({
        firstName: guestUser.firstName,
        lastName: guestUser.lastName,
        email: guestUser.email,
        _id: guestUser._id,
        status: guestUser.status,
        specialty: guestUser.specialty,
        direction: guestUser.direction,
        group: guestUser.group,
        course: guestUser.course,
        code: guestUser.code,
        faculty: guestUser.faculty,
        form_of_learning: guestUser.form_of_learning,
        averageScore: guestUser.averageScore,
        generalScore: guestUser.generalScore,
        scores: guestUser.scores,
      }), { expires: 7 });

      // Сохранение данных в localStorage
      localStorage.setItem('user', JSON.stringify({
        firstName: guestUser.firstName,
        lastName: guestUser.lastName,
        email: guestUser.email,
        _id: guestUser._id,
        status: guestUser.status,
        specialty: guestUser.specialty,
        direction: guestUser.direction,
        group: guestUser.group,
        course: guestUser.course,
        code: guestUser.code,
        form_of_learning: guestUser.form_of_learning,
        faculty: guestUser.faculty,
        averageScore: guestUser.averageScore,
        generalScore: guestUser.generalScore,
        scores: guestUser.scores,
      }));

      userStore.setUser(guestUser);

    } else {
      statusMessage.value = 'Ошибка при входе как Гость';
    }
  } catch (error) {
    console.error('Ошибка:', error);
    statusMessage.value = 'Произошла ошибка при входе как Гость';
  } finally {
    loading.value = false;
  }
}


</script>

<template>
  <AuthPatternsMoloLogin>
    <template #email>
      <AccountMoloFormInput v-model="email"/>
    </template>
    <template #password>
      <AccountMoloFormInput v-model="password" type="password"/>
    </template>
    <template #user>
      <AccountMoloFormSubmit
          label="Войти"
          :loading="loading"
          :message="statusMessage"
          class="button-user"
          @click="loginUser"
      />
    </template>
    <template #guest>
      <AccountMoloFormSubmit
          label="Гость"
          :loading="loading"
          :message="statusMessage"
          class="button-guest"
          @click="loginAsGuest"
      />
    </template>
    <template #status>
      <ClickedCreating :message="statusMessage"/>
    </template>
  </AuthPatternsMoloLogin>
</template>
<style scoped>

.buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
  & .button-user {
    width: 70%;
  }
  & .button-guest {
    width: 30%;
  }
}



</style>