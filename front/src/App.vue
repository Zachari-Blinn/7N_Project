<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons"
    />
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created: function () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch('logout');
        }
        throw err;
      });
    });
  },
};
</script>

<style>
.container {
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>

