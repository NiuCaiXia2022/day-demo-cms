import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const publicRoutes = [
  {
    path: '/',
    redirect: '/index',
    meta: {
      title: '控制台',
      icon: 'el-icon-s-home'
    },
    component: () => import('../home'),
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '控制台',
          icon: 'el-icon-s-home'
        },
        component: () => import('../views/index')
      }
    ]
  },
  {
    path: '/sys',
    redirect: '/sys/users',
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-grid'
    },
    component: () => import('../home'),
    children: [
      {
        path: '/sys/users',
        name: 'users',
        meta: {
          title: '用户管理',
          icon: 'el-icon-user'
        },
        component: () => import('../views/users')
      },
      {
        path: '/sys/roles',
        name: 'roles',
        meta: {
          title: '角色管理',
          icon: 'el-icon-user-solid'
        },
        component: () => import('../views/roles')
      },
      {
        path: '/sys/menus',
        name: 'menus',
        meta: {
          title: '菜单管理',
          icon: 'el-icon-menu'
        },
        component: () => import('../views/menus')
      }
    ]

  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404')
  }

]
// 私有路由
export const privateRoutes = []

const router = new VueRouter({
  routes: publicRoutes
})

export default router
