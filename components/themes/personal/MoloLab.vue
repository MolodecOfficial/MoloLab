<script setup lang="ts">
import { ref, onMounted } from 'vue';

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

const userData = ref<any[]>([]);
const userSpecialtyData = ref<any[]>([]);
const userRatingData = ref<any[]>([]);

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
      { label: "ID", value: id.value },
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
      { label: "Средний балл", value: averageScore.value || 'Нет данных' },
      { label: "Общий балл", value: generalScore.value || 'Нет данных' },
    ];
  }
});

useHead({
  title: 'MoloLab | Персональные данные'
})
</script>

<template>
  <AccountPatternsMoloLab>
    <div class="personal-data-container">
      <!-- Аватар и основная информация -->
      <div class="profile-header">
        <div class="avatar-wrapper">
          <div class="avatar-glow"></div>
          <div class="avatar-placeholder">
            {{ firstName.charAt(0) }}{{ lastName.charAt(0) }}
          </div>
        </div>
        <h1 class="profile-name">{{ firstName }} {{ lastName }}</h1>
        <div class="profile-group">{{ group }}</div>
      </div>

      <!-- Основные данные -->
      <div class="data-section">
        <h2 class="section-title">Основная информация</h2>
        <div class="data-grid">
          <div
              v-for="(item, index) in userData"
              :key="index"
              class="data-card"
          >
            <span class="data-label">{{ item.label }}</span>
            <span class="data-value">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <!-- Учебные данные -->
      <div class="data-section">
        <h2 class="section-title">Учебная информация</h2>
        <div class="data-grid">
          <div
              v-for="(item, index) in userSpecialtyData"
              :key="index"
              class="data-card"
          >
            <span class="data-label">{{ item.label }}</span>
            <span class="data-value">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <!-- Рейтинг -->
      <div class="data-section">
        <h2 class="section-title">Учебные показатели</h2>
        <div class="rating-cards">
          <div class="rating-card">
            <div class="rating-value">{{ averageScore || '—' }}</div>
            <div class="rating-label">Средний балл</div>
          </div>
          <div class="rating-card">
            <div class="rating-value">{{ generalScore || '—' }}</div>
            <div class="rating-label">Общий балл</div>
          </div>
        </div>
      </div>
    </div>
  </AccountPatternsMoloLab>
</template>

<style scoped>
.personal-data-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.profile-header {
  text-align: center;
  margin-bottom: 32px;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #9f7aea);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 600;
  position: relative;
  z-index: 2;
}

.avatar-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: linear-gradient(135deg, #667eea, #9f7aea);
  border-radius: 50%;
  filter: blur(10px);
  opacity: 0.5;
  z-index: 1;
  animation: pulse 3s ease infinite;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.profile-group {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.data-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 500;
  color: white;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.data-card {
  background: rgba(32, 32, 35, 0.7);
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.data-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.data-label {
  display: block;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 6px;
}

.data-value {
  font-size: 1.05rem;
  color: white;
  font-weight: 500;
}

.rating-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.rating-card {
  background: rgba(32, 32, 35, 0.7);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.rating-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.rating-value {
  font-size: 2rem;
  font-weight: 600;
  color: #68d391;
  margin-bottom: 8px;
}

.rating-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { opacity: 0.4; transform: scale(0.95); }
  50% { opacity: 0.6; transform: scale(1.05); }
  100% { opacity: 0.4; transform: scale(0.95); }
}

@media (max-width: 768px) {
  .data-grid {
    grid-template-columns: 1fr;
  }

  .profile-name {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .personal-data-container {
    padding: 16px;
  }

  .rating-cards {
    grid-template-columns: 1fr;
  }
}
</style>