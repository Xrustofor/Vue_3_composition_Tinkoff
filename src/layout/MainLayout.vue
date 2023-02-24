<template>
  <the-nav-bar></the-nav-bar>
  <div class="container with-nav">
    <app-message/>
    <router-view></router-view>
  </div>
</template>

<script>

import AppMessage from "@/components/ui/AppMessage";
import TheNavBar from "@/components/TheNavBar";

export default {
  components: {
    TheNavBar,
    AppMessage
  }
}
</script>

<style scoped>

</style>