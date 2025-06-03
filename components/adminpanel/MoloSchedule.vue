<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import dayjs from "dayjs";
import type { PropType } from 'vue';

const selectedDate = ref(dayjs().format('YYYY-MM-DD'));
const selectedGroup = ref('Все');

const props = defineProps({
  scheduleData: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const emit = defineEmits(['refresh']);

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const formatDate = (dateStr: string) => {
  const formatted = dayjs(dateStr).format('dddd, D MMMM');
  return capitalize(formatted);
};

const scheduleForDate = computed(() => {
  if (!props.scheduleData || props.scheduleData.length === 0) return null;
  return props.scheduleData.find(
      (schedule: any) => dayjs(schedule.date).format('YYYY-MM-DD') === selectedDate.value
  );
});

const filteredGroups = computed(() => {
  if (!scheduleForDate.value) return [];
  if (selectedGroup.value === 'Все') {
    return scheduleForDate.value.groups;
  }
  return scheduleForDate.value.groups.filter(group => group.groupName === selectedGroup.value);
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

const handleRefresh = () => {
  emit('refresh');
};

onMounted(() => {
  window.addEventListener('schedule-updated', handleRefresh);
});

onUnmounted(() => {
  window.removeEventListener('schedule-updated', handleRefresh);
});

watch(() => props.scheduleData, () => {
  console.log('Расписание обновилось');
}, { deep: true });
</script>

<template>
  <div class="schedule-container">
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

    <div v-if="filteredGroups.length > 0" class="schedule">
      <div v-for="group in filteredGroups" :key="group._id" class="group">
        <h3>{{ group.groupName }}</h3>
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

    <div v-else class="no">
      <AdminpanelMoloLoader :is-loading="filteredGroups.length === 0"/>
    </div>
  </div>
</template>

<style scoped>

.schedule-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.schedule {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  background-color: var(--dk-bg-color);
  border: 1px solid var(--dk-border-color);
  border-radius: 10px;
}


.date-info {
  padding: 20px 0;
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  justify-items: center;
  gap: 16px;
  & input[type="date"] {
    display: flex;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid var(--dk-border-color);
    background-color: var(--dk-bg-dark-color);
    color: var(--dk-span-color);
    font-size: 1rem;
    color-scheme: dark;
  }
  & .date {
    width: max-content;
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
    color: var(--dk-span-color);
    background-color: var(--dk-bg-dark-color);
    border-radius: 8px;
    padding: 8px 50px;
    border: 1px solid var(--dk-border-color);
  }
  select {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid var(--dk-border-color);
    background-color: var(--dk-bg-dark-color);
    color: var(--dk-span-color);
    font-size: 1rem;
  }

}


.group {
  display: flex;
  flex-direction: column;
  width: 80%;

  & h3 {
    width: fit-content;
    padding: 5px 10px;
    border: 1px solid var(--dk-border-color);
    border-radius: 10px;
    background-color: var(--dk-bg-ins-light-color);
    text-align: start;
  }
}

.lessons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  &:last-child {
    padding: 20px;
  }
}

.lesson {
  border: 1px solid var(--dk-border-color);
  border-radius: 15px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--dk-bg-ins-light-color);
  width: 80%;
  gap: 2px;

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
.subgroup-span {
  display: flex;
  flex-direction: column;

  & .lesson-info:first-child {
    font-weight: lighter;
  }
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 300px;
}

.no {
  display: flex;
  height: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
  & span {
    padding: 10px;
    border-radius: 10px;
    background-color: var(--dk-bg-color);
    border: 1px solid var(--dk-border-color);
  }
}

.full {
  display: flex;
  flex-direction: column;
}

hr {
  border: 1px solid var(--dk-border-color);
}

@media (max-width: 765px) {
  .date-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  .group {
    display: flex;
    flex-direction: column;
    padding-right: 20px;
  }
}


</style>