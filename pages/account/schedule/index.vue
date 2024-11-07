<script setup lang="ts">
import { ref } from 'vue';

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
  'БПИ09': [
    {
      date: '2023-10-02',
      subjects: [
        { time: '9:00 - 10:30', subject: 'Программирование', teacher: 'Кузнецов К.К.', typeOfLesson: 'Лекция' },
        { time: '10:45 - 12:15', subject: 'Алгебра', teacher: 'Смирнов С.С.', typeOfLesson: 'Практика' },
        { time: '12:30 - 14:00', subject: 'История', teacher: 'Алексеев А.А.', typeOfLesson: 'Лабораторная работа' },
        { time: '12:30 - 14:00', subject: 'Инженерная графика', teacher: 'Попов К.А.', typeOfLesson: 'Самостоятельная работа' },
      ],
    },{
      date: '2023-10-03',
      subjects: [
        { time: '9:00 - 10:30', subject: 'Программирование', teacher: 'Кузнецов К.К.', typeOfLesson: 'Лекция' },
        { time: '10:45 - 12:15', subject: 'Алгебра', teacher: 'Смирнов С.С.', typeOfLesson: 'Практика' },
        { time: '12:30 - 14:00', subject: 'История', teacher: 'Алексеев А.А.', typeOfLesson: 'Лабораторная работа' },
        { time: '12:30 - 14:00', subject: 'Инженерная графика', teacher: 'Попов К.А.', typeOfLesson: 'Самостоятельная работа' },
      ],
    },
  ],
};

const selectedGroup = ref('БПИ, БПИ09з');
const schedule = ref(schedules[selectedGroup.value]);

function updateSchedule() {
  schedule.value = schedules[selectedGroup.value];
}

useThemeStore()
</script>

<template>
  <div class="schedule-container">
    <NuxtLink to="/account" class="back">Вернуться обратно</NuxtLink>
    <header>
      <h1>Расписание занятий</h1>
      <select v-model="selectedGroup" @change="updateSchedule">
        <option v-for="(group, index) in Object.keys(schedules)" :key="index" :value="group">
          {{ group }}
        </option>
      </select>
    </header>

    <div class="schedule-list">
      <div class="schedule-item" v-for="(day, index) in schedule" :key="index">
        <h3>{{ new Date(day.date).toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</h3>
        <div v-for="(subject, subIndex) in day.subjects" :key="subIndex" class="subject-item">
          <span class="subject">{{ subject.subject }}</span>
          <div class="details">
            <span :class="{
              'lecture-type': subject.typeOfLesson == 'Лекция',
              'practice-type': subject.typeOfLesson == 'Практика',
              'laboratory-type': subject.typeOfLesson == 'Лабораторная работа',
              'independent-type': subject.typeOfLesson == 'Самостоятельная работа',
            }">
              {{ subIndex + 1 }} {{ subject.typeOfLesson }} | {{ subject.time }}
            </span>
            <span class="teacher">{{ subject.teacher }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.dark-theme .back {
  background-color: #1e1e1e;
}

.dark-theme .schedule-container {
  background-color: #1e1e1e;
  & h1 {
    color: white;
  }
}

.dark-theme .subject-item {
  background-color: #2c2c2c;
}

.dark-theme .schedule-list {
  background-color: #1a1a1a;
}

.dark-theme span {
  color: white;
}

.dark-theme .teacher {
  color: #a9a9a9;
}

.schedule-container {
  padding: 20px;
  background-color: #ffffff; /* Белый фон */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  color: #333333; /* Темный цвет текста */
}

select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #cccccc;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}

.schedule-item {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 10px;
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
</style>

