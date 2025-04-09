<script setup lang="ts">

import {ref} from "vue";

const props = defineProps({
  user: Object
})

const userStore = useUserStore()

const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('');
const selectedScore = ref<number | null>(null);
const showScoresModal = ref(false);
const statusMessage = ref('')
const selectedSubject = ref<string | null>(null);
const availableSubjects = ref<any[]>()


const openScoresModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  selectedScore.value = user.scores || 0; // Текущие оценки пользователя
  showScoresModal.value = true;
};


const updateUserScores = async () => {
  console.log('Updating user scores', selectedUserId.value, selectedSubject.value, selectedScore.value); // Логирование

  if (selectedUserId.value && selectedSubject.value && selectedScore.value !== null) {
    try {
      // Добавляем или обновляем оценку
      await userStore.addScore(selectedUserId.value, selectedSubject.value, selectedScore.value);

      // Обновляем средний балл и рейтинг пользователя
      const updatedUser = userStore.users.find((user) => user._id === selectedUserId.value);
      if (updatedUser) {
        console.table('Обновленные данные пользователя:', updatedUser); // Логирование обновленных данных пользователя
        setTimeout(() => showScoresModal.value = false, 1500);
        await userStore.getUsers();
        statusMessage.value = 'Оценки пользователя успешно обновлены!';
        setTimeout(() => statusMessage.value = '', 1500);
      }
    } catch (error) {
      console.error('Ошибка при обновлении оценок:', error);
      statusMessage.value = 'Не удалось обновить оценки.';
    }
  } else {
    statusMessage.value = 'Пожалуйста, укажите предмет и оценку.';
  }
};

async function fetchAvailableSubjects() {
  try {
    const response = await fetch('/api/edit-scores');
    if (response.ok) {
      const data = await response.json();
      availableSubjects.value = data.allowedSubjects.sort((a, b) => a.localeCompare(b, 'ru'));
    } else {
      console.error('Не удалось получить список предметов');
    }
  } catch (error) {
    console.error('Ошибка при загрузке предметов:', error);
  }
}

const scoresTitle = computed(() => `Выдача оценок пользователю ${selectedUserName.value}`)

onMounted(async () => {
  await fetchAvailableSubjects();
})
</script>

<template>
  <AdminpanelMoloButton
      type="scores"
      @click="openScoresModal(user)"
  >
    Добавление оценки
  </AdminpanelMoloButton>
  <AdminpanelMoloModal
      :statusMessage="statusMessage"
      :title="scoresTitle"
      :visible="showScoresModal"
      @close="showScoresModal = false"
  >
    <template #select>
      <label for="subject-select">Предмет:</label>
      <AdminpanelMoloSelect
          v-model="selectedSubject"
          class="select"
      >
        <option value="" disabled>Выберите предмет</option>
        <option v-for="subject in availableSubjects" :key="subject" :value="subject">
          {{ subject }}
        </option>
      </AdminpanelMoloSelect>

      <label for="form-select">Оценка:</label>
      <AdminpanelMoloSelect
          v-model.number="selectedScore"
          class="select"
      >
        <option value="" disabled>Выберите оценку</option>
        <option :value="5">Отлично</option>
        <option :value="4">Хорошо</option>
        <option :value="3">Удовлетворительно</option>
        <option :value="2">Неудовлетворительно</option>
        <option :value="1">Плохо</option>
      </AdminpanelMoloSelect>
    </template>
    <template #confirm-button>
      <AdminpanelMoloButton
          type="confirm"
          @click="updateUserScores"
      >
        Подтвердить
      </AdminpanelMoloButton>
    </template>

    <template #status>
      <span> {{ statusMessage }}</span>
    </template>

    <template #cancel-button>
      <AdminpanelMoloButton
          type="cancel"
          @click="showScoresModal = false"
      >
        Отмена
      </AdminpanelMoloButton>
    </template>

  </AdminpanelMoloModal>
</template>

<style scoped>

</style>