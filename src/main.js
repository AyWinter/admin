// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import './const'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$http.async = true;
Vue.prototype.$http.defaults.withCredentials = true;
Vue.config.productionTip = false;



Vue.use(ElementUI);
Vue.use(VueRouter);


const router = new VueRouter({
  routes
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
