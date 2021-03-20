import Vue from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import Axios from 'axios'
import App from './App.vue';
import router from './router';
import store from './store';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.config.productionTip = false;

Vue.use(VueMaterial)

Vue.material.locale.dateFormat = 'dd/MM/yyyy'

Vue.use(CKEditor);

Vue.prototype.$http = Axios;

// Auth if token provided
const token = localStorage.getItem('token')

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

// Axios config
Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.prototype.$http.defaults.baseURL = 'http://localhost:8081/api/';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
