<template>
  <div class="home">
    <NavBar/>
    <Forum/>
  </div>
</template>

<script>
import Forum from '@/components/forum/Index.vue';
import NavBar from '@/components/partials/NavBar.vue';

export default {
  name: 'Home',
  components: {
    Forum,
    NavBar,
  },
};
</script>
