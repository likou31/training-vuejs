<template>
  <div id="app">
    <ChuckNorris v-bind:facts="facts"/>
  </div>
</template>

<script>
import ChuckNorris from './ChuckNorris.vue'
import facts from './facts'

export default {
  name: 'App',
  components: {
    ChuckNorris,
  },

  data: function(){
    return {facts};
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
