<template>
  <div id="app" class="container h-screen mx-auto">
    <home-header />
    <div class="flex mt-16">
      <select
        name="TopicType"
        @change="selectTopic($event)"
        class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
      >
        >
        <option value="all" :disabled="isDisabled('all')">all</option>
        <option value="css" :disabled="isDisabled('css')">CSS</option>
        <option value="html" :disabled="isDisabled('html')">HTML</option>
        <option value="javascript" :disabled="isDisabled('javascript')">Javascript</option>
      </select>
    </div>
    <div
      v-if="questions.length"
      class="flex flex-col items-center pb-4 border-2 border-gray-100 shadow-lg"
    >
      <question-tracker :total="total" :step="currentStep" />
      <question-card
        :key="getCurrentQuestion().id"
        :question="getCurrentQuestion()"
        @answered="answered"
      />
      <div class="text-center">
        <div
          class="pb-2"
          v-show="stepAnswered"
        >{{ getCurrentQuestion().answer === this.stepAnswer ? successMessage : failMessage }}</div>
        <button
          class="bg-blue-600 px-3 py-3 w-20 rounded"
          @click="goToNext"
          v-show="stepAnswered && !isFinalQuestion()"
        >Next</button>
        <div v-show="stepAnswered && isFinalQuestion()">
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
      store: {
        all: { answeredIds: [] },
        css: { answeredIds: [] },
        html: { answeredIds: [] },
        javascript: { answeredIds: [] }
      },
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
    currentStep: function() {
      return this.store[this.setTopic].answeredIds.length + 1;
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
      const currentQuestion = this.getCurrentQuestion();
      this.store.all.answeredIds.push(currentQuestion.id);
      this.store[currentQuestion.topic].answeredIds.push(currentQuestion.id);
      if (!this.isFinalQuestion()) {
        this.resetStepValues();
      } else {
        return;
      }
    },
    selectTopic: function(event) {
      this.setTopic = event.target.value;
    },
    getCurrentQuestion: function() {
      const questionSet = filters[this.setTopic](this.questions);
      return questionSet.find(q => !this.store.all.answeredIds.includes(q.id));
    },
    answered: function(answer) {
      this.stepAnswered = true;
      this.stepAnswer = answer;
      const currentQuestion = this.getCurrentQuestion();
      if (currentQuestion.answer === this.stepAnswer) this.correctAnswers++;
    },
    isFinalQuestion: function() {
      return this.currentStep == filters[this.setTopic](this.questions).length;
    },
    isDisabled: function(topic) {
      let boolDisabled = false;
      if (this.store.all.answeredIds.length > 0) {
        boolDisabled = this.setTopic != topic;
      }
      return boolDisabled;
    },
    resetStepValues: function() {
      this.stepAnswered = false;
      this.stepAnswer = null;
    }
  }
};
</script>

<style src="./assets/css/style.css"></style>

