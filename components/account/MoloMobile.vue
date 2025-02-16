<script setup lang="ts">

</script>

<template>
  <section class="student-container">
    <section class="student-main-container">
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
  background-color: rgba(202, 203, 203, 0.19);
  align-items: center;
  gap: 10px;
  height: 100%;
  overflow: auto;
}
</style>