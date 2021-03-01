<template>
  <div>
    <div v-if="data_forum">
      <table v-for="forum in data_forum" :key="forum._id">
        <caption>
          {{
            forum.title
          }}
        </caption>

        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody v-for="category in forum.categories" :key="category._id">
          <tr>
            <td>{{ category.title }}</td>
            <td>{{ category.description }}</td>
            <td>
              {{
                category.topics && category.topics.length
                  ? category.topics.length
                  : 0
              }}
            </td>
          </tr>
        </tbody>
      </table>
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
table {
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
  vertical-align: top;
}
</style>
