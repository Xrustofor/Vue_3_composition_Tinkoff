<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script>

import { ref } from "vue";

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['active', 'cancelled', 'done', 'pending'].includes(value);
      }
    }
  },
  setup(props){

    const classMap = {
      active: 'primary',
      cancelled: 'danger',
      done: 'primary',
      pending: 'warning',
    }
    const textMap = {
      active: 'Активен',
      cancelled: 'Отменен',
      done: 'Завершен',
      pending: 'Выполняеться',
    }

    const className = ref(classMap[props.type]);
    const text = ref(textMap[props.type]);

    return {
      className,
      text
    }
  }
}
</script>

<style scoped>

</style>