<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import { useMessageStore } from "~/stores/messageStore";
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
const messageStore = useMessageStore();
const router = useRouter();

const isMobileMenuOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const showTopButton = ref(false);
const showBottomButton = ref(false);

onMounted(async () => {
  if (process.client) {
    try {
      await userStore.getUsers();
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  }
});

const goToChat = (userId: string) => {
  router.push({ path: `/student/messages/${userId}` });
  isMobileMenuOpen.value = false;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
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
  showBottomButton.value = scrollTop + clientHeight < scrollHeight - threshold;
};


const formatDate = (date?: Date | string) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const formatTime = (date?: Date | string) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', checkScrollPosition);
    nextTick(() => {
      checkScrollPosition();
      scrollToBottom();
    });
  }
});

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', checkScrollPosition);
  }
});
</script>

<template>
    <div class="messenger-container_main">
      <!-- Боковая панель с пользователями -->
      <div class="users-sidebar">
        <div class="mobile-header" v-if="!userStore.loadingUser">
          <button class="menu-toggle" @click="toggleMobileMenu">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
            </svg>
          </button>
          <h2>Чаты</h2>
        </div>

        <section :class="['user-list', { 'mobiel-open': isMobileMenuOpen }]">
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
    </div>
</template>

<style scoped>
.messenger-container_main {
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background: rgba(32, 32, 35, 0.7);
  backdrop-filter: blur(12px);
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.users-sidebar {
  width: 350px;
  overflow: auto;
}

.user-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(32, 32, 35, 0.7);
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
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

.user-list-container {
  padding: 8px;

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


@keyframes spin {
  to { transform: rotate(360deg); }
}

.date-divider span {
  background: rgba(32, 32, 35, 0.8);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Мобильные стили */
.mobile-header {
  display: none;
  align-items: center;
  padding: 12px 16px;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .messenger-container {
    flex-direction: column;
    height: auto;
    min-height: calc(100vh - 120px);
  }

  .users-sidebar {
    width: 100%;
    max-height: 300px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .chat-area {
    height: calc(100vh - 420px);
  }
}

@media (max-width: 768px) {
  .user-list {
    position: fixed;
    top: 120px;
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
}

@media (max-width: 480px) {
  .messenger-container_main {
    margin-top: 60px;
  }

  .date-divider span {
    font-size: 0.7rem;
    padding: 2px 8px;
  }

}
</style>