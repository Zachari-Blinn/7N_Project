<template>
  <div class='hello'>
    <b-container>

    <b-button v-b-toggle.collapse-3 class="m-1">Toggle Collapse</b-button>
      <b-collapse visible id="collapse-3">
    <b-table hover :items="items" :fields="fields"></b-table>
  </b-collapse>
      </b-container>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
  },
  components: {
  },
  data() {
    return {
      fields: ['', '', '', '', ''],
      items: [
        { icon: 40, title: 'Dickerson', description: 'Macdonald', topic_number: 18, message_number: 24 },
        { icon: 21, title: 'Larsen', description: 'Shaw', topic_number: 547, message_number: 3.5 },
        { icon: 89, title: 'Geneva', description: 'Wilson', topic_number: 28, message_number: 1.0 },
        { icon: 38, title: 'Jami', description: 'Carney', topic_number: 45, message_number: 7.9 },
      ],
    };
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
