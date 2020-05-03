<template>
  <div id="app" class="container h-screen mx-auto">
    <home-header />
    <div class="flex flex-col mt-16 border-2 border-gray-100 shadow-lg">
      <question-tracker :total="total" :step="step" />
      <question-card :question="questions[0]" />
    </div>
  </div>
</template>

<script>
import HomeHeader from "./components/Header.vue";
import QuestionCard from "./components/QuestionCard.vue";
import QuestionTracker from "./components/QuestionTracker";

export default {
  name: "app",
  components: {
    HomeHeader,
    QuestionCard,
    QuestionTracker
  },
  data: function() {
    return {
      questions: [
        {
          question:
            "Which HTML5 element should contain important information about what page you are on and the topic of the page?",
          id: 1,
          topic: "html",
          choices: {
            a: "<li>",
            b: "<ul>",
            c: "<header>",
            d: "<nav>"
          },
          answer: "d"
        }
      ]
    };
  },
  computed: {
    total: function() {
      return this.questions.length;
    },
    step: function() {
      return 1;
    }
  }
};
</script>

<style src="./assets/css/style.css"></style>
