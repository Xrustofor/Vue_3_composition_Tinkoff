<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: fError}">
        <label for="fio">ФИО</label>
        <input
            type="text"
            autocomplete="username"
            id="fio"
            v-model="fio"
            @blur="fBlur"
        >
      <small v-if="fError">{{ fError }}</small>
    </div>
    <div class="form-control" :class="{invalid: pError}">
      <label for="phone">Телефон</label>
      <input
          type="text"
          autocomplete="phone"
          id="phone"
          v-model="phone"
          @blur="pBlur"
      >
      <small v-if="pError">{{ pError }}</small>
    </div>
    <div class="form-control" :class="{invalid: aError}">
      <label for="amount">Суммы</label>
      <input
          type="number"
          autocomplete="amount"
          id="amount"
          v-model.number="amount"
          @blur="aBlur"
      >
      <small v-if="aError">{{ aError }}</small>
    </div>
    <div class="form-control" >
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняеться</option>
      </select>
    </div>
    <button
        class="btn primary"
        :disabled="isSubmitting"
        type="submit"
    >Создать</button>
  </form>
</template>

<script>
import {useRequestForm} from "@/use/request-form";
import { useStore } from "vuex"

export default {
  emits: ['created'],
  setup(_, { emit }){
    const store = useStore()
    const submit = async values => {
      await store.dispatch('request/create', values);
      emit('created')
    }

    return {...useRequestForm(submit)}
  }
}
</script>

<style scoped>

</style>