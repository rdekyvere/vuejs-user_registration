import login from './components/Login.vue'
import register from './components/registerNewUser.vue'

export default [
  {path: '/login', component: login},
  {path: '/', component: register},
  {path: '/register', component: register},
  {path: '/userLogout', component: login}
]
