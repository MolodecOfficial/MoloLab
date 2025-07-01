<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

const selectedDate = ref(dayjs().format('YYYY-MM-DD'));
const selectedGroup = ref('Все');
const scheduleData: any = ref([]);

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const formatDate = (dateStr: string) => {
  const formatted = dayjs(dateStr).format('dddd, D MMMM');
  return capitalize(formatted);
};

const fetchSchedule = async () => {
  try {
    const response = await $fetch('/api/schedules');
    console.log('Ответ от API:', response);
    scheduleData.value = response.schedules;
  } catch (error) {
    console.error('Ошибка при получении расписания:', error);
  }
};

const scheduleForDate = computed(() => {
  if (!scheduleData.value || scheduleData.value.length === 0) return null;
  return scheduleData.value.find(
      (schedule: any) => dayjs(schedule.date).format('YYYY-MM-DD') === selectedDate.value
  );
});

const filteredGroups = computed(() => {
  if (!scheduleForDate.value) return [];
  if (selectedGroup.value === 'Все') {
    return scheduleForDate.value.groups;
  }
  return scheduleForDate.value.groups.filter((group: any) => group.groupName === selectedGroup.value);
});

const sortedLessons = (lessons: any[]) => {
  return [...lessons].sort((a, b) => {
    const timeA = a.time?.split('-')[0].trim();
    const timeB = b.time?.split('-')[0].trim();
    const dateA = dayjs(`2000-01-01 ${timeA}`, 'YYYY-MM-DD HH:mm');
    const dateB = dayjs(`2000-01-01 ${timeB}`, 'YYYY-MM-DD HH:mm');
    return dateA.isAfter(dateB) ? 1 : -1;
  });
};

const isDividedIntoSubgroups = (lesson: any) => {
  return lesson.conditionOfLesson?.common === 'Не указан';
};


onMounted(() => {
  fetchSchedule();
});
</script>

<template>
  <AccountPatternsMoloLab>

  <div class="schedule-container">
    <!-- Заголовок с текущей датой -->
    <div class="schedule-header">
      <h2>{{ formatDate(selectedDate) }}</h2>
      <div class="date-selector">
        <input
            type="date"
            v-model="selectedDate"
            class="date-input"
        >
      </div>
    </div>

    <!-- Фильтр по группам -->
    <div class="group-filter">
      <select v-model="selectedGroup" class="group-select">
        <option value="Все">Все группы</option>
        <option
            v-for="group in scheduleForDate?.groups || []"
            :key="group.groupName"
            :value="group.groupName"
        >
          {{ group.groupName }}
        </option>
      </select>
    </div>

    <!-- Основное содержимое расписания -->
    <div class="schedule-content">
      <div
          v-if="filteredGroups.length === 0"
          class="empty-schedule"
      >
        <div class="empty-icon">
         <AdminpanelUIMoloLoader :is-loading="true"/>
        </div>
        <p>На выбранную дату занятий нет</p>
      </div>

      <div
          v-for="group in filteredGroups"
          :key="group.groupName"
          class="group-schedule"
      >
        <div class="group-header" v-if="selectedGroup === 'Все'">
          <h3>{{ group.groupName }}</h3>
        </div>

        <div class="lessons-list">
          <div
              v-for="lesson in sortedLessons(group.lessons)"
              :key="lesson.time + lesson.subject"
              class="lesson-card"
              :class="{
                  'lecture-card': lesson.typeOfLesson === 'Лекция',
                  'practice-card': lesson.typeOfLesson === 'Практика',
                  'lab-card': lesson.typeOfLesson === 'Лабораторная работа',
                  'independent-card': lesson.typeOfLesson === 'Самостоятельная работа',
                  'consultation-card': lesson.typeOfLesson === 'Консультация',
                  'exam-card': lesson.typeOfLesson === 'Экзамен'
                }"
          >
            <div class="lesson-time">
              {{ lesson.time }}
            </div>
            <div class="lesson-details">
              <div class="lesson-subject">{{ lesson.subject }}</div>

              <!-- Общий случай (не разделено на подгруппы) -->
              <div v-if="!isDividedIntoSubgroups(lesson)" class="lesson-meta">
                <span class="lesson-type">{{ lesson.typeOfLesson }}</span>
                <span class="lesson-divider">•</span>
                <span class="lesson-room">{{ lesson.cabinet }}</span>
                <span class="lesson-divider">•</span>
                <span class="lesson-teacher">{{ lesson.teacher }}</span>
              </div>

              <!-- Случай с подгруппами -->
              <div v-else class="subgroups-container">
                <div class="subgroup">
                  <div class="subgroup-label">1 подгруппа</div>
                  <div class="subgroup-meta">
                    <span class="lesson-teacher">{{ lesson.conditionOfLesson.subgroup1?.teacher || '—' }}</span>
                    <span class="lesson-divider">•</span>
                    <span class="lesson-room">{{ lesson.conditionOfLesson.subgroup1?.cabinet || '—' }}</span>
                  </div>
                </div>

                <div class="subgroup-divider"></div>

                <div class="lesson-type-full">
                  {{ lesson.typeOfLesson }}
                </div>

                <div class="subgroup-divider"></div>

                <div class="subgroup">
                  <div class="subgroup-label">2 подгруппа</div>
                  <div class="subgroup-meta">
                    <span class="lesson-teacher">{{ lesson.conditionOfLesson.subgroup2?.teacher || '—' }}</span>
                    <span class="lesson-divider">•</span>
                    <span class="lesson-room">{{ lesson.conditionOfLesson.subgroup2?.cabinet || '—' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </AccountPatternsMoloLab>

</template>


<style scoped>
.schedule-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.schedule-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.date-selector {
  position: relative;
}

.date-input {
  background: rgba(32, 32, 35, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px 16px;
  color: white;
  font-family: inherit;
  font-size: 0.95rem;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.date-input:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

.date-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.group-filter {
  margin-bottom: 24px;
}

.group-select {
  width: 100%;
  background: rgba(32, 32, 35, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: white;
  font-family: inherit;
  font-size: 0.95rem;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M6 9l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.group-select:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

.group-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.group-schedule {
  margin-bottom: 32px;
  background: rgba(32, 32, 35, 0.5);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.group-schedule:hover {
  background: rgba(32, 32, 35, 0.7);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.group-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.group-header h3 {
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
  margin: 0;
}

.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Базовый стиль карточки занятия */
.lesson-card {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  border-left: 4px solid #f6ad55; /* цвет по умолчанию */
}

/* Цветовые схемы для разных типов занятий */
.lecture-card {
  --border-color: green;
}
.lecture-card .lesson-time {
  color: green;
}

.practice-card {
  --border-color: #008cff;
}
.practice-card .lesson-time {
  color: #008cff;
}

.lab-card {
  --border-color: #ff5900;
}
.lab-card .lesson-time {
  color: #ff5900;
}

.independent-card {
  --border-color: #ffd500;
}
.independent-card .lesson-time {
  color: #ffd500;
}

.consultation-card {
  --border-color: #4800ff;
}
.consultation-card .lesson-time {
  color: #4800ff;
}

.exam-card {
  --border-color: #ff0000;
}
.exam-card .lesson-time {
  color: #ff0000;
}

.lesson-card {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  border-left: 4px solid var(--border-color);
}

.lesson-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.lesson-time {
  min-width: 100px;
  font-weight: 500;
  color: #f6ad55;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
}

.lesson-details {
  flex: 1;
}

.lesson-subject {
  font-weight: 500;
  color: white;
  margin-bottom: 6px;
  font-size: 1.05rem;
}

.lesson-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.lesson-divider {
  color: rgba(255, 255, 255, 0.3);
}

.subgroups-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.subgroup {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.subgroup-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.subgroup-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.subgroup-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 4px 0;
}

.lesson-type-full {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 4px 0;
}

.empty-schedule {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: rgba(32, 32, 35, 0.5);
  border-radius: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  text-align: center;
}

.empty-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.3);
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-schedule p {
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-size: 1rem;
}

/* Анимации */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Адаптивность */
@media (max-width: 768px) {
  .schedule-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .lesson-card {
    flex-direction: column;
    gap: 12px;
  }

  .lesson-time {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 8px;
  }
}

@media (max-width: 480px) {
  .schedule-container {
    padding: 16px;
  }

  .lesson-meta, .subgroup-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .lesson-divider {
    display: none;
  }
}
</style>