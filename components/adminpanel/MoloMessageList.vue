<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';

const userStore = useUserStore();

const props = defineProps<{
  messages: Array<{
    _id?: string;
    text?: string;
    senderId?: string;
    receiverId?: string;
    timestamp?: Date;
  }>
}>();

const formatDate = (date?: Date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>

<template>
  <div class="message-list">
    <div
        v-for="message in messages"
        :key="message?._id"
        :class="['message', { 'own': message?.senderId === currentUser?._id }]"
    >
    <div v-if="message" class="message-content">
      {{ message.text }}
      <span class="timestamp">{{ formatDate(message.timestamp) }}</span>
    </div>
  </div>
  </div>
</template>

<style scoped>
.message-list {
  height: 600px;
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--dk-bg-color);
  border-radius: 10px;

}

.message {
  margin: 0.5rem 0;
  padding: 0.8rem;
  border-radius: 12px;
  max-width: 70%;
}

.message.own {
  margin-left: auto;
  background: #dcf8c6;
}

.message-content {
  position: relative;
}

.timestamp {
  position: absolute;
  bottom: -20px;
  right: 0;
  font-size: 0.7rem;
  color: #666;
}
</style>