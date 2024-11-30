<script setup lang="ts">
import MyElectricReception from '~/layouts/account/electric/Reception.vue'

useHead({
  title: 'УГНТУ | Электронная приёмная'
})
</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList />
    <MyElectricReception />
  </div>
</template>

<style scoped>

.container {
  display: flex;
  overflow-x: hidden;
}

</style>