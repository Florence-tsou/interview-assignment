<template>
  <div class="home-view">
    <SideMenu />
    <SquareGrid />
  </div>
</template>
<script setup lang="ts">
import SideMenu from '../components/SideMenu/SideMenu.vue'
import SquareGrid from '../components/SquareGrid.vue'
</script>
<style scoped lang="scss">
.home-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
