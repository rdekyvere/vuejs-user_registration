// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import Routes from './routes'
import Vuetify from 'vuetify'
import App from './App'

import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(VueFire)
Vue.use(VueRouter)
Vue.use(Vuetify)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
})
