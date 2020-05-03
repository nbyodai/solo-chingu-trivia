<template>
  <div id="app" class="container h-screen mx-auto">
    <home-header />
    <div class="flex mt-16">
      <select
        name="LeaveType"
        @change="selectTopic($event)"
        class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
      >
        >
        <option value="all">all</option>
        <option value="css">CSS</option>
        <option value="html">HTML</option>
        <option value="javascript">Javascript</option>
      </select>
    </div>
    <div
      v-if="questions.length"
      class="flex flex-col items-center pb-4 border-2 border-gray-100 shadow-lg"
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

const filters = {
  all: function(questions) {
    return questions;
  },
  html: function(questions) {
    return questions.filter(q => q.topic === "html");
  },
  css: function(questions) {
    return questions.filter(q => q.topic === "css");
  },
  javascript: function(questions) {
    return questions.filter(q => q.topic === "javascript");
  }
};

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
      setTopic: "all",
      correctAnswers: 0,
      successMessage: "Well Done! Correct!",
      failMessage: "Sorry, but that's incorrect!"
    };
  },
  computed: {
    filteredQuestions: function() {
      return filters[this.setTopic](this.questions);
    },
    total: function() {
      return filters[this.setTopic](this.questions).length;
    },
    currentQuestion() {
      return filters[this.setTopic](this.questions)[this.step - 1];
    },
    isFinalQuestion() {
      return this.step == filters[this.setTopic](this.questions).length;
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
    selectTopic: function(event) {
      this.setTopic = event.target.value;
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

