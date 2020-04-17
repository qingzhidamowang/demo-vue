import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUi from 'element-ui'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import {Timeline} from 'ant-design-vue'
import VueParticles from 'vue-particles'
// import css
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon/iconfont.css'
import 'ant-design-vue/dist/antd.css'

// import js
// import routes from './router/index'
import modules from './store/store-modules'
import {formatDate} from './util/date-format'
import api from './util/api'

Vue.use(ElementUi)
Vue.use(VueAxios, Axios)
Vue.use(Vuex)
Vue.use(Timeline)
Vue.use(VueParticles)
// 将api挂载到vue的原型上
Vue.prototype.$api = api;

Axios.defaults.baseURL = '/apis'
Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
Axios.defaults.withCredentials = true

const store = new Vuex.Store({
  modules: modules
})

// const router = new VueRouter({
//   mode: 'history',
//   routes // (缩写) 相当于 routes: routes
// })

Vue.filter('date-format', function (value) {
  var date = new Date(value)
  return formatDate(date, 'yyyy-MM-dd hh:mm')
})

Vue.directive('title',  function (el, binding) {
  document.title = el.dataset.title
})

new Vue({
  store,
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
