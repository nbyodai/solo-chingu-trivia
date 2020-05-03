<template>
  <div id="app" class="container h-screen mx-auto">
    <home-header />
    <div class="flex flex-col mt-16">
      <question-card :question="questions[0]" />
    </div>
  </div>
</template>

<script>
import HomeHeader from "./components/Header.vue";
import QuestionCard from "./components/QuestionCard.vue";
export default {
  name: "app",
  components: {
    HomeHeader,
    QuestionCard
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
  }
};
</script>

<style src="./assets/css/style.css"></style>
