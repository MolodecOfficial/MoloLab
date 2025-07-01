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



onMounted(() => {
  fetchSchedule();
});
</script>

<template>
  <AccountPatternsMoloAccount header="Расписание занятий">
    <section class="date-container">
      <section class="date-info">
        <input type="date" v-model="selectedDate" />
        <span class="date">{{ formatDate(selectedDate) }}</span>

        <select v-model="selectedGroup">
          <option>Все</option>
          <option v-for="group in scheduleForDate?.groups || []" :key="group._id">
            {{ group.groupName }}
          </option>
        </select>
      </section>
    </section>
    <div v-if="filteredGroups.length > 0" class="schedule">
      <div v-for="group in filteredGroups" :key="group._id" class="group">
        <span class="groupName">{{ group.groupName }}</span>
        <section class="lessons">
          <section v-for="(lesson, index) in sortedLessons(group.lessons)" :key="lesson.time" class="lesson">
            <span class="lesson-name"> {{ index + 1 }}) {{ lesson.subject }}</span>

            <section v-if="lesson.conditionOfLesson?.common !== 'Не указан'" class="full">
              <span :class="{
                'lecture-type': lesson.typeOfLesson === 'Лекция',
                'practice-type': lesson.typeOfLesson === 'Практика',
                'laboratory-type': lesson.typeOfLesson === 'Лабораторная работа',
                'independent-type': lesson.typeOfLesson === 'Самостоятельная работа',
                'consultation-type': lesson.typeOfLesson === 'Консультация',
                'exam-type': lesson.typeOfLesson === 'Экзамен',
              }">
                {{ lesson.typeOfLesson }} | {{ lesson.time }}
              </span>
              <span class="lesson-info">
                {{ lesson.teacher || '—' }} | {{ lesson.cabinet }}
              </span>
            </section>

            <section v-else>
              <div class="subgroup-span">
                <span class="lesson-info">1 подгруппа</span>
                <span class="lesson-info">
                  {{ lesson.conditionOfLesson.subgroup1?.teacher ?? '—' }} |
                  {{ lesson.conditionOfLesson.subgroup1?.cabinet ?? '—' }}
                </span>
              </div>
              <hr />
              <div>
                <span :class="{
                  'lecture-type': lesson.typeOfLesson === 'Лекция',
                  'practice-type': lesson.typeOfLesson === 'Практика',
                  'laboratory-type': lesson.typeOfLesson === 'Лабораторная работа',
                  'independent-type': lesson.typeOfLesson === 'Самостоятельная работа',
                  'consultation-type': lesson.typeOfLesson === 'Консультация',
                  'exam-type': lesson.typeOfLesson === 'Экзамен',
                }">
                  {{ lesson.typeOfLesson }} | {{ lesson.time }}
                </span>
              </div>
              <hr />
              <div class="subgroup-span">
                <span class="lesson-info">2 подгруппа</span>
                <span class="lesson-info">
                  {{ lesson.conditionOfLesson.subgroup2?.teacher ?? '—' }} |
                  {{ lesson.conditionOfLesson.subgroup2?.cabinet ?? '—' }}
                </span>
              </div>
            </section>
          </section>
        </section>
      </div>
    </div>
  </AccountPatternsMoloAccount>
</template>


<style scoped>
.date-info {
  display: flex;
  gap: 10px;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #c2c2c2;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  & input[type="date"] {
    display: flex;
    border-radius: 6px;
    border: 1px solid #c2c2c2;
    background-color: rgb(238, 244, 253);
    color: var(--dk-span-color);
    font-size: 1rem;
    color-scheme: white;
  }
  & .date {
    width: max-content;
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
    color: var(--dk-span-color);
    background-color: white;
    border-radius: 8px;
    padding: 8px 50px;
    border: 1px solid transparent;
  }
  select {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #c2c2c2;
    background-color: rgb(238, 244, 253);
    color: var(--dk-span-color);
    font-size: 1rem;
  }
}



.group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  gap: 20px;
  & .groupName {
    width: fit-content;
    padding: 5px 10px;
    border-radius: 10px;
    background-color: white;
    text-align: start;
    border: 1px solid #c2c2c2;
    color: var(--dk-span-color);
  }
}

.lessons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
}

.lesson {
  border: 1px solid #c2c2c2;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 90%;
  gap: 2px;
  padding: 10px 20px;

  & .lesson-name {
    font-size: 20px
  }

  & .lecture-type {
    color: green; /* Цвет для лекции */
  }

  & .practice-type {
    color: #008cff;
  }

  & .laboratory-type {
    color: #ff5900;
  }

  & .independent-type {
    color: #ffd500;
  }

  & .consultation-type {
    color: #4800ff;
  }

  & .exam-type {
    color: #ff0000;
  }
}

.full {
  display: flex;
  flex-direction: column;
}

.subgroup-span {
  display: flex;
  flex-direction: column;

  & .lesson-info:first-child {
    font-weight: lighter;
  }
}

@media (max-width: 560px) {
  .date-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .date-info {
    box-sizing: border-box;
    width: 90%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .lessons {
    align-items: start;
  }
  .lesson {
    border: 1px solid #c2c2c2;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 80%;
    gap: 2px;
    padding: 10px 20px;
    }
}


@media (max-width: 560px) {
  .schedule-header span {
    font-size: clamp(12px, 4vw, 22px);

  }

  .date {
    width: 100%;
  }

}

@media (min-width: 561px) and (max-width: 765px) {

}

@media (min-width: 766px) and (max-width: 1280px) {
}


</style>

