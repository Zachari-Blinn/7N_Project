import Vue from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(CKEditor);

//axios.defaults.baseURL = 'http://localhost:8081/';

// Auth
Vue.prototype.$http = axios;
const token = localStorage.getItem('token')

if (token) Vue.prototype.$http.defaults.headers.common['Authorization'] = token;

Vue.use(VueAxios, axios);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
