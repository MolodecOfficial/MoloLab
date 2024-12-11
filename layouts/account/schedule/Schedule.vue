<script setup lang="ts">
import { ref, computed } from "vue";

const schedules: any = {
  'БПИ, БПИ09з': [
    {
      date: '2024-11-05',
      subjects: [
        { time: '08:45 – 10:20', subject: 'История России', teacher: 'Вильданов Руслан Раисович', typeOfLesson: 'Лекция' },
        { time: '10:30 – 12:05', subject: 'История России', teacher: 'Вильданов Руслан Раисович', typeOfLesson: 'Лекция' },
        { time: '12:15 – 13:50', subject: 'История России', teacher: 'Вильданов Руслан Раисович', typeOfLesson: 'Лекция' },
        { time: '14:35 – 16:10', subject: 'Физика', teacher: 'Иванова Ольга Владимировна', typeOfLesson: 'Лекция' },
        { time: '16:20 – 17:55', subject: 'Физика', teacher: 'Иванова Ольга Владимировна', typeOfLesson: 'Лекция' },
        { time: '18:05 – 19:40', subject: 'Основы российской государственности', teacher: 'Шалагина Светлана Витальевна', typeOfLesson: 'Лекция' },
        { time: '19:50 – 21:15', subject: 'Основы российской государственности', teacher: 'Шалагина Светлана Витальевна', typeOfLesson: 'Лекция' },
      ],
    },
    {
      date: '2024-11-06',
      subjects: [
        { time: '08:45 – 10:20', subject: 'Дискретная математика', teacher: 'Тухватуллина Ляйсан Ринатовна', typeOfLesson: 'Лекция' },
        { time: '10:30 – 12:05', subject: 'Дискретная математика', teacher: 'Тухватуллина Ляйсан Ринатовна', typeOfLesson: 'Лекция' },
        { time: '12:15 – 13:50', subject: 'Дискретная математика', teacher: 'Тухватуллина Ляйсан Ринатовна', typeOfLesson: 'Лекция' },
        { time: '14:35 – 16:10', subject: 'Свободное время', teacher: '', typeOfLesson: 'Окно' },
        { time: '16:20 – 17:55', subject: 'Математика', teacher: 'Гильмутдинов Риф Забирович', typeOfLesson: 'Лекция' },
        { time: '18:05 – 19:40', subject: 'Математика', teacher: 'Гильмутдинов Риф Забирович', typeOfLesson: 'Лекция' },
      ],
    },
    {
      date: '2024-11-07',
      subjects: [
        { time: '08:45 – 10:20', subject: 'Свободное время', teacher: '', typeOfLesson: 'Окно' },
        { time: '10:30 – 12:05', subject: 'Математика', teacher: 'Гильмутдинов Риф Забирович', typeOfLesson: 'Лекция' },
        { time: '12:15 – 13:50', subject: 'Математика', teacher: 'Гильмутдинов Риф Забирович', typeOfLesson: 'Лекция' },
        { time: '14:35 – 16:10', subject: 'Инженерная компьютерная графика', teacher: 'Набиев Рифкат Ильшатович', typeOfLesson: 'Лекция' },
        { time: '16:20 – 17:55', subject: 'Свободное время', teacher: '', typeOfLesson: 'Окно' },
        { time: '18:05 – 19:40', subject: 'Основы российской государственности', teacher: 'Шалагина Светлана Витальевна', typeOfLesson: 'Лекция' },
      ],
    },
    {
      date: '2024-11-08',
      subjects: [
        { time: '08:45 – 10:20', subject: 'Физика', teacher: 'Иванова Ольга Владимировна', typeOfLesson: 'Лекция' },
        { time: '10:30 – 12:05', subject: 'Физика', teacher: 'Иванова Ольга Владимировна', typeOfLesson: 'Лекция' },
        { time: '12:15 – 13:50', subject: 'Основы российской государственности', teacher: 'Шалагина Светлана Витальевна', typeOfLesson: 'Лекция' },
        { time: '14:35 – 16:10', subject: 'Основы российской государственности', teacher: 'Шалагина Светлана Витальевна', typeOfLesson: 'Практика' },
        { time: '16:20 – 17:55', subject: 'Математика', teacher: 'Гильмутдинов Риф Забирович', typeOfLesson: 'Лекция' },
        { time: '18:05 – 19:40', subject: 'Математика', teacher: 'Гильмутдинов Риф Забирович', typeOfLesson: 'Практика' },
        { time: '19:50 – 21:15', subject: 'Инженерная компьютерная графика', teacher: 'Набиев Рифкат Ильшатович', typeOfLesson: 'Лекция' },
      ],
    },
    {
      date: '2024-11-09',
      subjects: [
        { time: '08:45 – 10:20', subject: 'Математика', teacher: 'Гильмутдинов Риф Забирович', typeOfLesson: 'Лекция' },
        { time: '10:30 – 12:05', subject: 'Математика', teacher: 'Гильмутдинов Риф Забирович', typeOfLesson: 'Практика' },
        { time: '12:15 – 13:50', subject: 'История России', teacher: 'Вильданов Руслан Раисович', typeOfLesson: 'Лекция' },
        { time: '14:35 – 16:10', subject: 'История России', teacher: 'Вильданов Руслан Раисович', typeOfLesson: 'Лекция' },
        { time: '16:20 – 17:55', subject: 'История России', teacher: 'Вильданов Руслан Раисович', typeOfLesson: 'Лекция' },
        { time: '18:05 – 19:40', subject: 'Инженерная компьютерная графика', teacher: 'Набиев Рифкат Ильшатович', typeOfLesson: 'Лекция' },
      ],
    },
  ],
  'БИФз': [
    {
      date: '2024-11-05',
      subjects: [
        { time: '9:00 - 10:30', subject: 'Программирование', teacher: 'Кузнецов К.К.', typeOfLesson: 'Лекция' },
        { time: '10:45 - 12:15', subject: 'Алгебра', teacher: 'Смирнов С.С.', typeOfLesson: 'Практика' },
        { time: '12:30 - 14:00', subject: 'История', teacher: 'Алексеев А.А.', typeOfLesson: 'Лабораторная работа' },
        { time: '12:30 - 14:00', subject: 'Инженерная графика', teacher: 'Попов К.А.', typeOfLesson: 'Самостоятельная работа' },
      ],
    },{
      date: '2024-11-06',
      subjects: [
        { time: '9:00 - 10:30', subject: 'Программирование', teacher: 'Кузнецов К.К.', typeOfLesson: 'Лекция' },
        { time: '10:45 - 12:15', subject: 'Алгебра', teacher: 'Смирнов С.С.', typeOfLesson: 'Практика' },
        { time: '12:30 - 14:00', subject: 'История', teacher: 'Алексеев А.А.', typeOfLesson: 'Лабораторная работа' },
        { time: '12:30 - 14:00', subject: 'Инженерная графика', teacher: 'Попов К.А.', typeOfLesson: 'Самостоятельная работа' },
      ],
    },
  ],
};

const selectedGroup = ref<string | null>('БПИ, БПИ09з');
const selectedDate = ref<string | null>('2024-11-05');

const groupOptions = Object.keys(schedules);

const filteredSchedule = computed(() => {
  if (!selectedGroup.value) return [];

  const schedule = schedules[selectedGroup.value];

  if (!selectedDate.value) return schedule;

  return schedule.filter(day => day.date === selectedDate.value);
});


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
  <section class="schedule-container">
    <section class="schedule-header">
      <span>Расписание занятий</span>
    </section>

    <div class="controls">
      <select v-model="selectedGroup">
        <option v-for="(group, index) in groupOptions" :key="index" :value="group">
          {{ group }}
        </option>
      </select>

      <input type="date" v-model="selectedDate"/>
    </div>

    <div class="schedule-list">
      <div class="schedule-item" v-for="(day, index) in filteredSchedule" :key="index">
        <div v-for="(subject, subIndex) in day.subjects" :key="subIndex" class="subject-item">
          <span class="subject">{{ subject.subject }}</span>
          <div class="details">
            <span :class="{
              'lecture-type': subject.typeOfLesson === 'Лекция',
              'practice-type': subject.typeOfLesson === 'Практика',
              'laboratory-type': subject.typeOfLesson === 'Лабораторная работа',
              'independent-type': subject.typeOfLesson === 'Самостоятельная работа',
            }">
              {{ subIndex + 1 }} {{ subject.typeOfLesson }} | {{ subject.time }}
            </span>
            <span class="teacher">{{ subject.teacher }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.dark-theme .schedule-container {
  background-color: #1a1a1a;
}

.dark-theme .schedule-header {
  background-color: #1e1e1e;
  border: 1px solid #2c2c2c;
}

.dark-theme .subject-item {
  background-color: #2c2c2c;
}

.dark-theme .schedule-list {
  background-color: #1a1a1a;
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
  background-color: #f5f7fa;
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

.back {
  text-decoration: none;
  color: #4e45e3;
  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 3px;
  }
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