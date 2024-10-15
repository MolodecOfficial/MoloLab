<script setup lang="ts">
import catKiss from 'public/in-progress/kiss.gif'
</script>

<template>
  <section>
    <h2> Уважаемый пользователь. </h2>
<h2>Благодарю Вас за посещение моего сайта. Обращаю ваше внимание, что в настоящее время он находится в стадии разработки.</h2> 
<h2>Я продолжаю работать над его улучшением и устранением оставшихся недочетов.</h2>

<h2>Следите за обновлениями и оставайтесь с нами!

С уважением, Moloдец
    </h2>  
    <img :src="catKiss" alt="">
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & h2 {
    text-align: center;
  }
}
</style>