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
}

.student-main-container {
  width: 700px;
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: #d9d9d9;
  align-items: center;
  gap: 20px;

}


</style>