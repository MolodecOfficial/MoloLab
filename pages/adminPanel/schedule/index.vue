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
const isMobile = ref(false);

// Проверка на мобильное устройство
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 1024;
};

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
  checkMobile();
  window.addEventListener('resize', checkMobile);
});


useHead({
  title: 'MoloLab | Работа с расписанием'
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
  border-radius: 10px;
  padding: 20px 20px 0 20px;
  margin-bottom: 15px;
  position: relative; /* Убираем flex-контейнер */
}

.lessons-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out; /* Плавная анимация */
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

.lessons-wrapper.show {
  max-height: 500px; /* Увеличиваем максимальную высоту */
}

.btn {
  position: absolute;
  right: 20px;
  top: -20px; /* Фиксируем позицию относительно секции */
  transform: translateY(0);
  margin: 0;
}




.lessons {
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 0;

}

.taught-lessons {
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
    padding: 6px 0 10px 10px;
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
@media (max-width: 1100px) {
  .container {
    flex-direction: column;
    gap: 20px;
  }

  .schedule-controls {
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    width: 100%;
  }

  .schedule-controls {
    flex-wrap: wrap;
  }

  .schedule-controls > * {
    flex: 1 1 45%;
    min-width: 150px;
  }

  .show-more {
    padding: 3px;
    height: 100%;
    width: fit-content;
  }

  .show-more img {
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 768px) {
  .basic-info {
    padding: 10px;
  }

  .controls {
    gap: 10px;
  }

  .schedule-controls {
    flex-direction: column;
    gap: 10px;
  }

  .schedule-controls > * {
    flex: 1 1 100%;
  }

  .schedule-section {
    padding: 12px;
  }

  .section-header span {
    font-size: 0.95rem;
  }

  .lessons span, .teacher-header span {
    font-size: 0.9rem;
  }

  .taught-lessons .lesson-item {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .schedule-section {
    padding: 10px;
  }

  .section-header span {
    font-size: 0.9rem;
    max-width: 80%;
  }

  .show-more {
    padding: 2px;
  }

  .teacher-header span {
    font-size: 0.85rem;
    max-width: 75%;
  }

  .show-more.small img {
    width: 1px;
    height: 11px;
  }

  .subjects-title {
    font-size: 0.8rem;
  }
}
</style>