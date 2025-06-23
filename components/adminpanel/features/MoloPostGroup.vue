<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

const props = defineProps({
  user: Object
});
const userStore = useUserStore();
const groups = ref<Array<any>>([]);
const statusMessage = ref('');
const showGroupsModal = ref(false);
const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('');
const selectedGroup: any = ref<string | null>(null);  // выбранная группа

const openGroupsModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  selectedGroup.value = null;
  showGroupsModal.value = true;
};



const fetchGroups = async () => {
  try {
    const response = await $fetch('/api/groups');
    groups.value = response.groups || [];
  } catch (error) {
    console.error("Ошибка при получении списка групп:", error);
    statusMessage.value = 'Не удалось загрузить список групп.';
  }
};

const assignGroup = async () => {
  if (selectedUserId.value && selectedGroup.value) {
    try {
      statusMessage.value = 'Идёт добавление группы...';

      await userStore.addGroup(selectedUserId.value, selectedGroup.value);
      setTimeout(() => showGroupsModal.value = false, 1500);
      statusMessage.value = `Группа успешно добавлена!`;
      await userStore.getUsers();
      setTimeout(() => statusMessage.value = '', 1500);
    } catch (error) {
      console.error('Ошибка при добавлении группы:', error);
      statusMessage.value = 'Не удалось добавить группу.';
    }
  } else {
    statusMessage.value = 'Выберите пользователя и группу.';
  }
};

const modalTitle = computed(() => `Определение группы для пользователя ${selectedUserName.value}`);


onMounted(() => {
  fetchGroups()

  window.addEventListener('group-created', fetchGroups);
})

onBeforeUnmount(() => {
  window.removeEventListener('group-created', fetchGroups);
});
</script>

<template>
  <AdminpanelUIMoloButton
      type="group"
      @click="() => openGroupsModal(user)">
    Выбор группы
  </AdminpanelUIMoloButton>

  <AdminpanelUIMoloModal
      :title="modalTitle"
      :visible="showGroupsModal"
  >
    <template #body>
      <AdminpanelUIMoloSelect
          class="select"
          v-model="selectedGroup"
      >
        <option value="" disabled>Выберите группу</option>
        <option v-for="group in groups" :value="group._id" :key="group._id">
          {{ group.name }}
        </option>
      </AdminpanelUIMoloSelect>
    </template>

    <template #confirm-button>
      <AdminpanelUIMoloButton
        type="confirm"
        @click="assignGroup"
        >
        Подтвердить
      </AdminpanelUIMoloButton>
    </template>

    <template #status>
      {{ statusMessage }}
    </template>
    <template #cancel-button>
      <AdminpanelUIMoloButton
          type="cancel"
          @click="showGroupsModal = false"
      >
        Отмена
      </AdminpanelUIMoloButton>
    </template>
  </AdminpanelUIMoloModal>
</template>