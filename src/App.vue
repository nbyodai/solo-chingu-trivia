<template>
  <div id="app" class="container h-screen mx-auto">
    <home-header />
    <div
      v-if="questions.length"
      class="flex flex-col items-center mt-16 pb-4 border-2 border-gray-100 shadow-lg"
    >
      <question-tracker :total="total" :step="step" />
      <question-card :question="currentQuestion" @answered="answered" />
      <div class="text-center">
        <div
          class="pb-2"
          v-show="stepAnswered"
        >{{ currentQuestion.answer === this.stepAnswer ? successMessage : failMessage }}</div>
        <button
          class="bg-blue-600 px-3 py-3 w-20 rounded"
          @click="goToNext"
          v-show="stepAnswered && !isFinalQuestion"
        >Next</button>
        <div v-show="stepAnswered && isFinalQuestion">
          <p>Trivia completed!</p>
          <p>score: {{ correctAnswers }} / {{ total }}</p>
        </div>
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
  mounted() {
    this.fetchQuestions();
  },
  data: function() {
    return {
      questions: [],
      step: 1,
      stepAnswered: false,
      stepAnswer: null,
      correctAnswers: 0,
      successMessage: "Well Done! Correct!",
      failMessage: "Sorry, but that's incorrect!"
    };
  },
  computed: {
    total: function() {
      return this.questions.length;
    },
    currentQuestion() {
      return this.questions[this.step - 1];
    },
    isFinalQuestion() {
      return this.step == this.questions.length;
    }
  },
  methods: {
    fetchQuestions: function() {
      fetch("https://johnmeade-webdev.github.io/chingu_quiz_api/trial.json")
        .then(response => response.json())
        .then(json => {
          this.questions = json;
        });
    },
    goToNext: function() {
      if (!this.isFinalQuestion) {
        this.resetStepValues();
        this.step++;
      } else {
        return;
      }
    },
    answered: function(answer) {
      this.stepAnswered = true;
      this.stepAnswer = answer;
      if (this.currentQuestion.answer === this.stepAnswer)
        this.correctAnswers++;
    },

    resetStepValues: function() {
      this.stepAnswered = false;
      this.stepAnswer = null;
    }
  }
};
</script>

<style src="./assets/css/style.css"></style>

