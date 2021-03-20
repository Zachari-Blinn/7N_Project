<template>
  <div>
    <md-tabs md-sync-route class="md-transparent" md-alignment="right">
      <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>
      <md-tab id="tab-about" md-label="About" to="/about"></md-tab>
      <md-tab v-if="isLoggedIn" id="tab-about" md-label="About" @click="logout"></md-tab>
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    </md-tabs>
  </div>
</template>

<script>
  export default {
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
  }
</script>

<style>
</style>
