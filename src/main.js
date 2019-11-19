import Vue from 'vue';
import App from './App.vue';
import store from './store';
import axios from 'axios';
import router from './router';
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')