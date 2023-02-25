<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script>

import { ref, watch } from "vue";

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

    watch(props, val => {
      className.value = classMap[val.type]
      text.value = textMap[val.type]
    })


    return {
      className,
      text
    }
  }
}
</script>

<style scoped>

</style>