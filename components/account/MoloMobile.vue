<script setup lang="ts">
const props = defineProps({
  title: String
})
</script>

<template>
  <section class="student-container">
    <section class="student-main-container">
      <section class="student-header">
        {{ title }}
      </section>
      <slot/>
    </section>
    <AccountMoloNavbar/>
  </section>
</template>

<style scoped>
.student-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #ecf5fb;
  height: 100vh;
  overflow: hidden;
}

.student-main-container {

  width: 625px;
  display: flex;
  flex-direction: column;
  background-color: rgba(109, 109, 171, 0.09);
  align-items: center;
  gap: 10px;
  height: 100%;
  overflow: auto;
}

.student-header {
  margin-top: 10px;
  background-color: white;
  padding: 10px 20px;
  border-radius: 15px;
}
</style>