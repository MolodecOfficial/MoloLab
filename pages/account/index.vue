<script setup lang="ts">
import catKiss from 'public/in-progress/kiss.gif'
</script>

<template>
  <AccountMoloGuard>
    <section>
      Привет)
      Ты нашёл пасхалку этого сайта)
      <img :src="catKiss" alt="">
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