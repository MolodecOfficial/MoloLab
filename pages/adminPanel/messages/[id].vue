<script lang="ts" setup>
import { useMessageStore } from '~/stores/messageStore';
import { useRoute } from 'vue-router';
import { computed, nextTick, ref, watch, onBeforeUnmount } from 'vue';


const emit = defineEmits(['send']);
const messageText = ref('');
const userStore = useUserStore();
const messageStore = useMessageStore();
const route = useRoute();
const searchQuery = ref('');

const userId = computed(() => route.params.id as string);
const currentUser = computed(() => userStore.currentUser);

let pollingInterval: ReturnType<typeof setInterval> | null = null;

const startPolling = () => {
  if (pollingInterval) return;
  pollingInterval = setInterval(async () => {
    if (userStore.userId && userId.value) {
      await messageStore.fetchMessages(userId.value);
    }
  }, 2000); // плавнее 400 мс
};

const stopPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
};

const scrollToBottom = () => {
  const el = document.querySelector('.message-list') as HTMLElement;
  if (el) el.scrollTop = el.scrollHeight;
};

const sendMessage = async () => {
  if (!messageText.value.trim()) return;
  const response = await messageStore.sendMessage(userId.value, messageText.value);
  messageText.value = '';

  if (response.success) {
    await nextTick(scrollToBottom);
  }
};

const filteredUsers = computed(() => {
  if (!searchQuery.value) return userStore.users;
  return userStore.users.filter((user: any) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.value.toLowerCase());
  });
});

const chatUser = computed(() => {
  if (userId.value === userStore.userId) {
    return { firstName: 'Избранное', lastName: '' };
  }
  return userStore.users.find(user => user._id === userId.value) || { firstName: '...', lastName: '' };
});

watch(userId, async (newId) => {
  if (!newId) return;

  stopPolling();
  messageStore.currentChatId = newId;

  try {
    if (!userStore.users.length) await userStore.getUsers();
    if (!userStore.userId) return;
    await messageStore.fetchMessages(newId);
    await nextTick(scrollToBottom);
    startPolling();
  } catch (err) {
    console.error('Ошибка загрузки сообщений:', err);
  }
}, { immediate: true });

onBeforeUnmount(stopPolling);

watch(
    () => messageStore.messages,
    async () => {
      await nextTick();
      scrollToBottom();
    },
    { deep: true }
);

useHead({
  title: computed(() =>
      userId.value === userStore.userId
          ? 'УГНТУ | Чат с Вашими секретами'
          : `УГНТУ | Чат с ${chatUser.value?.firstName || '...'} ${chatUser.value?.lastName || ''}`
  ),
});


</script>

<template>
  <AccountMoloGuard>
    <AdminpanelPatternsMoloAdmin :header_text="`${chatUser.firstName} ${chatUser.lastName}`">
      <div class="container">
        <AdminpanelFeaturesMoloAllChatUsers :users="filteredUsers" />
        <div class="messages">
          <AdminpanelMoloMessageList
              :messages="messageStore.messages"
              :current-user="currentUser"
              :is-loading="messageStore.isLoading"
          />
          <AdminpanelUIMoloInput
              v-model="messageText"
              borderRadius="10px"
              height="10%"
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
  padding: 20px;
}

.messages {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  position: relative;
}

@media (max-width: 765px) {
  .container {
    display: flex;
    flex-direction: column;
  }
}

</style>