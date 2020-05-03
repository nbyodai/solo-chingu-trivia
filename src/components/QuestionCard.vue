<template>
  <div class="flex flex-col px-5 items-center">
    <div class="w-4/5 text-center">{{ question.question }}</div>
    <div class="flex flex-wrap justify-center w-4/5 py-4">
      <div
        class="w-2/5 p-2 mx-2 my-2 bg-gray-100 shadow-md"
        v-for="[key, choice] of Object.entries(question.choices)"
        :key="key"
      >
        <div
          class="p-2 flex items-center justify-center text-sm font-semibold text-gray-700 cursor-pointer"
          @click="$emit('answered', key)"
        >{{choice}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  }
};
</script>
