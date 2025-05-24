<script setup lang="ts">

const containerRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  messages: Array<{
    _id?: string;
    text?: string;
    senderId?: string;
    receiverId?: string;
    timestamp?: Date | string;
  }>,
  currentUser: {
    _id: string;
  },
  isLoading: boolean
}>();

const formatDate = (date?: Date | string) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatTime = (date?: Date | string) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getDateString = (date?: Date | string) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toDateString();
};

</script>

<template>
  <div class="message-list" ref="containerRef">
    <section class="load">
      <AdminpanelMoloLoader :is-loading="isLoading"/>
    </section>

    <template v-for="(message, index) in messages" :key="message?._id || index">
      <div v-if="index === 0 || getDateString(messages[index - 1]?.timestamp) !== getDateString(message.timestamp)"
           class="date-separator">
        <span>
          {{ formatDate(message.timestamp) }}
        </span>

      </div>

      <div :class="['message', { 'own': message?.senderId === currentUser?._id }]">
        <div v-if="message" class="message-content">
          <div class="sender-name">{{ message.senderName || 'Неизвестный' }}</div>
          {{ message.text }}
          <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>


.date-separator {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 20px 0 10px;
  font-weight: 600;
  color: var(--dk-border-color, #999);
  font-size: 0.9rem;
  & span {
    color: var(--dk-span-color);
    border: 1px solid var(--dk-border-color);
    padding: 5px 10px;
    border-radius: 20px;
    background-color: var(--dk-bg-ins-color);
  }
}

.message-list {
  height: 580px;
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--dk-bg-color);
  border-radius: 10px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 10px;

  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--dk-border-color);
    border-radius: 20px;
    border: 4px solid transparent;
  }
}
.message {
  display: flex;
  text-align: start;
  margin: 0.5rem 0;
  padding: 10px 45px 12px 10px;
  border-radius: 12px;
  max-width: max-content;
  background-color: var(--dk-bg-ins-color);
  box-shadow: ;
}

.sender-name {
  font-size: 9px;
}

.message.own {
  margin-left: auto;
  display: flex;
  text-align: start;
  background-color: var(--dk-bg-ins-light-color);
}

.message-content {
  position: relative;
}

.timestamp {
  position: absolute;
  bottom: -9px;
  right: -35px;
  font-size: 0.6rem;
  color: #666;
}

.load {
  position: absolute;
  display: none;
}
</style>