<template>
  <div>
    <div v-if="data_forum">
      <div v-for="forum in data_forum" :key="forum._id">
        {{ forum.title }}
        <!-- contenu -->
      </div>
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
</style>
