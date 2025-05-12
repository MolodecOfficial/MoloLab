<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const scheduleData = ref<any[]>([]);
const statusMessage = ref('');
const showAddScheduleModal = ref(false);

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

const handleScheduleSaved = () => {
  fetchSchedule();
};

const handleScheduleUpdated = () => {
  fetchSchedule();
};

onMounted(() => {
  fetchSchedule();
  window.addEventListener('schedule-updated', handleScheduleUpdated);
});

onUnmounted(() => {
  window.removeEventListener('schedule-updated', handleScheduleUpdated);
});
</script>

<template>
  <AccountMoloGuard>
    <AdminpanelPatternsMoloAdmin header_text="Расписание занятий">
      <section class="container">
        <section class="basic-info">
          <AdminpanelMoloCurrentDate />
          <section class="controls">
            <div class="schedule-controls">
              <AdminpanelActionsMoloPostSchedule @saved="handleScheduleSaved" />
              <AdminpanelMoloButton>
                Изменить существующее расписание
              </AdminpanelMoloButton>
            </div>
            <hr>
            <div class="schedule-controls">
              <AdminpanelActionsMoloPostLesson/>
              <AdminpanelActionsMoloPostTeacher/>
            </div>
          </section>

          <span v-if="statusMessage" class="status-message">
            {{ statusMessage }}
          </span>
        </section>

        <AdminpanelMoloModal
            :visible="showAddScheduleModal"
            @close="showAddScheduleModal = false"
        />

        <AdminpanelMoloSchedule :schedule-data="scheduleData" @refresh="fetchSchedule" />
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


</style>