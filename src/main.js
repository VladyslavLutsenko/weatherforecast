import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import App from './App.vue'
import MainPage from './components/MainPage.vue'
import ForecastPage from './components/ForecastPage.vue'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: MainPage },
  { path: '/forecast/:name', component: ForecastPage, props: true },
]

const router = new VueRouter({
  routes
})

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  el: '#app',
  router
})
