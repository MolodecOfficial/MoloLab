<script setup lang="ts">
import MyResources from '~/layouts/account/resources/Resources.vue'
</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList />
    <MyResources />
  </div>
</template>

<style scoped>

.container {
  display: flex;
  overflow-x: hidden;
}

</style>