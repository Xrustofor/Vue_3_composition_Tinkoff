<template>
  <app-page title="Помощь">
    <question-item
      v-for="q in questions"
      :question="q"
      :key="q.title"
    />
  </app-page>
</template>

<script>

import AppPage from "@/components/ui/AppPage";
import QuestionItem from "@/components/question/QuestionItem";
export default {
  setup(){
    const questions = [
      {
        title: 'Что есть в данной статье ?',
        text: 'Тут есть все, для того, чтобы смотреть, какие заявки человек зделал'
      },
      {
        title: 'Как тут работает атовризация ?',
        text: 'Все реализовано через FireBase'
      }
    ]

    return{
      questions
    }
  },
  components: {
    AppPage,
    QuestionItem
  }

}
</script>

<style scoped>

</style>
