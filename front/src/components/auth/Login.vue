<template>
  <div class="container">
    <form novalidate class="md-layout" @submit.prevent="login">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Sign in</div>
        </md-card-header>

        <md-card-content>

          <md-field>
            <label>Email</label>
            <md-input required v-model="email" type="email" placeholder="Email" />
          </md-field>

          <md-field>
            <label>Password</label>
            <md-input required v-model="password" type="password" placeholder="Password" />
          </md-field>

        </md-card-content>
        <md-card-actions>

          <md-button type="submit" class="md-primary">Login</md-button>
        </md-card-actions>

      </md-card>

    </form>
  </div>
</template>

<script>
  export default {
    name: "Login",

    data() {
      return {
        email: "",
        password: "",
      };
    },

    methods: {
      login: function () {
        let email = this.email;
        let password = this.password;
        this.$store
          .dispatch("login", {
            email,
            password
          })
          .then(() => this.$router.push("/"))
          .catch((err) => console.log(err));
      },
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>