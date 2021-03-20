<template>
  <div class="container">
    <form novalidate class="md-layout" @submit.prevent="register">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Register</div>
        </md-card-header>

        <md-card-content>

          <md-field>
            <label for="username">Username</label>
            <md-input name="username" id="username" type="text" v-model="form.username" :disabled="sending" autofocus />
          </md-field>

          <md-field>
            <label for="email">Email</label>
            <md-input name="email" id="email" type="email" v-model="form.email" :disabled="sending" />
          </md-field>

          <md-field>
            <label for="password">Password</label>
            <md-input id="password" type="password" v-model="form.password" :disabled="sending" />
          </md-field>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Register</md-button>
        </md-card-actions>

      </md-card>
    </form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          username: null,
          email: null,
          password: null,
          password_confirmation: null,
        },
        sending: false,
      };
    },

    methods: {
      register: function () {
        this.sending = true

        let data = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
        };
        this.$store
          .dispatch("register", data)
          .then(() => {
            this.sending = false
            this.$router.push("/")
          })
          .catch((err) => {
            this.sending = false
            console.log(err)
          });
      },
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>