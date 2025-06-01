<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useUserStore} from '~/stores/userStore';


useHead({
  title: 'УГНТУ | Список пользователей'
})

const userStore = useUserStore();

const searchQuery = ref('');
const loading = ref(true);


async function getAllUsers() {
  try {
    await userStore.getUsers();
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  } finally {
    loading.value = false;
  }
}

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return userStore.users;
  }

  return userStore.users.filter((user: any) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.value.toLowerCase());
  });
});


// Метод для получения всех пользователей
onMounted(async () => {
  await getAllUsers();
});

</script>

<template>
  <AccountMoloGuard>
    <AdminpanelPatternsMoloAdmin header_text="Список пользователей">
      <template #more-info>
        <div class="test">
          <AdminpanelMoloInput
              v-model="searchQuery"
              width="100%"
              placeholder="Введите имя пользователя"/>
        </div>

      </template>
    <div class="bg">
        <AdminpanelMoloUserList
            :users="filteredUsers"
            :loading="loading"

        />
    </div>
    </AdminpanelPatternsMoloAdmin>
  </AccountMoloGuard>
</template>


<style scoped>
.test {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>