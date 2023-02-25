<template>
  <the-nav-bar></the-nav-bar>
  <the-sidebar></the-sidebar>
  <div class="container with-nav">
    <app-message/>
    <router-view></router-view>
  </div>
</template>

<script>

import AppMessage from "@/components/ui/AppMessage";
import TheNavBar from "@/components/TheNavBar";
import TheSidebar from "@/components/ui/TheSidebar";
export default {
  components: {
    TheNavBar,
    AppMessage,
    TheSidebar
  }
}
</script>

<style scoped>

</style>