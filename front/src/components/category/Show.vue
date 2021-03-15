<template>
  <div class="container">
    <div v-if="data">
      <md-table md-card class="md-elevation-5">

        <md-table-toolbar>
          <span class="md-title"> {{ data.category.title }}</span>
          <md-button class="md-icon-button">
            <md-icon style="color:#A0A0A0;">notifications</md-icon>
          </md-button>
          <md-button class="md-icon-button" :to="{path: '/topic/create/' + data.category._id}">
            <md-icon style="color:#A0A0A0;">add</md-icon>
          </md-button>
          <md-button class="md-icon-button" :to="{path: '/category/edit/' + data.category._id}">
            <md-icon style="color:#A0A0A0;">settings</md-icon>
          </md-button>
        </md-table-toolbar>

        <md-table-row v-for="topic in data.category.topics" :key="topic._id">
          <md-table-cell>
            <md-avatar class="md-avatar-icon">
              <md-icon>bookmarks</md-icon>
            </md-avatar>
          </md-table-cell>
          <md-table-cell>
            {{ topic.name }}
            <p>{{ topic.content }}</p>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "category_show",
    props: ["slugCategory"],

    data() {
      return {
        url: "category",
        data: null,
        errored: null,
        loading: true,
      };
    },

    mounted: async function () {
      this.axios
        .get(`${this.url}/${this.slugCategory}`, {
          params: {
            populate: 'topics'
          }
        })
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          this.errored = true;
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

  }
</script>

<style scoped>
  .md-table-cell {
    height: 100px !important;
  }
</style>