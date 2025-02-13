<script setup lang="ts">
const route = useRoute();

</script>

<template>
  <section class="student-container">
    <section class="student-main-container">
      <AccountMoloNavbar/>
    </section>
  </section>
</template>

<style scoped>
.student-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #eaeaea;
}

.student-main-container {
  width: 625px;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #ededf1;
  align-items: center;
  gap: 10px;

}


</style>