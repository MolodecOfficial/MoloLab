<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useUserStore} from "~/stores/userStore";

const props = defineProps({
  user: Object,
})

const userStore = useUserStore()

const achievements = ref<any[]>([]); // Список достижений
const selectedUserId = ref<string | null>(null);
const selectedUserName = ref('');
const selectedAchievement = ref<string | null>(null);
const showAchievementModal = ref(false);
const statusMessage = ref('')


const openAchievementModal = (user: any) => {
  selectedUserId.value = user._id;
  selectedUserName.value = `${user.firstName} ${user.lastName}`;
  showAchievementModal.value = true;
};

async function getAllAchievements() {
  achievements.value = userStore.achievements; // Берем достижения из хранилища
}

const giveAchievementToUser = async () => {
  if (selectedUserId.value && selectedAchievement.value) {
    try {
      statusMessage.value = 'Идёт выдача достижения...';
      await userStore.giveAchievement(selectedUserId.value, selectedAchievement.value);
      setTimeout(() => showAchievementModal.value = false, 1500)
      statusMessage.value = 'Достижение успешно выдано!'
      await userStore.getUsers()
      setTimeout(() => statusMessage.value = '', 1500)

    } catch (error) {
    } if (selectedUserId.value.includes(selectedAchievement.value)) {
      statusMessage.value = 'Данное достижение уже выдано'
    }
  } else {
    statusMessage.value = 'Выберите пользователя и достижение.'
  }
};

const achievementTitle = computed(() => `Выдача достижения для пользователя ${selectedUserName.value}`);

onMounted(async () => {
  await userStore.getUsers();
  await getAllAchievements();
})


</script>

<template>
  <AdminpanelMoloButton
      class="delete-button"
      type="achievement"
      @click="() => openAchievementModal(user)">
    Выдать достижение
  </AdminpanelMoloButton>
  <AdminpanelUIMoloModal
      :statusMessage="statusMessage"
      :title="achievementTitle"
      :visible="showAchievementModal"
      @close="showAchievementModal = false"
  >
    <template #select>
      <AdminpanelMoloSelect
          v-model="selectedAchievement"
          class="select"
          v-if="achievements.length > 0"
      >
        <option value="" disabled>Выберите достижение</option>
        <option v-for="achievement in achievements" :value="achievement.id" :key="achievement.id">
          {{ achievement.title }}
        </option>
      </AdminpanelMoloSelect>
      <p v-else>Нет доступных достижений.</p>
    </template>

    <template #confirm-button>
      <AdminpanelMoloButton
          type="confirm"
          @click="giveAchievementToUser"
          :disabled="!selectedUserId || !selectedAchievement"
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
          @click="showAchievementModal = false"
      >
        Отмена
      </AdminpanelMoloButton>
    </template>
  </AdminpanelUIMoloModal>
</template>

<style scoped>

</style>