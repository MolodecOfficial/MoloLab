<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  user: Object
})

const userStore = useUserStore()

const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('');
const selectedSpecialty = ref<string | null>(null);
const showSpecialtyModal = ref(false);
const statusMessage = ref('')

const openSpecialtyModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  showSpecialtyModal.value = true;
};

const assignSpecialty = async () => {
  if (selectedUserId.value && selectedSpecialty.value) {
    try {
      await userStore.addSpecialty(selectedUserId.value, selectedSpecialty.value);
      setTimeout(() => showSpecialtyModal.value = false, 1500)
      statusMessage.value = `Специальность успешно добавлена!`
      await userStore.getUsers()
      setTimeout(() => statusMessage.value = '', 1500)
    } catch (error) {
      console.error('Ошибка при добавлении специальности:', error);
      statusMessage.value = 'Не удалось добавить специальность.'
    }
  } else {
    statusMessage.value = 'Выберите пользователя и специальность.'
  }
};

const specialtyTitle = computed(() => `Добавление специальности пользователю ${selectedUserName.value}`)
</script>

<template>
  <AdminpanelMoloButton
    type="specialty"
    @click="openSpecialtyModal(user)"
  >
    Выбор специальности
  </AdminpanelMoloButton>
  <AdminpanelMoloModal
    :statusMessage="statusMessage"
    :title="specialtyTitle"
    :visible="showSpecialtyModal"
    @close="showSpecialtyModal = false"
    >
    <template #select>
      <AdminpanelMoloSelect
        v-model="selectedSpecialty"
      >
        <option value="" disabled>Выберите специальность</option>
        <option v-for="specialty in specialtyList" :value="specialty.specialty_name" :key="specialty.id">
          {{ specialty.specialty_name }}
        </option>
      </AdminpanelMoloSelect>
    </template>
    <template #confirm-button>
      <AdminpanelMoloButton
          type="confirm"
          @click="assignSpecialty"
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
          @click="showSpecialtyModal = false"
      >
        Отмена
      </AdminpanelMoloButton>
    </template>

  </AdminpanelMoloModal>
</template>

<style scoped>

</style>