<script setup lang="ts">
import MyList from '~/layouts/account/flip-list/List.vue'


useHead({
  title: 'УГНТУ | Ресурсы'
})
</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList />
    <MyList />
  </div>
</template>

<style scoped>

.container {
  display: flex;
  overflow-x: hidden;
}

</style>