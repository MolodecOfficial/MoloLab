<script setup lang="ts">
const openModal = ref(false);
const modalTitle = 'Создание новой группы'
const groupName: any = ref('');
const statusMessage = ref('');
const isSubmitting = ref(false);

const emit = defineEmits<{
  (e: 'saved'): void
}>();




const submitGroup = async () => {
  if (!groupName.value.trim()) {
    statusMessage.value = 'Название группы не может быть пустым';
    return;
  }

  isSubmitting.value = true;
  try {
    statusMessage.value = 'Идёт создание группы...';

    const response: any = await $fetch('/api/groups', {
      method: 'POST',
      body: {
        name: groupName.value.trim(),
      },
    });

    if (!response.success) {
      statusMessage.value = response.message;
      return;
    }

    statusMessage.value = 'Группа успешно добавлена!';
    emit('saved');
    window.dispatchEvent(new Event('group-created'));
    groupName.value = '';

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

onMounted(() => {
})
</script>

<template>
  <section class="add">
    <AdminpanelMoloButton @click="openModal = true">
      Новая группа
    </AdminpanelMoloButton>

    <AdminpanelMoloModal
        :visible="openModal"
        :title="modalTitle"
        :statusMessage="statusMessage"
        @close="openModal = false"
    >
      <template #body>
        <AdminpanelMoloInput
            v-model="groupName"
            placeholder="Название группы"
        />
      </template>

      <template #status>
        {{ statusMessage }}
      </template>

      <template #confirm-button>
        <AdminpanelMoloButton type="confirm" @click="submitGroup" :disabled="isSubmitting">
          Подтвердить
        </AdminpanelMoloButton>
      </template>

      <template #cancel-button>
        <AdminpanelMoloButton type="cancel" @click="openModal = false">
          Отмена
        </AdminpanelMoloButton>
      </template>
    </AdminpanelMoloModal>
  </section>
</template>