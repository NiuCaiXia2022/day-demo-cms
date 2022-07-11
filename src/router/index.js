import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    // redirect: 'home',
    component: () => import('../home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
