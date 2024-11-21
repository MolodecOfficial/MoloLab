<script setup lang="ts">

import MyAchievements from '~/layouts/account/achievements/Achievements.vue'

useThemeStore()

</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList />
    <MyAchievements/>
  </div>
</template>

<style scoped>
.container {
  overflow: auto;
  display: flex;
}
</style>
