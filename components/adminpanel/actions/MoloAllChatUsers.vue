<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';
import { useMessageStore } from '~/stores/messageStore';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

defineProps({
  users: Array as PropType<any[]>,
});

const userStore = useUserStore();
const messageStore = useMessageStore();
const router = useRouter();

function isCurrentUser(userId: string): boolean {
  return userId === userStore.userId;
}

const goToChat = (userId: string) => {
  router.push({ path: `/adminPanel/messages/${userId}` });
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

</script>

<template>
  <AdminpanelMoloLoader :is-loading="userStore.loadingUser" />
  <section v-if="!userStore.loadingUser" class="user-list">
    <div v-if="!users || users.length === 0" class="no">Нет пользователя с таким именем</div>
    <div
        v-else
        v-for="user in users"
        :key="user._id"
        class="user-item"
        @click="goToChat(user._id)"
    >
      <AdminpanelMoloAvatarGenerator :user-id="user._id" />
      <div class="item">
        <div v-if="isCurrentUser(user._id)">
          {{ user.firstname = 'Избранное' }}
        </div>
        <span v-else>
          {{ user.firstName }} {{ user.lastName }}
          <span v-if="messageStore.unreadCounts[user._id]" class="badge">
            {{ messageStore.unreadCounts[user._id] }}
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.user-list {
  border: 1px solid var(--dk-border-color);
  display: flex;
  text-align: start;
  justify-content: center;
  height: fit-content;
  flex-direction: column;
  background-color: var(--dk-bg-color);
  border-radius: 10px;
  width: 20%;
  box-sizing: border-box;
}
.user-item {
  display: flex;
  text-align: start;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #232323;
  }

}

.no {
  padding: 10px 20px;
}

.badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  margin-left: 5px;
  font-size: 0.8em;
}
</style>