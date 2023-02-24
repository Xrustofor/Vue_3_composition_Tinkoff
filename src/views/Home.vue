<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>
    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal=false">
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>

import { ref, computed, onMounted } from "vue"
import { useStore } from "vuex"
import AppPage from "@/components/ui/AppPage";
import RequestTable from "@/components/request/RequestTable";
import AppModal from "@/components/ui/AppModal";
import RequestModal from "@/components/request/RequestModal";
import AppLoader from "@/components/ui/AppLoader";
import RequestFilter from "@/components/request/RequestFilter"


export default {
  name: 'Home',
  setup(){
    const modal = ref(false);
    const store = useStore();
    const loading = ref(false);
    const requests = computed(() => store.getters['request/requests']
        .filter( request => {
          if(filter.value.name){
            return request.fio.includes(filter.value.name);
          }else{
            return request
          }
        })
        .filter(request => {
          if(filter.value.status){
            return request.status === filter.value.status
          }else{
            return request;
          }
        })

    )
    const filter = ref({});


    onMounted(async () => {
      loading.value = true;
      await store.dispatch('request/load')
      loading.value = false;
    })
    return {
      modal,
      requests,
      loading,
      filter,
    }
  },
  components: {
    AppLoader,
    AppPage,
    RequestTable,
    AppModal,
    RequestModal,
    RequestFilter
  }
}
</script>
