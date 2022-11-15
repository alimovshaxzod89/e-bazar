<template>
  <div class="app d-flex">
    <NavigationMenu />
    <router-view/>
  </div>
</template>

<script>
import NavigationMenu from '@/components/NavitaionMenu.vue'

export default {
  components: {
    NavigationMenu
  },
  setup() {
    
  }
}
</script>

<style>
body{
  background-color: rgb(226, 228, 235);
}
</style>
