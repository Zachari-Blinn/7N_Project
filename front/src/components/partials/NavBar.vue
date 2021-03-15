<template>
  <div>
    <md-tabs md-sync-route class="md-transparent" md-alignment="right">
      <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>
      <md-tab id="tab-about" md-label="About" to="/about"></md-tab>
      <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
      <span v-if="!isLoggedIn"> | <router-link  to="/login">Login</router-link></span>
    </md-tabs>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },

  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },

    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (
            err.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            this.$store.dispatch(logout);
          }
          throw err;
        });
      });
    },
  },
};
</script>

<style>
</style>
