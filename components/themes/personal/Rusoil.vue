<script setup lang="ts">

const id = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const direction = ref('')
const group = ref('')
const faculty = ref('')
const specialty = ref('')
const code = ref('')
const form_of_learning = ref('')
const learning = ref('')
const course = ref('')
const averageScore = ref('')
const generalScore = ref('')

const userData: any = ref([]);
const userSpecialtyData: any = ref([]);
const userRatingData: any = ref([]);

onMounted(() => {
  const storageUser = localStorage.getItem('user');
  if (storageUser) {
    const user = JSON.parse(storageUser);
    id.value = user._id
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    email.value = user.email;
    direction.value = user.direction;
    group.value = user.group;
    faculty.value = user.faculty;
    specialty.value = user.specialty;
    code.value = user.code
    form_of_learning.value = user.form_of_learning
    learning.value = user.learning
    course.value = user.course
    averageScore.value = user.averageScore
    generalScore.value = user.generalScore

    userData.value = [
      { label: "ФИО", value: `${firstName.value} ${lastName.value}` },
      { label: "Email", value: email.value },
      { label: "Id", value: id.value },
    ];
    userSpecialtyData.value = [
      { label: "Специальность", value: specialty.value },
      { label: "Направление", value: direction.value },
      { label: "Факультет", value: faculty.value },
      { label: "Код", value: code.value },
      { label: "Группа", value: group.value },
      { label: "Форма обучения", value: form_of_learning.value },
      { label: "Обучение", value: learning.value },
      { label: "Курс", value: course.value },
    ];
    userRatingData.value = [
      { label: "Средний балл", value: averageScore.value },
      { label: "Общий балл", value: generalScore.value },

    ];
  }
});

useHead({
  title: 'MoloLab | Персональные данные'
})

</script>

<template>
  <AccountMoloMobile title="Персональные данные">
    <section class="user-info">
      <section class="user-data">
        <div v-for="(data, idx) in userData"
             :key="idx"
             class="info-row">
          <span class="label">{{ data.label }}</span>
          <span class="value">{{ data.value }}</span>
        </div>
      </section>
      <section class="user-data">
        <div v-for="(data, idx) in userSpecialtyData"
             :key="idx"
             class="info-row">
          <span class="label">{{ data.label }}</span>
          <span class="value">{{ data.value }}</span>
        </div>
      </section>
      <section class="user-data">
        <div v-for="(data, idx) in userRatingData"
             :key="idx"
             class="info-row">
          <span class="label">{{ data.label }}</span>
          <span class="value">{{ data.value }}</span>
        </div>
      </section>
      <section class="stay-with-us">
    <span>
      Подробная информация будет пополняться по мере выпуска обновлений. Наберитесь терпения)
    </span>
      </section>
    </section>

  </AccountMoloMobile>
</template>

<style scoped>
.user-info {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.user-data {
  background-color: white;
  width: 100%;
  height: max-content;
  padding: 15px 20px;
  border-radius: 15px;
  gap: 15px;
  display: flex;
  flex-direction: column;

  & .info-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
    & .label {
      color: #7b7b7b;
    }
  }
}

.stay-with-us {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px 20px;
  border-radius: 15px;
  background-color: white;
  text-align: center;
  color: #7b7b7b;
  margin-bottom: 100px;
}

</style>