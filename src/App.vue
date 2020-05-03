<template>
  <div id="app" class="container h-screen mx-auto">
    <home-header />
    <div class="flex flex-col items-center mt-16 pb-4 border-2 border-gray-100 shadow-lg">
      <question-tracker :total="total" :step="step" />
      <question-card :question="questions[step-1]" @answered="answered" />
      <div>
        <button
          class="bg-blue-600 px-3 py-3 w-20 rounded"
          @click="goToNext"
          v-show="stepAnswered"
        >Next</button>
      </div>
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
            "Which HTML5 element should contain important links for navigating a website?",
          id: 1,
          topic: "html",
          choices: {
            a: "<li>",
            b: "<ul>",
            c: "<header>",
            d: "<nav>"
          },
          answer: "d"
        },
        {
          question:
            "Which HTML5 element should contain important information about what page you are on and the topic of the page?",
          id: 2,
          topic: "html",
          choices: {
            a: "<li>",
            b: "<ul>",
            c: "<header>",
            d: "<nav>"
          },
          answer: "c"
        }
      ],
      step: 1,
      stepAnswered: false,
      stepAnswer: null
    };
  },
  computed: {
    total: function() {
      return this.questions.length;
    }
  },
  methods: {
    goToNext: function() {
      const isNotLastQuestion = this.step < this.questions.length;
      if (isNotLastQuestion) {
        this.resetStepValues();
        this.step++;
      } else {
        return;
      }
    },
    answered: function(answer) {
      this.stepAnswered = true;
      this.stepAnswer = answer;
    },
    resetStepValues: function() {
      this.stepAnswered = false;
      this.stepAnswer = null;
    }
  }
};
</script>

<style src="./assets/css/style.css"></style>

