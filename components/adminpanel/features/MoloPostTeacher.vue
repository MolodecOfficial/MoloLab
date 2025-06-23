<script setup lang="ts">
import { ref, watch } from "vue";

const showTeacherModal = ref(false);
const modalTitle = ref("Добавление нового преподавателя");
const statusMessage = ref("");

const teacherName = ref("");
const teacherType = ref<string[]>([]); // множественный выбор
const subjects = ref<string[]>([]); // все возможные предметы

const emit = defineEmits(["teacher-added"]);

const isSubmitting = ref(false);

// Загружаем предметы
const fetchLessons = async () => {
  try {
    const response = await $fetch('/api/lessons');
    subjects.value = response.lessons.map((l: any) => l.name);
  } catch (error) {
    console.error('Ошибка при получении предметов:', error);
  }
};

// Загружаем предметы при открытии модального окна
watch(showTeacherModal, (visible) => {
  if (visible) {
    fetchLessons();
    teacherName.value = "";
    teacherType.value = [];
    statusMessage.value = "";
  }
});

const submitTeacher = async () => {
  if (!teacherName.value.trim()) {
    statusMessage.value = "Имя преподавателя не может быть пустым";
    return;
  }

  if (teacherType.value.length === 0) {
    statusMessage.value = "Выберите хотя бы один предмет";
    return;
  }

  isSubmitting.value = true;
  try {
    statusMessage.value = 'Идёт добавление преподавателя...';

    const response = await $fetch("/api/teacher", {
      method: "POST",
      body: {
        name: teacherName.value.trim(),
        lessonTypes: teacherType.value,
      },
    });

    if (!response.success) {
      statusMessage.value = response.message || "Ошибка при добавлении";
      return;
    }

    statusMessage.value = "Преподаватель успешно добавлен!";
    emit("teacher-added");
    teacherName.value = "";
    teacherType.value = [];

    setTimeout(() => {
      showTeacherModal.value = false;
      statusMessage.value = "";
    }, 1000);
  } catch (error: any) {
    statusMessage.value = error?.data?.statusMessage || "Ошибка при добавлении";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <AdminpanelUIMoloButton type="primary" @click="showTeacherModal = true">
    Добавить нового преподавателя
  </AdminpanelUIMoloButton>

  <AdminpanelUIMoloModal
      :statusMessage="statusMessage"
      :title="modalTitle"
      :visible="showTeacherModal"
      @close="showTeacherModal = false"
  >
    <template #body>
      <AdminpanelUIMoloInput
          v-model="teacherName"
          placeholder="Имя преподавателя"
      />
        <section class="select">
          <label class="">Преподаваемые предметы:</label>

          <AdminpanelUIMoloSelect v-model="teacherType" multiple>
            <AdminpanelUIMoloLoader :is-loading="subjects.length === 0" />

            <option v-for="(subject, i) in subjects" :key="i" :value="subject">
              {{ subject }}
            </option>
          </AdminpanelUIMoloSelect>
        </section>
    </template>

    <template #confirm-button>
      <AdminpanelUIMoloButton type="confirm" @click="submitTeacher">
        Подтвердить
      </AdminpanelUIMoloButton>
    </template>

    <template #status>
      {{ statusMessage }}
    </template>

    <template #cancel-button>
      <AdminpanelUIMoloButton type="cancel" @click="showTeacherModal = false">
        Отмена
      </AdminpanelUIMoloButton>
    </template>
  </AdminpanelUIMoloModal>
</template>

<style scoped>
.select {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

</style>