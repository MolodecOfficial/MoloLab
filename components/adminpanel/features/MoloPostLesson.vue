<script setup lang="ts">

import {ref} from "vue";

const showLessonModal = ref(false);
const modalTitle = ref("Добавление нового предмета");
const statusMessage = ref('')

const lessonName = ref("");
const isSubmitting = ref(false);

const emit = defineEmits(["lesson-added"]);


const submitLesson = async () => {
  if (!lessonName.value.trim()) {
    statusMessage.value = "Название предмета не может быть пустым";
    return;
  }
  isSubmitting.value = true;
  try {
    statusMessage.value = 'Идёт создание предмета...';
    const response = await $fetch("/api/lesson", {
      method: "POST",
      body: { name: lessonName.value.trim() },
    });

    statusMessage.value = "Предмет успешно добавлен!";
    emit("lesson-added");
    lessonName.value = "";

    setTimeout(() => {
      showLessonModal.value = false;
      statusMessage.value = "";
    }, 1000);


  } catch (error: any) {
    // Проверяем, пришло ли сообщение от сервера, что предмет уже существует
    if (error?.data?.statusMessage === "Такой предмет уже существует.") {
      statusMessage.value = "Этот предмет уже есть в системе.";
    } else {
      statusMessage.value = error?.data?.statusMessage || "Ошибка при добавлении";
    }
  } finally {
    isSubmitting.value = false;
  }
};


</script>

<template>
  <AdminpanelUIMoloButton type="primary" @click="showLessonModal = true">
    Добавить новый предмет
  </AdminpanelUIMoloButton>

  <AdminpanelUIMoloModal
      :statusMessage="statusMessage"
      :title="modalTitle"
      :visible="showLessonModal"
      @close="showLessonModal = false"
  >
    <template #body>
      <AdminpanelUIMoloInput
          v-model="lessonName"
          placeholder="Название предмета"
      />
    </template>

    <template #confirm-button>
      <AdminpanelUIMoloButton type="confirm" @click="submitLesson">
        Подтвердить
      </AdminpanelUIMoloButton>
    </template>

    <template #status>
      {{ statusMessage }}
    </template>

    <template #cancel-button>
    <AdminpanelUIMoloButton type="cancel" @click="showLessonModal = false">
      Отмена
    </AdminpanelUIMoloButton>
    </template>
  </AdminpanelUIMoloModal>
</template>

<style scoped>

</style>