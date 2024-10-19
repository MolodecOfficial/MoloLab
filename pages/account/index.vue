<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { ref, onMounted } from "vue";

const firstName = ref('');
const lastName = ref('');
const userStore = useUserStore();

onMounted(() => {
  firstName.value = userStore.userFirstName;
  lastName.value = userStore.userLastName;
});

const greetings = `Привет, ${firstName.value} ${lastName.value}`;
</script>

<template>
  <AccountMoloGuard>
    <section>
      {{ greetings }}
    </section>
  </AccountMoloGuard>
</template>

<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>