<script setup lang="ts">
import MyReadForm from '~/layouts/account/readers-form/ReadForm.vue'


useHead({
  title: 'УГНТУ | Читательский формуляр'
})
</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList />
    <MyReadForm />
  </div>
</template>

<style scoped>

.container {
  display: flex;
  overflow-x: hidden;
}

</style>