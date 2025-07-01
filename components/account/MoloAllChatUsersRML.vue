<script setup lang="ts">
import {useMessageStore} from '~/stores/messageStore';
import {useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';

defineProps({
  users: Array as PropType<any[]>,
});

const userStore = useUserStore();
const messageStore = useMessageStore();
const router = useRouter();
const isMobileMenuOpen = ref(false);

function isCurrentUser(userId: string): boolean {
  return userId === userStore.userId;
}

const goToChat = (userId: string) => {
  router.push({path: `/student/messages/${userId}`});
  isMobileMenuOpen.value = false;
};

onMounted(async () => {
  if (process.client) {
    try {
      await userStore.getUsers();
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  }
});

// Переключение меню на мобильных
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <AdminpanelUIMoloLoader :is-loading="userStore.loadingUser"/>
  <!-- Мобильный хедер -->
  <div class="mobile-container">
    <div class="mobile-header" v-if="!userStore.loadingUser">
      <button class="menu-toggle" @click="toggleMobileMenu">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
        </svg>
      </button>
      <h2>Пользователи</h2>
    </div>
  </div>


  <section
      :class="['user-list', { 'mobile-open': isMobileMenuOpen }]"
      v-if="!userStore.loadingUser"
  >
    <div class="mobile-header-inside">
      <h2>Пользователи</h2>
      <button class="close-menu" @click="toggleMobileMenu">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              fill="currentColor"/>
        </svg>
      </button>
    </div>

    <div class="user-list-container">
      <div v-if="!users || users.length === 0" class="no-users">Нет пользователей</div>
      <div
          v-else
          v-for="user in users"
          :key="user._id"
          class="user-item"
          @click="goToChat(user._id)"
      >
        <div class="user-info">
          <div v-if="isCurrentUser(user._id)" class="user-name">
            Избранное
          </div>
          <div v-else class="user-name">
            {{ user.firstName }} {{ user.lastName }}
            <span v-if="messageStore.unreadCounts[user._id]" class="badge">
            {{ messageStore.unreadCounts[user._id] }}
          </span>
          </div>
          <section class="vector">
            <svg fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L1 9" stroke="#7B7B7B" stroke-linecap="round" stroke-width="1.25"/>
            </svg>
          </section>
          <div class="last-message" v-if="user.lastMessage">
            {{ user.lastMessage.text?.substring(0, 20) }}...
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  box-sizing: border-box;
  transition: transform 0.3s ease;
  width: 90%;

  &:first-child {
    border: 1px solid red;
  }
}


.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 15px;
  cursor: pointer;
  background-color: white;
  width: 100%;

  &:hover {
    background-color: #e7e7e7;
  }
}

.user-list-container {
  border-radius: 10px;
  overflow: hidden;
}

.user-info {
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  & span {
    color: var(--dk-border-color);
  }
}

.user-name {
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}

.last-message {
  font-size: 0.85rem;
  color: #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge {
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  margin-left: 8px;
  font-size: 0.75rem;
  min-width: 22px;
  text-align: center;
  line-height: 1.4;
}

.no-users {
  padding: 20px;
  text-align: center;
  color: #888;
}

.mobile-container {
  display: flex;
}

.mobile-header {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 20px;
  background-color: #ffffff;
  width: 100%;
  color: #3b3b7f;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.mobile-header h2 {
  margin: 0 auto;
  font-size: 1.2rem;
}

.menu-toggle {
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
  padding: 5px;
  height: 100%;
}

.mobile-header-inside {
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  width: 100%;
}

.close-menu {
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  padding: 5px;
}


.user-list {
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  height: 100vh;
  z-index: 1000;
  border-radius: 0;
  transform: translateX(-100%);
}

.user-list.mobile-open {
  transform: translateX(0);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: transparent;
  backdrop-filter: blur(5px);
}

.mobile-header,
.mobile-header-inside {
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-users {
  padding: 30px 20px;
}


@media (max-width: 576px) {
  .user-list {
    width: 100%;
  }

  .user-item {
    padding: 10px 12px;
  }

  .last-message {
    font-size: 0.8rem;
  }
}
</style>