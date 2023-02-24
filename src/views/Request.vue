<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back title="Заявка" v-else-if="request">
    <p><strong>Имя владельца</strong>: {{ request.fio }}</p>
    <p><strong>Телефон</strong>: {{ request.phone }}</p>
    <p><strong>Сумма</strong>: {{ currency(request.amount) }}</p>
    <p><strong>Статус</strong>: <app-status :type="request.status"/> </p>

    <div class="form-control" >
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняеться</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn" @click="update" v-if="hasChanges">Обновить</button>
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки с ID = {{ $route.params.id }} нет
  </h3>

</template>

<script>

import AppPage from "@/components/ui/AppPage";
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex";
import { currency } from "@/utils/currency";
import AppLoader from "@/components/ui/AppLoader";
import AppStatus from "@/components/ui/AppStatus";

export default {
  setup(){
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(false);
    const request = ref(null);
    const status = ref('');

    onMounted(async () => {
      loading.value = true;
      request.value = await store.dispatch('request/loadOne', route.params.id)
      loading.value = false;
      status.value = request.value?.status
    })

    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async () => {
      loading.value = true;
      await store.dispatch('request/remove', route.params.id);
      await router.push('/')
      loading.value = false;
    }

    const update = async () => {
      loading.value = true;
      const data = {
        id: route.params.id,
        ...request.value,
        status: status.value
      }
      await store.dispatch('request/update', data);
      request.value.status = status.value
      loading.value = false;
    }

    return {
      loading,
      request,
      currency,
      remove,
      update,
      status,
      hasChanges
    }
  },
  components:{
    AppPage,
    AppLoader,
    AppStatus
  }
}
</script>

<style scoped>

</style>