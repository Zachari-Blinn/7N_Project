<template>
  <div class="container">
    <form class="md-layout" @submit.prevent="validate">
      <md-card class="md-layout-item">

        <md-card-content>
          <md-field>
            <label for="title">Title</label>
            <md-input name="title" id="title" v-model="form.title" maxlength="64" required />
          </md-field>

          <md-field>
            <label for="description">Description</label>
            <md-textarea name="description" id="description" v-model="form.description" maxlength="120"></md-textarea>
          </md-field>

          <md-switch name="isActive" id="isActive" v-model="form.isActive">isActive</md-switch>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />


        <md-card-actions>
          <md-button @click="$router.go(-1)">Cancel</md-button>
          <md-button type="submit" class="md-primary">Edit</md-button>
        </md-card-actions>

      </md-card>

      <md-snackbar :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
        <span>Forum {{ form.title }} was edited successfully!</span>
        <md-button class="md-primary" @click="showSnackbar = false">Retry</md-button>
      </md-snackbar>

    </form>
  </div>
</template>

<script>
  export default {
    props: ["forumSlug"],

    data() {
      return {
        url: "forum",
        data_forum: null,
        loading: false,
        form: {
          title: null,
          description: null,
          isActive: null
        },
        sending: false,
        showSnackbar: false,
      };
    },

    mounted: async function () {
      this.$http
        .get(this.url + '/' + this.forumSlug)
        .then((response) => {
          this.data_forum = response.data;
          this.form.title = this.data_forum.forum.title;
          this.form.description = this.data_forum.forum.description;
          this.form.isActive = this.data_forum.forum.isActive;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    methods: {
      validate: function () {
        this.sending = true

        this.$http
          .put(this.url + '/' + this.forumSlug, {
            title: this.form.title,
            description: this.form.description,
            isActive: this.form.isActive
          })
          .then((response) => {
            this.$router.push(this.$router.go(-1));
            this.showSnackbar = true
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.sending = false;
          });
      },
    },

  }
</script>

<style>

</style>