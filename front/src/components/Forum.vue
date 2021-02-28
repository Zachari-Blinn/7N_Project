<template>
  <div>
    <div v-if="data_forum != null">
      {{ data_forum }}
    </div>
    <div v-if="errored != null">
      {{ errored.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Forum",

  data() {
    return {
      url: "http://localhost:8081/forum",
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
      .finally(() => (this.loading = false));
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
