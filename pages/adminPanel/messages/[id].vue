<script lang="ts" setup>
import { useMessageStore } from '~/stores/messageStore';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '~/stores/userStore';

const emit = defineEmits(['send']);
const messageText = ref('');
const userStore = useUserStore();
const messageStore = useMessageStore();
const route = useRoute();
const searchQuery = ref('');
const userId = computed(() => route.params.id as string);
const currentUser = computed(() => userStore.currentUser)

const chatUser = computed(() => {
  if (userId.value === userStore.userId) {
    return { firstName: 'Избранное', lastName: '' };
  }
  return userStore.users.find(user => user._id === userId.value) ||
      ({ firstName: 'Загрузка...', lastName: '' } as any);
});

const sendMessage = async () => {
  if (!messageText.value.trim()) return;
  if (!currentUser.value?._id) {
    console.error('Текущий пользователь не авторизован');
    return;
  }

  try {
    const response = await messageStore.sendMessage(userId.value, messageText.value);
    messageText.value = '';

    if (!response.success) {
      console.error('Ошибка при отправке сообщения:', response.error || 'Неизвестная ошибка');
    }

  } catch (error) {
    console.error('Ошибка при отправке:', error);
  }
};

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return userStore.users;
  }

  return userStore.users.filter((user: any) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.value.toLowerCase());
  });
});

onMounted(async () => {
  await userStore.initUserStore(); // <-- это обеспечит userId, currentUser и users
});

watch(userId, async (newId) => {
  if (!newId) return;

  try {
    // Загружаем пользователей (если вдруг нет)
    if (!userStore.users.length) {
      await userStore.getUsers();
    }

    if (!userStore.userId) {
      console.error("userId не определён даже после getUsers()");
      return;
    }


    await messageStore.fetchMessages(newId);

  } catch (error) {
    console.error('Ошибка загрузки сообщений:', error);
  }
}, { immediate: true });



useHead({
  title: computed(() => {
    if (userId.value === userStore.userId) {
      return `УГНТУ | Чат с Вашими секретами`;
    }
    return `УГНТУ | Чат с ${chatUser.value?.firstName || '...'} ${chatUser.value?.lastName || ''}`;
  }),
});



</script>

<template>
  <AccountMoloGuard>
    <AdminpanelPatternsMoloAdmin :header_text="`${chatUser.firstName} ${chatUser.lastName}`">
      <div class="container">
        <AdminpanelActionsMoloAllChatUsers :users="filteredUsers"/>
        <div class="messages">
          <AdminpanelMoloMessageList
              :messages="messageStore.messages"
              :current-user="currentUser"
              :is-loading="messageStore.isLoading"
          />
          <AdminpanelMoloInput
              v-model="messageText"
              borderRadius="10px"
              height="8%"
              placeholder="Введите сообщение"
              width="100%"
              @send="sendMessage"
          />
        </div>
      </div>
    </AdminpanelPatternsMoloAdmin>
  </AccountMoloGuard>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  box-sizing: border-box;
}

.messages {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  position: relative;
}
</style>