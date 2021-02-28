import Vue from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(CKEditor);

Vue.use(VueAxios, axios);

// Auth if token provided
const token = localStorage.getItem('token')

if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

axios.defaults.baseURL = 'http://localhost:8081/';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
