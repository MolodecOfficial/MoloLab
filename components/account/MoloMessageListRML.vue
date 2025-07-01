<script setup lang="ts">

import {ref} from "vue";

const containerRef = ref<HTMLElement | null>(null);
const showTopButton = ref(false);
const showBottomButton = ref(false);

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

const scrollToTop = () => {
  if (containerRef.value) {
    containerRef.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

const scrollToBottom = () => {
  if (containerRef.value) {
    containerRef.value.scrollTo({
      top: containerRef.value.scrollHeight,
      behavior: 'smooth'
    });
  }
};

const checkScrollPosition = () => {
  if (!containerRef.value) return;

  const { scrollTop, scrollHeight, clientHeight } = containerRef.value;
  const threshold = 50;
  showTopButton.value = scrollTop > threshold;

ъ  showBottomButton.value = scrollTop + clientHeight < scrollHeight - threshold;
};


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

onMounted(() => {
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', checkScrollPosition);
    nextTick(checkScrollPosition);
  }
});

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', checkScrollPosition);
  }
});

</script>

<template>
  <div class="message-list" ref="containerRef">
    <section class="load">
      <AdminpanelUIMoloLoader :is-loading="isLoading"/>
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

    <button
        v-if="showTopButton"
        class="scroll-button scroll-top-button"
        @click="scrollToTop"
        aria-label="Прокрутить в начало"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 20V4M12 4L5 11M12 4L19 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    <button
        v-if="showBottomButton"
        class="scroll-button scroll-bottom-button"
        @click="scrollToBottom"
        aria-label="Прокрутить в конец"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 4V20M12 20L19 13M12 20L5 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
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
    border: 1px solid #ffffff;
    padding: 5px 10px;
    border-radius: 20px;
    background-color: whitesmoke;
  }
}

.message-list {
  height: 310px;
  overflow-y: auto;
  padding: 1rem;
  background-color: white;
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
  background-color: #c9c9c9;
}

.sender-name {
  font-size: 9px;
}

.message.own {
  margin-left: auto;
  display: flex;
  text-align: start;
  background-color: #eaeaea;
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

/* Стили для кнопок навигации */
.scroll-button {
  color: black;
  position: fixed;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
}

.scroll-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.scroll-button svg {
  width: 24px;
  height: 24px;
  stroke: #666;
}

.scroll-top-button {
  bottom: 100px;
  right: 30px;
}

.scroll-bottom-button {
  bottom: 30px;
  right: 30px;
}

/* Адаптация под мобильные устройства */
@media (max-width: 765px) {
  .message-list {
    height: 310px;
  }

  .scroll-button {
    width: 40px;
    height: 40px;
  }

  .scroll-button svg {
    width: 20px;
    height: 20px;
  }

  .scroll-top-button {
    bottom: 130px;
    right: 20px;
  }

  .scroll-bottom-button {
    bottom: 80px;
    right: 20px;
  }
}
</style>