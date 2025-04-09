<script setup lang="ts">
defineProps({
  users: Object
})

const userStore = useUserStore()


const router = useRouter();
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
  router.push({ path: `/adminPanel/messages/${userId}`});
};


</script>

<template>
  <AdminpanelMoloLoader :is-loading="userStore.loadingUser"/>
  <section v-if="!userStore.loadingUser" class="user-list">
    <div v-for="user in users" :key="user._id" class="user-item" @click="goToChat(user._id)">
      <AdminpanelMoloAvatarGenerator :user-id="user._id"/>
      <div class="item">
        <span>{{ user.firstName }} {{ user.lastName }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.user-list {
  border: 1px solid var(--dk-border-color);
  display: flex;
  text-align: center;
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
  text-align: center;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #232323;
  }

}


</style>