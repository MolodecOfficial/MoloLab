<script lang="ts" setup>
import {useMessageStore} from '~/stores/messageStore';
import {useUserStore} from '~/stores/userStore';
import {useRoute} from 'vue-router';
import {computed, nextTick, onBeforeMount, onBeforeUnmount, ref, watch} from 'vue';


const emit = defineEmits(['send']);
const messageText = ref('');
const userStore = useUserStore();
const messageStore = useMessageStore();
const route = useRoute();
const searchQuery = ref('');
const isHydrated = ref(false);
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
    return {firstName: 'Избранное', lastName: ''};
  }
  return userStore.users.find(user => user._id === userId.value) || {firstName: '...', lastName: ''};
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
}, {immediate: true});

onBeforeUnmount(stopPolling);

watch(
    () => messageStore.messages,
    async () => {
      await nextTick();
      scrollToBottom();
    },
    {deep: true}
);

useHead({
  title: computed(() =>
      userId.value === userStore.userId
          ? 'УГНТУ | Чат с Вашими секретами'
          : `УГНТУ | Чат с ${chatUser.value?.firstName || '...'} ${chatUser.value?.lastName || ''}`
  ),
});

const themeStore = useThemeStore();

onBeforeMount(() => {
  if (process.client) {
    themeStore.initTheme();
    isHydrated.value = true;
  }
});

</script>

<template>
  <section v-if="isHydrated">
    <AccountMoloMobile :title="chatUser.firstName + ' ' + chatUser.lastName" v-if="themeStore.currentTheme === 'rusoil'">
      <div class="container">
        <section v-if="isHydrated">
          <AccountMoloAllChatUsers
              v-if="themeStore.currentTheme === 'rusoil'"
              :users="filteredUsers"
          />
        </section>
        <div class="messages">
          <AccountMoloMessageList
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
              background-color="white"
              color="black"
              @send="sendMessage"
          />
        </div>
      </div>
    </AccountMoloMobile>
    <AccountPatternsMoloAccount :header="chatUser.firstName + ' ' + chatUser.lastName" v-else-if="themeStore.currentTheme === 'rusml'">
      <div class="container">
        <section v-if="isHydrated">
          <AccountMoloAllChatUsersRML
              v-if="themeStore.currentTheme === 'rusml'"
              :users="filteredUsers"
          />
        </section>
        <div class="messages">
          <AccountMoloMessageList
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
              background-color="white"
              color="black"
              @send="sendMessage"
          />
        </div>
      </div>
    </AccountPatternsMoloAccount>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
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