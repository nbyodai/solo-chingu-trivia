<template>
  <div class="lds-ring" v-if="show">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    }
  }
};
</script>