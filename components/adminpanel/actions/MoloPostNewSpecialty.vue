<script setup lang="ts">
const openModal = ref(false);
const modalTitle = 'Создание новой специальности';
const statusMessage = ref('');

const specialtyForm = ref({
  name: '',
  direction: '',
  code: '',
  faculty: '',
});

const isSubmitting = ref(false);

const resetForm = () => {
  specialtyForm.value = {
    name: '',
    direction: '',
    code: '',
    faculty: '',
  };
};

const submitSpecialty = async () => {
  const fields = Object.entries(specialtyForm.value);
  for (const [key, value] of fields) {
    if (!value.trim()) {
      statusMessage.value = `Поле "${key}" не может быть пустым`;
      return;
    }
  }

  isSubmitting.value = true;
  try {
    statusMessage.value = 'Идёт создание специальности...';

    const response = await $fetch('/api/specialties', {
      method: 'POST',
      body: { ...specialtyForm.value },
    });

    if (!response.success) {
      statusMessage.value = response.message;
      return;
    }

    statusMessage.value = 'Специальность успешно добавлена!';
    resetForm();

    setTimeout(() => {
      openModal.value = false;
      statusMessage.value = '';
    }, 1000);
  } catch (error: any) {
    statusMessage.value = error?.data?.statusMessage || 'Ошибка при добавлении';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section class="add">
    <AdminpanelMoloButton @click="openModal = true">
      Новая специальность
    </AdminpanelMoloButton>

    <AdminpanelMoloModal
        :visible="openModal"
        :title="modalTitle"
        :statusMessage="statusMessage"
        @close="openModal = false"
    >
      <template #body>
        <AdminpanelMoloInput v-model="specialtyForm.name" placeholder="Название специальности" />
        <AdminpanelMoloInput v-model="specialtyForm.direction" placeholder="Направление" />
        <AdminpanelMoloInput v-model="specialtyForm.code" placeholder="Код специальности" />
        <AdminpanelMoloInput v-model="specialtyForm.faculty" placeholder="Факультет" />
      </template>

      <template #confirm-button>
        <AdminpanelMoloButton type="confirm" @click="submitSpecialty" :disabled="isSubmitting">
          Подтвердить
        </AdminpanelMoloButton>
      </template>

      <template #status>
        {{ statusMessage }}
      </template>

      <template #cancel-button>
        <AdminpanelMoloButton type="cancel" @click="openModal = false">
          Отмена
        </AdminpanelMoloButton>
      </template>
    </AdminpanelMoloModal>
  </section>
</template>