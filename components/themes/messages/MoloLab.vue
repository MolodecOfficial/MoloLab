<script setup lang="ts">
import { useMessageStore } from '~/stores/messageStore';
import { useRoute } from 'vue-router';
import { computed, ref, watch, onBeforeUnmount } from 'vue';

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
  }, 2000);
};

const stopPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
};

const sendMessage = async (messageText: string) => {
  if (!messageText.trim()) return;
  await messageStore.sendMessage(userId.value, messageText);
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
    startPolling();
  } catch (err) {
    console.error('Ошибка загрузки сообщений:', err);
  }
}, { immediate: true });

onBeforeUnmount(stopPolling);

useHead({
  title: computed(() =>
      userId.value === userStore.userId
          ? 'MoloLab | Чат с избранным'
          : `MoloLab | Чат с ${chatUser.value?.firstName || '...'} ${chatUser.value?.lastName || ''}`
  ),
});
</script>

<template>
  <AccountPatternsMoloLab>
    <div class="messenger-container">
      <div class="users-sidebar">
        <AccountMoloAllChatUsersML :users="filteredUsers" />
      </div>
    </div>
  </AccountPatternsMoloLab>
</template>

<style>
.messenger-container {
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 15px;
  display: flex;
  height: calc(100vh - 120px);
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  background: rgba(32, 32, 35, 0.7);
  backdrop-filter: blur(12px);
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.users-sidebar {
  width: 300px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .messenger-container {
    flex-direction: column;
    height: auto;
    min-height: calc(100vh - 120px);
  }

  .users-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    height: 500px;
  }

}


</style>