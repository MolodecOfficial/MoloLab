<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  user: Object
});

const userStore = useUserStore();

const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('');
const selectedSpecialty = ref<any | null>(null);
const showSpecialtyModal = ref(false);
const statusMessage = ref('');

const specialties = ref<Array<any>>([]);

const fetchSpecialties = async () => {
  try {
    const response = await $fetch('/api/specialties');
    specialties.value = response.specialties || [];
  } catch (error) {
    console.error("Ошибка при получении списка специальностей:", error);
    statusMessage.value = 'Не удалось загрузить список специальностей.';
  }
};

const openSpecialtyModal = async (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  await fetchSpecialties();
  showSpecialtyModal.value = true;
};

const assignSpecialty = async () => {
  if (selectedUserId.value && selectedSpecialty.value) {
    try {
      statusMessage.value = 'Идёт добавление специальности...';

      await userStore.addSpecialty(selectedUserId.value, selectedSpecialty.value);
      setTimeout(() => showSpecialtyModal.value = false, 1500);
      statusMessage.value = `Специальность успешно добавлена!`;
      await userStore.getUsers();
      setTimeout(() => statusMessage.value = '', 1500);
    } catch (error) {
      console.error('Ошибка при добавлении специальности:', error);
      statusMessage.value = 'Не удалось добавить специальность.';
    }
  } else {
    statusMessage.value = 'Выберите пользователя и специальность.';
  }
};

const specialtyTitle = computed(() => `Добавление специальности пользователю ${selectedUserName.value}`);

onMounted(() =>{
  fetchSpecialties()
})
</script>
<template>
  <AdminpanelUIMoloButton
    type="specialty"
    @click="openSpecialtyModal(user)"
  >
    Выбор специальности
  </AdminpanelUIMoloButton>
  <AdminpanelUIMoloModal
    :statusMessage="statusMessage"
    :title="specialtyTitle"
    :visible="showSpecialtyModal"
    @close="showSpecialtyModal = false"
    >
    <template #select>
      <AdminpanelUIMoloSelect v-model="selectedSpecialty">
        <option value="" disabled>Выберите специальность</option>
        <option
            v-for="specialty in specialties"
            :value="specialty"
            :key="specialty._id"
        >
          {{ specialty.name }}
        </option>
      </AdminpanelUIMoloSelect>
    </template>
    <template #confirm-button>
      <AdminpanelUIMoloButton
          type="confirm"
          @click="assignSpecialty"
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
          @click="showSpecialtyModal = false"
      >
        Отмена
      </AdminpanelUIMoloButton>
    </template>

  </AdminpanelUIMoloModal>
</template>

<style scoped>

</style>