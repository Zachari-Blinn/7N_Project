<template>
  <div class="container">
    <form class="md-layout" @submit.prevent="validateCategory">
      <md-card class="md-layout-item">

        <md-card-header>
          <div class="md-title">Category: create</div>
        </md-card-header>

        <md-card-content>

          <md-field>
            <label for="title">Title</label>
            <md-input name="title" id="title" v-model="form.title" maxlength="64" required />
          </md-field>

          <md-field>
            <label for="description">Description</label>
            <md-textarea name="description" id="description" v-model="form.description" maxlength="120"></md-textarea>
          </md-field>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary">Create</md-button>
        </md-card-actions>

      </md-card>

    <md-snackbar :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
      <span>Category {{ form.title }} was created successfully!</span>
      <md-button class="md-primary" @click="showSnackbar = false">Retry</md-button>
    </md-snackbar>

    </form>
  </div>
</template>

<script>
  export default {
    name: "Category_create",
    props: ["id"],

    data() {
      return {
        url: "category",
        errors: [],
        errored: false,
        loading: false,
        form: {
          title: null,
          description: null,
        },
        sending: false,
        showSnackbar: false,
      };
    },

    methods: {
      validateCategory: function () {
        this.sending = true

        this.axios
          .post(this.url, {
            forumId: this.id,
            title: this.form.title,
            description: this.form.description
          })
          .then((response) => {
            this.showSnackbar = true
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => {
            this.loading = false;
            this.sending = false
          });
      },
    },

  }
</script>

<style>

</style>