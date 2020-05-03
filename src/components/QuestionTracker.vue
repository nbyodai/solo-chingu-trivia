<template>
  <div class="flex flex-col px-5 my-2 items-center">
      <div class="text-center"> 
          Question {{step}} / {{ total }} 
      </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
        type: Number,
        required: true
    },
    step: {
        type: Number,
        required: true
    }
  }
};
</script>
