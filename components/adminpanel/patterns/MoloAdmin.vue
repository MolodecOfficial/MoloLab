<script setup lang="ts">
const props = defineProps({
  loading: Boolean,
  users: Object,
  user: Object,
  header_text: String,
})

</script>

<template>
  <div class="admin-panel">
    <AdminpanelPatternsMoloAdminHeader/>
    <section class="route-main">
      <section class="admin-main-container">
        <div class="welcome-message">
          <span>{{ header_text }}</span>
          <slot name="more-info" class="more"></slot>
        </div>
        <slot/>
      </section>
    </section>
  </div>
</template>

<style scoped>
.more {
  display: flex;
  justify-content: center;
  align-items: center;
}
.admin-panel {
  background-color: var(--dk-bg-color);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.route-main {
  display: flex;

  height: 100%;
  justify-content: center;
}
.admin-main-container {
  width: 60%;
  min-height: max-content;
  padding: 20px;
  border: 1px solid var(--dk-border-color);
  background-color: var(--dk-bg-ins-color);
  border-radius: 20px;
}
.welcome-message {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  & span:first-child {
    font-size: 28px;
    padding: 10px 0;
  }
}

@media (max-width: 765px) {
  .admin-main-container {
    width: 80%;
  }
  .welcome-message {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
}

@keyframes fadeIn {
  from { opacity: 0; margin-top: 10px; }
  to { opacity: 1; margin-top: 0; }
}

.admin-main-container {
  animation: fadeIn 0.4s ease-out forwards;
}

.admin-panel,
.route-main,
.admin-main-container {
  transform: none !important;  /* Важно! */
  overflow: visible !important;
  position: static !important;
}

</style>