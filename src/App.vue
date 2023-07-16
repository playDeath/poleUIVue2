<template>
  <div id="app">
    <my-Progress :percent="percent" :stroke-width="40" status="success" text-inside/>
    <my-Progress :percent="100" :stroke-width="40" status="wrong"/>
    <my-Progress :percent="percent" :stroke-width="40"/>
    <!-- <Progress :percent="25" status="success"/>
    <Progress :percent="45" status="active" text-inside :stroke-width="100"/> -->
    <Progress :percent="65" status="active" vertical/>
    <!-- <Progress :percent="100" />
    <Progress :percent="25" hide-info /> -->
  </div>
</template>

<script>
import myProgress from './components/Progress.vue'

export default {
  name: 'App',
  components: {
    myProgress
  },
  data() {
    return {
      percent: 0
    }
  },
  created() {
    setTimeout(() => {
      this.percent = 50
    }, 1000)
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
  width: 400px;
  height: 100vh;
}
</style>
