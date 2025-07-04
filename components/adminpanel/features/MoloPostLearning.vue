<script setup lang="ts">

import {ref} from "vue";

const props = defineProps({
  user: Object
})

const userStore = useUserStore()

const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('')
const showLearningModal = ref(false);
const selectedLearning = ref<string | null>(null);
const selectedForm = ref<string | null>(null);
const selectedCourse = ref<string | null>(null);
const statusMessage = ref('')

const openLearningModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  selectedLearning.value = user.learning;
  selectedForm.value = user.form_of_learning;
  selectedCourse.value = user.course;
  showLearningModal.value = true;
};

const updateLearningDetails = async () => {
  if (selectedUserId.value && selectedLearning.value && selectedForm.value && selectedCourse.value) {
    try {
      statusMessage.value = 'Идёт добавление информации...';

      await userStore.addLearningDetails(
          selectedUserId.value,
          selectedLearning.value,
          selectedForm.value,
          selectedCourse.value
      );
      statusMessage.value = 'Данные обучения успешно обновлены!'
      setTimeout(() => showLearningModal.value = false, 1500)
      await userStore.getUsers();
      setTimeout(() => statusMessage.value = '', 1500)
    } catch (error) {
      console.error('Ошибка при обновлении данных обучения:', error);
      statusMessage.value = 'Не удалось обновить данные обучения.'
    }
  } else {
    statusMessage.value = 'Пожалуйста, заполните все поля.'
  }
};

const learningTitle = computed(() => `Добавление информации об обучении пользователю ${selectedUserName.value}`)
</script>

<template>
  <AdminpanelUIMoloButton
      type="learning"
      @click="openLearningModal(user)"
  >
    Выбор обучения
  </AdminpanelUIMoloButton>
  <AdminpanelUIMoloModal
      :statusMessage="statusMessage"
      :title="learningTitle"
      :visible="showLearningModal"
      @close="showLearningModal = false"
  >
    <template #select>
      <label for="learning-select">Обучение:</label>
      <AdminpanelUIMoloSelect
          v-model="selectedLearning"
          class="select"
      >
        <option value="Очное">Очное</option>
        <option value="Заочное">Заочное</option>
      </AdminpanelUIMoloSelect>

      <label for="form-select">Форма обучения:</label>
      <AdminpanelUIMoloSelect
          v-model="selectedForm"
          class="select"
      >
        <option value="Коммерция">Коммерция</option>
        <option value="Бюджет">Бюджет</option>
      </AdminpanelUIMoloSelect>

      <label for="course-select">Курс:</label>
      <AdminpanelUIMoloSelect
          v-model="selectedCourse"
          class="select"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </AdminpanelUIMoloSelect>
    </template>
    <template #confirm-button>
      <AdminpanelUIMoloButton
          type="confirm"
          @click="updateLearningDetails"
      >
        Подтвердить
      </AdminpanelUIMoloButton>
    </template>

    <template #status>
      <span> {{ statusMessage }}</span>
    </template>

    <template #cancel-button>
      <AdminpanelUIMoloButton
          type="cancel"
          @click="showLearningModal = false"
      >
        Отмена
      </AdminpanelUIMoloButton>
    </template>

  </AdminpanelUIMoloModal>
</template>

<style scoped>

</style>