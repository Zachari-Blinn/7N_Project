<template>
  <div class="container">
    <form action="md-layout" @submit.prevent="validate">
      <md-card class="md-layout-item">
      
        <md-card-header>
          <div class="md-title">Topic: create</div>
        </md-card-header>

        <md-card-content>

          <md-field>
            <label for="title">Title</label>
            <md-input name="title" id="title" v-model="form.title" maxlength="64" required />
          </md-field>

          <md-field>
            <label for="content">Content</label>
            <md-textarea name="content" id="content" v-model="form.content" required ></md-textarea>
          </md-field>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <span>
            <md-button @click="$router.go(-1)">Cancel</md-button>
          </span>
          <md-button type="submit" class="md-primary">Create</md-button>
        </md-card-actions>

      </md-card>

      <md-snackbar :md-duration="4000" :md-active.sync="showSnackbarSuccess" md-persistent>
        <span>Category {{ form.title }} was created successfully!</span>
      </md-snackbar>

      <md-snackbar :md-duration="4000" :md-active.sync="showSnackbarErrored" md-persistent>
        <span>Error: {{ error }}</span>
        <md-button class="md-primary" v-on:click="validate">Retry</md-button>
      </md-snackbar>

    </form>
  </div>
</template>

<script>
export default {
  props: ["categorySlug"],

  data() {
    return {
      url: "topic",
      error: null,
      form: {
        title: null,
        content: null,
      },
      sending: false,
      showSnackbarSuccess: false,
      showSnackbarErrored: false,
    };
  },

  methods: {
    validate: function () {
      this.showSnackbarSuccess = false;
      this.showSnackbarErrored = false;

      this.sending = true;

      this.$http
        .post(this.url, {
          categorySlug: this.categorySlug,
          title: this.form.title,
          content: this.form.content
        })
        .then((response) => {
          this.$router.push(this.$router.go(-1));
          this.showSnackbarSuccess = true
        })
        .catch((error) => {
          this.showSnackbarErrored = true
          this.error = error;
          console.log(error);
        })
        .finally(() => {
          this.sending = false
        });
      },
    },

}
</script>

<style>

</style>