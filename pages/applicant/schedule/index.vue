<script setup lang="ts">
import {ref, computed} from "vue";
import {scheduleList} from '~/stores/scheduleStore';

useHead({
  title: 'УГНТУ | Расписание'
});

const availableDates = Object.keys(scheduleList);
const selectedDate = ref<string>(availableDates[0]);

// Получаем список групп
const groupOptions = computed(() => {
  if (!selectedDate.value) return [];
  return Object.keys(scheduleList[selectedDate.value] || {});
});

const selectedGroup = ref<string | null>(groupOptions.value[0] || null);

// Фильтруем расписание по выбранной группе и дате
const filteredSchedule = computed(() => {
  if (!selectedDate.value || !selectedGroup.value) return [];

  const daySchedule = scheduleList[selectedDate.value];
  return daySchedule[selectedGroup.value] || [];
});

// Форматирование даты
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formattedSelectedDate = computed(() => {
  return formatDate(selectedDate.value);
});

</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList/>
    <section class="schedule-container">
      <section class="schedule-header">
        <span>Расписание занятий</span>
      </section>

      <div class="controls">
        <!-- Выбор даты -->
        <input
            type="date"
            v-model="selectedDate"
            :min="availableDates[0]"
            :max="availableDates[availableDates.length - 1]"
            class="date-picker"
        />
        <!-- Выбор группы -->
        <select v-model="selectedGroup">
          <option v-for="(group, index) in groupOptions" :key="index" :value="group">
            {{ group }}
          </option>
        </select>
      </div>

      <div v-if="filteredSchedule.length > 0" class="selected-date">
        <span>{{ formattedSelectedDate }}</span>
      </div>

      <!-- Вывод расписания -->
      <div class="schedule-list">
        <div v-if="filteredSchedule.length === 0" class="no-info">
          Нет данных для отображения, возможно расписание ещё не готово
        </div>
        <div class="schedule-item" v-for="(subject, index) in filteredSchedule" :key="index">
          <div class="subject-item">
            <span class="subject">{{ subject.subject }}</span>
            <div class="details">

              <section
                  v-if="subject.conditionOfLesson && subject.typeOfLesson !== 'Окно' && subject.typeOfLesson !== 'Нет занятий'">
                <!-- Для занятий с разделением на подгруппы -->
                <section v-if="subject.conditionOfLesson.subgroup1 && subject.conditionOfLesson.subgroup2">
                  <div class="subgroup-span">
                    <span class="lesson-info">1 подгруппа</span>
                    <span class="lesson-info">
                      {{ subject.conditionOfLesson.subgroup1.cabinet }} | {{ subject.conditionOfLesson.subgroup1.teacher }}
                    </span>
                  </div>
                  <hr>
                  <div>
                    <span :class="{
                      'lecture-type': subject.typeOfLesson === 'Лекция',
                      'practice-type': subject.typeOfLesson === 'Практика',
                      'laboratory-type': subject.typeOfLesson === 'Лабораторная работа',
                      'independent-type': subject.typeOfLesson === 'Самостоятельная работа',
                      'consultation-type': subject.typeOfLesson === 'Консультация',
                      'exam-type': subject.typeOfLesson === 'Экзамен',
                      }"
                    >
                      {{ subject.typeOfLesson }} | {{ subject.time }}
                    </span>
                  </div>
                  <hr>
                  <div class="subgroup-span">
                    <span class="lesson-info">2 подгруппа</span>
                    <span class="lesson-info">
                      {{ subject.conditionOfLesson.subgroup2.cabinet }} | {{ subject.conditionOfLesson.subgroup2.teacher }}
                    </span>
                  </div>
                </section>

                <!-- Для занятий без разделения на подгруппы -->
                <section v-else class="subgroup-container">
                  <span :class="{
                    'lecture-type': subject.typeOfLesson === 'Лекция',
                    'practice-type': subject.typeOfLesson === 'Практика',
                    'laboratory-type': subject.typeOfLesson === 'Лабораторная работа',
                    'independent-type': subject.typeOfLesson === 'Самостоятельная работа',
                    'consultation-type': subject.typeOfLesson === 'Консультация',
                    'exam-type': subject.typeOfLesson === 'Экзамен',
                    }" class="type-of-lesson"
                  >
                    {{ subject.typeOfLesson }} | {{ subject.time }}
                  </span>

                  <!-- Показываем кабинет и преподавателя только если это не "Окно" и не "Нет занятий" -->
                  <span v-if="subject.typeOfLesson !== 'Окно' && subject.typeOfLesson !== 'Нет занятий'" class="lesson-info">
                    {{ subject.conditionOfLesson?.common }} | {{ subject.teacher }}
                  </span>
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>


.dark-theme .container {
  background-color: #1e1e1e;

  & h1 {
    color: white;
  }
}

.container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
  display: flex;

  background-color: white;
}

.dark-theme .container {
  background-color: #1e1e1e;
}

.dark-theme .schedule-container {
  background-color: #151515;
  border: 1px solid #2c2c2c;
}

.dark-theme .schedule-header {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
}

.dark-theme .date {
  background-color: #2c2c2c;
  border: 1px solid #2c2c2c;
}

.dark-theme .subject-item {
  background-color: #2c2c2c;
  border: 1px solid #2c2c2c;
}


.dark-theme .controls {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
}

.dark-theme span {
  color: white;
}

.dark-theme .schedule-header span {
  color: white;
}

.dark-theme .lesson-info {
  color: #a9a9a9;
}

.dark-theme .no-info {
  border: 1px solid #2c2c2c;
  color: white;
  padding: 20px;
  border-radius: 20px;
  background-color: #1e1e1e;
}

.dark-theme .selected-date {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;

  & span {
    color: #4e45e3;
    font-weight: bold;
  }
}

.schedule-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  background-color: rgba(237, 244, 255, 0.82);;
  min-height: 93vh;
  border-top-left-radius: 20px;
  border: 1px solid #e0e0e0;
}

.schedule-header {
  background-color: #ffffff;
  width: 90%;
  height: 12vh;
  margin-top: 74px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;

  & span {
    font-size: 30px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #cccccc;

}

.controls {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}


.no-info {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
}

.selected-date {
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;

  & span {
    color: #4e45e3;
    font-weight: bold;
  }
}

.schedule-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  width: 100%;
  overflow-x: auto;
  gap: 12px;

  &:last-child {
    margin-bottom: 20px;
  }
}

.schedule-item {
  display: flex;
  flex-direction: column;
  width: 60%;

}

.schedule-item h3 {
  font-size: 18px;
  padding-left: 10px;
  color: #007bff; /* Цвет заголовка для дней */
  text-align: center;
}

.subject-item {
  display: flex;
  flex-direction: column; /* Изменено на column для вертикального расположения */
  padding-bottom: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
}

.subgroup-span {
  display: flex;
  flex-direction: column;
}

.type-of-lesson {
  display: flex;
  text-align: center;
  flex-direction: row;

}

hr {
  width: 97%;
}

.details {
  display: flex;
  flex-direction: column;

  & .lecture-type {
    color: green; /* Цвет для лекции */
  }

  & .practice-type {
    color: #008cff; /* Цвет для других типов уроков */
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

span {
  padding: 1px 15px;

  &:first-child {
    padding-top: 8px;
  }
}

.subject {
  color: #000000;
  font-size: 19px;
}

.lesson-info {
  color: #555555;
}


@media (max-width: 560px) {
  .schedule-header span {
    font-size: clamp(12px, 4vw, 22px);

  }

  .controls {
    width: 70%;

    & select {
      width: 50%;
    }

    & input {
      width: 50%;
    }
  }

  .date {
    width: 100%;
  }

  .subject {
    font-size: 14px;
  }
}

@media (min-width: 561px) and (max-width: 765px) {

}

@media (min-width: 766px) and (max-width: 1280px) {
}


</style>

