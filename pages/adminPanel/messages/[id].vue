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

const userId = computed(() => route.params.id as string);
const currentUser = computed(() => userStore.currentUser)

const chatUser = computed(() => {
  return userStore.users.find(user => user._id === userId.value) ||
      ({ firstName: 'Загрузка...', lastName: '' } as any);
});

watch(userId, async (newId) => {
  if (newId) {
    try {
      await userStore.getUsers();
      await messageStore.fetchMessages(newId);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  }
}, { immediate: true });

const sendMessage = async () => {
  if (!messageText.value.trim()) return;
  if (!currentUser.value?._id) {
    console.error('Текущий пользователь не авторизован');
    return;
  }
  try {
    const newMessage = {
      text: messageText.value,
      senderId: currentUser.value._id, // Используем ID текущего пользователя
      receiverId: userId.value,
      timestamp: new Date()
    };

    // Отправляем на сервер
    const response = await messageStore.sendMessage(userId.value, newMessage.text);

    // Добавляем в userStore (даже если сервер не ответил)
    userStore.addMessage({
      ...newMessage,
      _id: response?.message?._id || Math.random().toString() // Генерируем временный ID, если нужно
    });

    messageText.value = '';
  } catch (error) {
    console.error('Ошибка при отправке:', error);
  }
};

useHead({
  title: computed(() => {
    return `УГНТУ | Чат с ${chatUser.value?.firstName || '...'} ${chatUser.value?.lastName || ''}`;
  }),
});

</script>

<template>
  <AccountMoloGuard>
    <AdminpanelPatternsMoloAdmin :header_text="`${chatUser.firstName} ${chatUser.lastName}`">
      <div class="container">
        <AdminpanelActionsMoloAllChatUsers />
        <div class="messages">
          <AdminpanelMoloMessageList :messages="messageStore.messages" />
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
  gap: 10px;
  position: relative;
}
</style>