<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click="close">&times;</span>
    <div class="sidebar-content">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad animi autem consequuntur dolor, dolorum error fuga harum molestiae nulla provident quos reprehenderit, sint sit soluta tempore ut vero voluptatem?
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  emits: ['close'],
  setup(_, { emit }){

    const store = useStore();
    const sidebar = computed(() => store.state.sidebar)
    const close = () => {
      store.commit('closeSidebar')
    }

    return {
      close,
      sidebar
    }
  }
}
</script>

<style scoped>

</style>