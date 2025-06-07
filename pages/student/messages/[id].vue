<script lang="ts" setup>
import { useMessageStore } from '~/stores/messageStore';
import { useUserStore } from '~/stores/userStore';
import { useRoute } from 'vue-router';
import { computed, nextTick, ref, watch, onBeforeUnmount } from 'vue';

const showEmojiPicker = ref(false);

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
    nextTick(scrollToBottom);
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
    nextTick(scrollToBottom);
    startPolling();
  } catch (err) {
    console.error('Ошибка загрузки сообщений:', err);
  }
}, { immediate: true });

onBeforeUnmount(stopPolling);

useHead({
  title: computed(() =>
      userId.value === userStore.userId
          ? 'УГНТУ | Чат с Вашими секретами'
          : `УГНТУ | Чат с ${chatUser.value?.firstName || '...'} ${chatUser.value?.lastName || ''}`
  ),
});


</script>

<template>
  <AccountMoloMobile :title="chatUser.firstName">
    <div class="container">
      <AccountMoloAllChatUsers :users="filteredUsers" />
      <div class="messages">
        <AccountMoloMessageList
            :messages="messageStore.messages"
            :current-user="currentUser"
            :is-loading="messageStore.isLoading"
        />
        <AdminpanelMoloInput
            v-model="messageText"
            borderRadius="10px"
            height="10%"
            placeholder="Введите сообщение"
            width="100%"
            background-color="white"
            color="black"
            @send="sendMessage"
        />
      </div>
    </div>
  </AccountMoloMobile>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding-bottom: 100px;
  justify-content: center;
  align-items: center;
}

.messages {
  display: flex;
  flex-direction: column;
  width: 90%;
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