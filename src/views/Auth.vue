<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Ввойти в систему</h1>
    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Email</label>
      <input
          type="text"
          id="email"
          autocomplete="username"
          v-model="email"
          @blur="eBlur"
      >
      <small v-if="eError">{{ eError }}</small>
    </div>
    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Пароль</label>
      <input
          autocomplete="current-password"
          type="password"
          id="password"
          v-model="password"
          @blur="pBlur"
      >
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting || isToManyAttempts" >Ввойти</button>
    <div class="text-danger" v-if="isToManyAttempts">Вы слишком часто пытаетесь войти в систему. Попробуйте пожже</div>
  </form>
</template>

<script>

import { useLoginForm } from "@/use/login-form";

export default {
  setup() {
    return { ...useLoginForm() }
  }
}
</script>

<style scoped>

</style>