<template>
  <div id="app">
    <LoginRegister/>
  </div>
</template>

<script>
import LoginRegister from './components/login_register.vue'

export default {
  name: 'App',
  components: {
    LoginRegister
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
