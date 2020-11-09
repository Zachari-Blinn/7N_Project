<template>
  <div>
    <div v-if="login == true">
      <h3>login</h3>
      <div>
        <label for="user">user</label>
        <input name="user" type="text">
      </div>
      <div>
        <label for="passwor">passwor</label>
        <input name="passwor" type="passwor">
      </div>
      <div>
        <button v-on:click="login_btn()">login</button>
      </div>
    </div>
    <div v-else>
      <h3>register</h3>
      <div>
        <label for="user">user</label>
        <input name="user" type="text">
      </div>
      <div>
        <label for="passwor">passwor</label>
        <input name="passwor" type="passwor">
      </div>
      <div>
        <label for="confirm_passwor">confirm passwor</label>
        <input name="confirm_passwor" type="passwor">
      </div>
      <div>
        <button v-on:click="register_btn()">register</button>
      </div>
    </div>
    <button v-on:click="show()"></button>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: {
    msg: String
  },
  data () {
      return {
        login: true     
    }
  },
  methods: {
    show() {
      this.login = !this.login;
    },
    login_btn(){
      return true;
    },
    register_btn() {
      return true;
    }
  }
}
</script>

<style>

</style>
