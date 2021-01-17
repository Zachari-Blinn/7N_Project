<template>
  <div class="home">
    <NavBar/>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import NavBar from '@/components/partials/NavBar.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    NavBar,
  },
};
</script>
