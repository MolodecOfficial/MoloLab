<script lang="ts" setup>

import {ref} from "vue";
import {useUserStore} from "~/stores/userStore";

const props = defineProps({
  user: Object,
})

const loading = ref(true)
const userStore = useUserStore()
const showDeleteModal = ref(false)
const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('');
const statusMessage = ref('')


async function deleteUser(userId: any) {
  if (!userId) {
    console.error('Идентификатор пользователя не определен');
    return;
  }
  const user = userStore.users.find((u: any) => u._id === userId);
  if (user?.status === 'Владелец') {
    statusMessage.value = 'Данного пользователя нельзя удалить.';
    return;
  }
  try {
    statusMessage.value = 'Удаляю пользователя...';

    await userStore.deleteUser(userId);
    statusMessage.value = 'Пользователь успешно удалён!';
    setTimeout(async () => {
      showDeleteModal.value = false;
      await getAllUsers();
    }, 1500);
  } catch (error) {
    statusMessage.value = 'Произошла ошибка при удалении'
    console.error('Ошибка при удалении пользователя:', error);
  }
}

const openDeleteModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`; // Исправлено
  showDeleteModal.value = true;
};

const deleteTitle = computed(() => `Удалить пользователя ${selectedUserName.value}?`);


async function getAllUsers() {
  const userStore = useUserStore();
  try {
    await userStore.getUsers();
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  }
}

onMounted(() => {
  getAllUsers()
})

</script>

<template>
  <AdminpanelMoloButton
      v-if="user.email !== 'MolodecOfficial'"
      class="delete-button"
      type="delete"
      @click="() => openDeleteModal(user)">
    Удалить
  </AdminpanelMoloButton>
  <AdminpanelMoloButton v-else type="delete">
    Запрещено
  </AdminpanelMoloButton>

  <AdminpanelUIMoloModal
      :statusMessage="statusMessage"
      :title="deleteTitle"
      :visible="showDeleteModal"
      @close="showDeleteModal = false"
  >
    <template #confirm-button>
      <AdminpanelMoloButton
          type="confirm"
          @click="deleteUser(selectedUserId)"
      >
        Подтвердить
      </AdminpanelMoloButton>
    </template>

    <template #status>
      <span>{{ statusMessage }}</span>
    </template>

    <template #cancel-button>
      <AdminpanelMoloButton
          type="cancel"
          @click="showDeleteModal = false"
      >
        Отмена
      </AdminpanelMoloButton>
    </template>
  </AdminpanelUIMoloModal>
</template>

<style scoped>

</style>