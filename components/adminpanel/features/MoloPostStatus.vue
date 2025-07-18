<script lang="ts" setup>

import {ref} from "vue";

const props = defineProps({
  user: Object,
})

const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('');
const selectedStatus = ref<string | null>(null);
const showStatusModal = ref(false);
const statusMessage = ref('')

const userStore = useUserStore()

const openStatusModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  selectedStatus.value = user.status;
  showStatusModal.value = true;
};

const changeUserStatus = async () => {
  if (selectedUserId.value && selectedStatus.value) {
    try {
      statusMessage.value = 'Идёт обновление статуса...';

      console.log(selectedUserId.value, selectedUserName.value)
      await userStore.changeStatus(selectedUserId.value, selectedStatus.value);
      setTimeout(() => showStatusModal.value = false, 1500)
      statusMessage.value = 'Статус пользователя успешно изменен!'
      await userStore.getUsers();
      setTimeout(() => statusMessage.value = '', 1500)
    } catch (error) {
      console.error('Ошибка при изменении статуса:', error);
      statusMessage.value = 'Не удалось изменить статус пользователя.'
    }
  } else {
    statusMessage.value = 'Выберите пользователя и новый статус.'
  }
};

const changeTitle = computed(() => `Изменение статуса для пользователя ${selectedUserName.value}`);


async function getAllUsers() {
  const userStore = useUserStore();
  try {
    await userStore.getUsers();
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  }
}

onMounted(async () => {
  await getAllUsers()
})

</script>

<template>
  <AdminpanelUIMoloButton
      v-if="user.email !== 'MolodecOfficial'"
      class="delete-button"
      type="status"
      @click="() => openStatusModal(user)">
    Сменить статус
  </AdminpanelUIMoloButton>
  <AdminpanelUIMoloButton v-else type="status">
    Запрещено
  </AdminpanelUIMoloButton>
  <AdminpanelUIMoloModal
      :statusMessage="statusMessage"
      :title="changeTitle"
      :visible="showStatusModal"
      @close="showStatusModal = false"
  >
    <template #select>
      <AdminpanelUIMoloSelect v-model="selectedStatus" class="select">
        <option value="" disabled>Выберите статус</option>
        <option value="Студент">Студент</option>
        <option value="Преподаватель">Преподаватель</option>
        <option value="Администратор">Администратор</option>
      </AdminpanelUIMoloSelect>
    </template>
    <template #confirm-button>
      <AdminpanelUIMoloButton
          type="confirm"
          @click="changeUserStatus"
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
          @click="showStatusModal = false"
      >
        Отмена
      </AdminpanelUIMoloButton>
    </template>

  </AdminpanelUIMoloModal>
</template>

<style scoped>

</style>