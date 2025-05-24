<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const scheduleData = ref<any[]>([]);
const lessonsData = ref<any[]>([]);
const teachersData = ref<any[]>([]);
const statusMessage = ref('');
const showAddScheduleModal = ref(false);
const showLessons = ref(false);
const showTeachers = ref(false);
const expandedTeachers = ref<Record<string, boolean>>({});

const toggleTeacherLessons = (teacherId: string) => {
  expandedTeachers.value[teacherId] = !expandedTeachers.value[teacherId];
};

const isExpanded = (teacherId: string) => {
  return expandedTeachers.value[teacherId];
};
const toggleExpand = () => {
  showLessons.value = !showLessons.value;
};

const toggleExpand_T = () => {
  showTeachers.value = !showTeachers.value;
};


const sortedTeachers = computed(() =>
    [...teachersData.value].sort((a: any, b) => a.name.localeCompare(b.name, 'ru'))
);

const sortedLessons = computed(() =>
    [...lessonsData.value].sort((a: any, b) => a.name.localeCompare(b.name, 'ru'))
);


const fetchSchedule = async () => {
  try {
    const response = await $fetch('/api/schedules');
    console.log('Ответ от API:', response);
    scheduleData.value = response.schedules;
  } catch (error) {
    console.error('Ошибка при получении расписания:', error);
    statusMessage.value = 'Ошибка загрузки расписания';
  }
};

const fetchLessons = async () => {
  try {
    const response = await $fetch('/api/lessons');
    console.log('Ответ от API', response);
    lessonsData.value = response.lessons;
  } catch (error) {
    console.error('Ошибка при получении предметов:', error);
    statusMessage.value = 'Ошибка загрузки предметов';
  }
}

const fetchTeachers = async () => {
  try {
    const response = await $fetch('/api/teachers');
    console.log('Ответ от API', response);
    teachersData.value = response.teachers;
  } catch (error) {
    console.error('Ошибка при получении предметов:', error);
    statusMessage.value = 'Ошибка загрузки предметов';
  }
}

const handleScheduleSaved = () => {
  fetchSchedule();
};

const handleScheduleUpdated = () => {
  fetchSchedule();
};

onMounted(() => {
  fetchSchedule();
  fetchLessons()
  fetchTeachers()
});


useHead({
  title: 'УГНТУ | Расписание'
})
</script>

<template>
  <AccountMoloGuard>
    <AdminpanelPatternsMoloAdmin header_text="Расписание занятий">
      <section class="container">
        <section class="basic-info">
          <AdminpanelMoloCurrentDate/>
          <section class="controls">
            <div class="schedule-controls">
              <AdminpanelActionsMoloPostSchedule @saved="handleScheduleSaved"/>
              <AdminpanelMoloButton>
                Изменить существующее расписание
              </AdminpanelMoloButton>
            </div>
            <hr>
            <div class="schedule-controls">
              <AdminpanelActionsMoloPostLesson @lesson-added="fetchLessons"/>
              <AdminpanelActionsMoloPostTeacher @teacher-added="fetchTeachers"/>
            </div>
          </section>

          <section class="schedule-section">
            <span>Список предметов:</span>
            <section
                class="lessons-wrapper"
                :class="{ show: showLessons }"
            >
              <section class="lessons" v-for="(lesson, idx) in sortedLessons" :key="lesson._id">
                <span>{{ idx + 1 }} - {{ lesson.name }}</span>
              </section>
            </section>
            <section class="btn">

              <button class="show-more" @click="toggleExpand">
                <img
                    :class="{ rotated: showLessons }"
                    alt="Раскрыть"
                    src="/public/adminPanel/down.png"
                >
              </button>
            </section>
          </section>

          <section class="schedule-section">
            <span>Список преподавателей:</span>
            <section
                class="lessons-wrapper"
                :class="{ show: showTeachers }"
            >
              <section class="lessons" v-for="(teacher, idx) in sortedTeachers" :key="teacher._id">
                <span>{{ idx + 1 }} - {{ teacher.name }}</span>

                <span class="lessons-list">Преподаваемые предметы:</span>

                <section
                    class="taught-lessons"
                    :class="{ show: isExpanded(teacher._id) }"
                >
                  <span v-for="(lesson, i) in teacher.lessonTypes" :key="i">
                    <span class="num">{{ i + 1 }}</span> - {{ lesson }}
                  </span>
                </section>

                <section class="btn">
                  <button class="show-more" @click="toggleTeacherLessons(teacher._id)">
                    <img
                        :class="{ rotated: isExpanded(teacher._id) }"
                        alt="Раскрыть"
                        src="/public/adminPanel/down.png"
                    >
                  </button>
                </section>
              </section>
            </section>
            <section class="btn">

              <button class="show-more" @click="toggleExpand_T">
                <img
                    :class="{ rotated: showTeachers }"
                    alt="Раскрыть"
                    src="/public/adminPanel/down.png"
                >
              </button>
            </section>
          </section>

        </section>

        <AdminpanelMoloModal
            :visible="showAddScheduleModal"
            @close="showAddScheduleModal = false"
        />

        <AdminpanelMoloSchedule :schedule-data="scheduleData" @refresh="fetchSchedule"/>
      </section>
    </AdminpanelPatternsMoloAdmin>
  </AccountMoloGuard>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}


.basic-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.schedule-controls {
  display: flex;
  gap: 20px;
}

hr {
  width: 100%;
}


hr {
  border: 1px solid var(--dk-border-color);
}

.schedule-section {
  border: 1px solid var(--dk-border-color);
  background-color: var(--dk-bg-color);
  display: flex;
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
}


.lessons-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.3s ease;
  opacity: 0;
}

.lessons-wrapper.show {
  max-height: 300px;
  opacity: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;

  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--dk-border-color);
    border-radius: 20px;
    border: 4px solid transparent;
  }
}

.lessons {
  display: flex;
  flex-direction: column;

  & .lessons-list {
    padding: 4px 0 0px 20px;
  }
}

& .taught-lessons {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.3s ease;
  opacity: 0;
  display: flex;
  flex-direction: column;

  &.show {
    max-height: 300px;
    opacity: 1;
  }

  & span {
    padding: 6px 0 10px 20px;
  }

  & span:last-child {
    padding: 0 0 10px 20px;
  }

  & .num {
    color: var(--dk-span-color);
  }
}

.btn {
  position: relative;
  right: 0;
  display: flex;
  justify-content: flex-end;
}


.show-more {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  padding: 12px 8px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  overflow: auto;
}

.show-more img {
  width: 60%;
  transition: all 0.4s ease-in-out;
}

.show-more img.rotated {
  transform: rotate(180deg);
}

</style>