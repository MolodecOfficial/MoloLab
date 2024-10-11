<script setup lang="ts">
import catkiss from 'public/in-progress/kiss.gif'
</script>

<template>
  <section>
    <h2>
      Господа, это ещё сырая версия моего переработанного сайта. Где то ещё есть дыры, которые буду закрывается вот таким сообщением
    </h2>
    <h2>
      Сайт по прежнему в разработке, оставайтесь на связи!
    </h2>
    
    <img :src="catkiss" alt="">
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>