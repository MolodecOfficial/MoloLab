<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useUserStore} from '~/stores/userStore';


useHead({
  title: 'УГНТУ | Список пользователей'
})

const userStore = useUserStore();

const searchQuery = ref('');
const loading = ref(true);
const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('');
const statusMessage = ref('')
const selectedSubject = ref<string | null>(null);
const availableSubjects = ref<any[]>()
const showScheduleModal = ref(false);  // Состояние для отображения модального окна для расписания
const selectedSchedule = ref<any[]>([]);  // Данные расписания
const newSchedule = ref({
  day: '',
  time: '',
  subject: '',
  group: '',
});

async function getAllUsers() {
  try {
    await userStore.getUsers();
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  } finally {
    loading.value = false;
  }
}

const openScheduleModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  showScheduleModal.value = true;
};

// const addSchedule = async () => {
//   if (newSchedule.value.day && newSchedule.value.time && newSchedule.value.subject && newSchedule.value.group) {
//     try {
//       // Подготовим данные для отправки в нужном формате
//       const scheduleData: any = {
//         userId: selectedUserId.value,  // Убедитесь, что selectedUserId передается
//         date: newSchedule.value.day,   // Используем день для даты
//         groups: {
//           [newSchedule.value.group]: [
//             {
//               time: newSchedule.value.time,
//               subject: newSchedule.value.subject,
//             }
//           ]
//         }
//       };
//
//       // Добавляем новое расписание
//       await userStore.addSchedule(scheduleData);
//
//       statusMessage.value = 'Расписание успешно добавлено!';
//       setTimeout(() => showScheduleModal.value = false, 1500);
//       await getAllUsers();  // Обновляем список пользователей
//       setTimeout(() => statusMessage.value = '', 1500);
//     } catch (error) {
//       console.error('Ошибка при добавлении расписания:', error);
//       statusMessage.value = 'Не удалось добавить расписание.';
//     }
//   } else {
//     statusMessage.value = 'Пожалуйста, заполните все поля.';
//   }
// }

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return userStore.users;
  }

  return userStore.users.filter((user: any) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.value.toLowerCase());
  });
});


// Метод для получения всех пользователей
onMounted(async () => {
  await getAllUsers();
});

</script>

<template>
  <AccountMoloGuard>
    <AdminpanelPatternsMoloAdmin header_text="Список пользователей">
      <template #more-info>
        <div class="test">
          <AdminpanelMoloInput
              v-model="searchQuery"
              width="100%"
              placeholder="Введите имя пользователя"/>
        </div>

      </template>
    <div class="bg">
        <AdminpanelMoloUserList
            :users="filteredUsers"
            :loading="loading"

        />
<!--            <button class="scores-button" @click="() => openScoresModal(user)">Добавить оценку</button>-->
<!--&lt;!&ndash;            <button class="schedule-button" @click="() => openScheduleModal(user)">Добавить расписание</button>&ndash;&gt;-->

<!--          </section>-->

<!--        <div v-if="showScheduleModal" class="modal-overlay">-->
<!--          <div class="modal-content">-->
<!--            <div>-->
<!--              <label for="date-input">Дата:</label>-->
<!--              <input type="date" id="date-input" v-model="newSchedule.date" class="select">-->
<!--            </div>-->

<!--            <div>-->
<!--              <label for="time-input">Время:</label>-->
<!--              <input type="time" id="time-input" v-model="newSchedule.time" class="select">-->
<!--            </div>-->

<!--            <div>-->
<!--              <label for="subject-input">Предмет:</label>-->
<!--              <input type="text" id="subject-input" v-model="newSchedule.subject" class="select">-->
<!--            </div>-->

<!--            <div>-->
<!--              <label for="group-input">Группа:</label>-->
<!--              <input type="text" id="group-input" v-model="newSchedule.group" class="select">-->
<!--            </div>-->

<!--            <div class="modal-buttons">-->
<!--              <button class="confirm-button" @click="addSchedule">Подтвердить</button>-->
<!--              <span>{{ statusMessage }}</span>-->
<!--              <button class="cancel-button" @click="showScheduleModal = false">Отмена</button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
    </div>
    </AdminpanelPatternsMoloAdmin>
  </AccountMoloGuard>
</template>


<style scoped>
.test {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>