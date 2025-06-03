<script setup lang="ts">
import {ref, computed} from "vue";

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

