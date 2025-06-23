<script setup lang="ts">
const props = defineProps({
  header: String,
})
</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList />
    <section class="main-container">
      <section class="main-header">
        <span>{{ header }}</span>
      </section>
      <slot/>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  overflow-x: hidden;
  background-color: white;
}

.main-container {
  width: 100%;
  background-color: rgba(237, 244, 255, 0.82);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  min-height: 93vh;
  border-top-left-radius: 20px;
  border: 1px solid #e0e0e0;
}

.main-header {
  background-color: #ffffff;
  width: 90%;
  height: 12vh;
  margin-top: 74px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  & span {
    font-size: 30px;
    color: #3b3b7f;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 560px) {
  .main-container {
    height: 100%;
  }
}
</style>