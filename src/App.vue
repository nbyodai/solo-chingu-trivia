<template>
  <div id="app" class="container mx-auto">
    <home-header />
  </div>
</template>

<script>
import HomeHeader from "./components/Header.vue";
export default {
  name: "app",
  components: {
      HomeHeader,
  },
};
</script>

<style src="./assets/css/style.css"></style>
