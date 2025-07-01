<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";

const containerRef = ref<HTMLElement | null>(null);
const showTopButton = ref(false);
const showBottomButton = ref(false);
const showLoader = ref(true);
const isMobileMenuOpen = ref(false);

const userStore = useUserStore();
const messageStore = useMessageStore();
const router = useRouter();

const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
  if (containerRef.value) {
    containerRef.value.scrollTo({
      top: containerRef.value.scrollHeight,
      behavior
    });
  }
};

watch(() => messageStore.messages, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });

onMounted(() => {
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', checkScrollPosition);
    nextTick(() => {
      scrollToBottom('auto');
    });
  }
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const goToChat = (userId: string) => {
  router.push({ path: `/student/messages/${userId}` });
  isMobileMenuOpen.value = false;
};

watch(() => [messageStore.messages, messageStore.isLoading], () => {
  showLoader.value = messageStore.messages.length === 0 && messageStore.isLoading;
}, { immediate: true });

const scrollToTop = () => {
  if (containerRef.value) {
    containerRef.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

const checkScrollPosition = () => {
  if (!containerRef.value) return;

  const { scrollTop, scrollHeight, clientHeight } = containerRef.value;
  const threshold = 50;

  showTopButton.value = scrollTop > threshold;
  showBottomButton.value = scrollTop + clientHeight < scrollHeight - threshold;
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

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', checkScrollPosition);
  }
});
</script>

<template>
  <AccountPatternsMoloLab>
    <div class="messenger-wrapper">
      <div class="messenger-container">
        <div class="users-sidebar">
          <div class="mobile-header" v-if="!userStore.loadingUser">
            <button class="menu-toggle" @click="toggleMobileMenu">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
              </svg>
            </button>
            <h2>Чаты</h2>
          </div>

          <section :class="['user-list', { 'mobile-open': isMobileMenuOpen }]">
            <div class="mobile-header-inside">
              <h2>Чаты</h2>
              <button class="close-menu" @click="toggleMobileMenu">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                </svg>
              </button>
            </div>

            <div class="user-list-container">
              <div v-if="!userStore.users || userStore.users.length === 0" class="no-users">
                Нет активных чатов
              </div>
              <div
                  v-else
                  v-for="user in userStore.users"
                  :key="user._id"
                  class="user-item"
                  @click="goToChat(user._id)"
              >
                <div class="user-info">
                  <div class="user-name">
                    <span v-if="user._id === userStore.userId" class="favorite-label">
                      <svg viewBox="0 0 24 24" fill="none" class="star-icon">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"/>
                      </svg>
                      Избранное
                    </span>
                    <span v-else>
                      {{ user.firstName }} {{ user.lastName }}
                    </span>
                    <span v-if="messageStore.unreadCounts[user._id]" class="badge">
                      {{ messageStore.unreadCounts[user._id] }}
                    </span>
                  </div>
                </div>
                <div class="arrow-icon">
                  <svg fill="none" height="10" viewBox="0 0 6 10" width="6">
                    <path d="M1 1L5 5L1 9" stroke="#9f7aea" stroke-linecap="round" stroke-width="1.5"/>
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="chat-area">
          <button v-if="showTopButton" @click="scrollToTop" class="scroll-button top">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 15l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div ref="containerRef" class="messages-container">
            <AdminpanelUIMoloLoader v-if="showLoader" :is-loading="true"/>

            <template v-else>
              <div
                  v-for="(message, index) in messageStore.messages"
                  :key="message._id || index"
                  class="message-wrapper"
                  :class="{
                    'my-message': message.senderId === userStore.userId,
                    'other-message': message.senderId !== userStore.userId
                  }"
              >
                <div class="date-divider" v-if="index === 0 || formatDate(message.timestamp) !== formatDate(messageStore.messages[index-1]?.timestamp)">
                  <span>{{ formatDate(message.timestamp) }}</span>
                </div>

                <div class="message">
                  <div class="message-content">
                    {{ message.text }}
                  </div>
                  <div class="message-time">
                    {{ formatTime(message.timestamp) }}
                  </div>
                </div>
              </div>
            </template>
          </div>

          <button
            v-if="showBottomButton"
            @click="() => scrollToBottom()"
            class="scroll-button bottom"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M19 9l-7 7-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </AccountPatternsMoloLab>
</template>

<style scoped>
.messenger-wrapper {
  width: 100%;
  padding-top: 20px;
  height: calc(100vh - 80px);
}

.messenger-container {
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(32, 32, 35, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.users-sidebar {
  width: 350px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
}

.user-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(32, 32, 35, 0.7);
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.user-list-container {
  padding: 8px;
  flex: 1;
  overflow-y: auto;
}

.user-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 4px;
}

.user-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.user-info {
  flex: 1;
  overflow: hidden;
}

.user-name {
  font-weight: 500;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.favorite-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #f6ad55;
}

.star-icon {
  width: 16px;
  height: 16px;
  color: #f6ad55;
}

.last-message {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge {
  background: #ed64a6;
  color: white;
  border-radius: 50%;
  font-size: 0.7rem;
  min-width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.arrow-icon {
  opacity: 0.6;
  transition: all 0.3s ease;
}

.user-item:hover .arrow-icon {
  opacity: 1;
  transform: translateX(2px);
}

.no-users {
  padding: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.messages-container {
  flex: 1;
  padding: 20px;

  overflow-y: auto;
  scroll-behavior: smooth;
}

.message-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
}

.my-message {
  align-items: flex-end;
}

.other-message {
  align-items: flex-start;
}

.date-divider {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 16px 0;
}

.date-divider span {
  background: rgba(32, 32, 35, 0.8);
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  white-space: nowrap;
}

.message {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 16px;
  position: relative;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}

.my-message .message {
  background: rgba(102, 126, 234, 0.3);
  border-bottom-right-radius: 4px;
}

.other-message .message {
  background: rgba(255, 255, 255, 0.1);
  border-bottom-left-radius: 4px;
}

.message-content {
  color: white;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
}

.message-time {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  text-align: right;
  margin-top: 4px;
}

.scroll-button {
  position: fixed;
  right: 30px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(32, 32, 35, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  transition: all 0.2s ease;
}

.scroll-button:hover {
  background: rgba(102, 126, 234, 0.6);
  transform: translateY(-2px) scale(1.05);
}

.scroll-button svg {
  width: 20px;
  height: 20px;
  color: white;
}

.scroll-button.top {
  bottom: 100px;
}

.scroll-button.bottom {
  bottom: 40px;
}

.mobile-header {
  display: none;
  align-items: center;
  padding: 12px 16px;
  color: whitesmoke;
  background: rgba(32, 32, 35, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-header h2 {
  margin: 0 auto;
  font-size: 1.2rem;
  color: white;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.menu-toggle, .close-menu {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
}

.mobile-header-inside {
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 1024px) {
  .messenger-container {
    flex-direction: column;
    height: 90%;
  }

  .users-sidebar {
    width: 100%;
    max-height: 300px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .chat-area {
    height: calc(100vh - 380px);
  }

  .scroll-button {
    right: 20px;
  }
}

@media (max-width: 768px) {
  .user-list {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
  }

  .user-list.mobile-open {
    transform: translateX(0);
  }

  .mobile-header,
  .mobile-header-inside {
    display: flex;
  }

  .message {
    max-width: 85%;
  }

  .scroll-button {
    width: 40px;
    height: 40px;
    right: 15px;
  }

  .scroll-button.top {
    bottom: 90px;
  }

  .scroll-button.bottom {
    bottom: 30px;
  }
}

@media (max-width: 480px) {
  .messenger-wrapper {
    padding-top: 60px;
    height: calc(100vh - 60px);
  }

  .date-divider span {
    font-size: 0.7rem;
    padding: 2px 8px;
  }

  .message {
    padding: 10px 12px;
    max-width: 90%;
  }

  .message-content {
    font-size: 0.9rem;
  }

  .scroll-button {
    width: 36px;
    height: 36px;
    right: 10px;
  }

  .scroll-button.top {
    bottom: 80px;
  }

  .scroll-button.bottom {
    bottom: 20px;
  }
}
</style>