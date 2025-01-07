<script setup lang="ts">
import { ref, computed } from "vue";
import { scheduleList } from '~/stores/scheduleStore';

useHead({
  title: 'УГНТУ | Расписание'
});

const selectedGroup = ref<string | null>('БПИ, БПИ09з');
const selectedDate = ref<string | null>('2024-11-05');

// Получаем список групп
const groupOptions = Object.keys(scheduleList);

// Фильтруем расписание по выбранной группе и дате
const filteredSchedule = computed(() => {
  if (!selectedGroup.value) return [];

  const schedule = scheduleList[selectedGroup.value];

  if (!schedule) return [];

  if (!selectedDate.value) return schedule;

  return schedule.filter(day => day.date === selectedDate.value);
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

</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList />
    <section class="schedule-container">
      <section class="schedule-header">
        <span>Расписание занятий</span>
      </section>

      <div class="controls">
        <!-- Выбор группы -->
        <select v-model="selectedGroup">
          <option v-for="(group, index) in groupOptions" :key="index" :value="group">
            {{ group }}
          </option>
        </select>

        <!-- Выбор даты -->
        <input type="date" v-model="selectedDate" />
      </div>

      <!-- Вывод расписания -->
      <div class="schedule-list">
        <div v-if="filteredSchedule.length === 0">Нет данных для отображения</div>
        <div class="schedule-item" v-for="(day, index) in filteredSchedule" :key="index">
          <h3>{{ formatDate(day.date) }}</h3>
          <div v-for="(subject, subIndex) in day.subjects" :key="subIndex" class="subject-item">
            <span class="subject">{{ subject.subject }}</span>
            <div class="details">
              <span :class="{
                'lecture-type': subject.typeOfLesson === 'Лекция',
                'practice-type': subject.typeOfLesson === 'Практика',
                'laboratory-type': subject.typeOfLesson === 'Лабораторная работа',
                'independent-type': subject.typeOfLesson === 'Самостоятельная работа',
              }">
                {{ subject.typeOfLesson }} | {{ subject.time }}
              </span>
              <span class="teacher">{{ subject.teacher }}</span>
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
  height: 100vh;
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

.dark-theme .subject-item {
  background-color: #2c2c2c;
}

.dark-theme .schedule-list {
  background: linear-gradient(to top, #1a1a1a, #151515);
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

.dark-theme .teacher {
  color: #a9a9a9;
}

.schedule-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.schedule-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  width: 100%;
  height: 70%;
  overflow-x: auto;

}
.schedule-item {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

}

.details {
  display: flex;
  flex-direction: column;
  & .lecture-type {
    color: green; /* Цвет для лекции */
  }

  & .practice-type {
    color: #0015ff; /* Цвет для других типов уроков */
  }

  & .laboratory-type {
    color: #ff5900;
  }

  & .independent-type {
    color: #ffd500;
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

.teacher {
  color: #555555;
}


@media (max-width: 560px) {
  .schedule-header span{
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
  .subject {
    font-size: 14px;
  }
}

@media (min-width: 561px) and (max-width: 765px) {

}

@media (min-width: 766px) and (max-width: 1280px) {
}



</style>

