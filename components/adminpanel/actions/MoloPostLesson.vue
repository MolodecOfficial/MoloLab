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
  <AdminpanelMoloButton type="primary" @click="showLessonModal = true">
    Добавить новый предмет
  </AdminpanelMoloButton>

  <AdminpanelMoloModal
      :statusMessage="statusMessage"
      :title="modalTitle"
      :visible="showLessonModal"
      @close="showLessonModal = false"
  >
    <template #body>
      <AdminpanelMoloInput
          v-model="lessonName"
          placeholder="Название предмета"
      />
    </template>

    <template #confirm-button>
      <AdminpanelMoloButton type="confirm" @click="submitLesson">
        Подтвердить
      </AdminpanelMoloButton>
    </template>

    <template #status>
      {{ statusMessage }}
    </template>

    <template #cancel-button>
    <AdminpanelMoloButton type="cancel" @click="showLessonModal = false">
      Отмена
    </AdminpanelMoloButton>
    </template>
  </AdminpanelMoloModal>
</template>

<style scoped>

</style>