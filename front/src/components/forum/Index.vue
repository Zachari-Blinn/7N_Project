<template>
  <div class="container">

    <md-button :to="{path: '/forum/create/'}" class="md-raised">Ajouter Forum</md-button>

    <div v-if="data_forum">
      <div v-for="forum in data_forum" :key="forum._id">

        <md-table md-card class="md-elevation-5">

          <md-table-toolbar>
            <span class="md-title"> {{ forum.title }}</span>
            <md-button class="md-icon-button">
              <md-icon style="color:#A0A0A0;">notifications</md-icon>
            </md-button>
            <md-button class="md-icon-button" :to="{path: '/category/create/' + forum._id}">
              <md-icon style="color:#A0A0A0;">add</md-icon>
            </md-button>
            <md-button class="md-icon-button" :to="{path: '/forum/edit/' + forum._id}">
              <md-icon style="color:#A0A0A0;">settings</md-icon>
            </md-button>
          </md-table-toolbar>

          <md-table-row v-for="category in forum.categories" :key="category._id">
            <md-table-cell>
              <md-avatar class="md-avatar-icon">
                <md-icon>bookmarks</md-icon>
              </md-avatar>
            </md-table-cell>
            <md-table-cell>
              {{ category.title }}
              <p>{{ category.description }}</p>
            </md-table-cell>
            <md-table-cell style="text-align: center;">
              {{ category.topics && category.topics.length ? category.topics.length : 0 }}
              <p>Sujets</p>
            </md-table-cell>
            <md-table-cell style="text-align: center;">
              {{ category.topics.replies && category.topics.replies.length ? category.topics.replies.length : 0 }}
              <p>Messages</p>
            </md-table-cell>
            <md-table-cell>
              <md-list-item style="list-style: none;">
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/1" alt="People">
                </md-avatar>

                <div class="md-list-item-text">
                  <span>Ali Connors</span>
                  <span>Brunch this weekend?</span>
                  <p>I'll be in your neighborhood doing errands this week</p>
                </div>
              </md-list-item>
            </md-table-cell>
          </md-table-row>
        </md-table>

        <br>

      </div>
    </div>
    <div v-else style="text-align: center;">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>

    <div v-if="errored">
      {{ errored.message }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "Forum",

    data() {
      return {
        url: "forum",
        data_forum: null,
        errored: null,
        loading: true,
        isAdmin: false,
      };
    },

    mounted: async function () {
      this.axios
        .get(this.url)
        .then((response) => {
          this.data_forum = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  };
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .md-table-cell {
    height: 100px !important;
  }
</style>