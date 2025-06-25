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
  <AccountPatternsMoloAccount header="Мессенджер">
    <div class="chat-area">
      <AccountMoloAllChatUsersRML :users="filteredUsers"/>
    </div>
  </AccountPatternsMoloAccount>
</template>

<style scoped>

.chat-area {
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: center;
}

</style>