<script setup lang="ts">

import {ref} from "vue";

const userStore = useUserStore()
const searchQuery = ref('');

useHead({
  title: 'MoloLab | Мессенджер'
})

const router = useRouter();
onMounted(async () => {
  if (process.client) {
    try {
      await userStore.getUsers();
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  }
});

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return userStore.users;
  }

  return userStore.users.filter((user: any) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.value.toLowerCase());
  });
});



</script>

<template>
  <AccountMoloGuard>
    <AdminpanelPatternsMoloAdmin header_text="Мессенджер">
      <template #more-info>
        <div>
          <AdminpanelUIMoloInput
              v-model="searchQuery"
              width="100%"
              placeholder="Введите имя пользователя"/>
        </div>
      </template>
      <AdminpanelFeaturesMoloAllChatUsers :users="filteredUsers"/>
    </AdminpanelPatternsMoloAdmin>
  </AccountMoloGuard>
</template>

<style scoped>



</style>