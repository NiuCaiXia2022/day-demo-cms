// 鉴权
import store from './store'

import router from './router'

const writeList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (store.getters.userInfo && store.getters.menus) {
      next()
    } else {
      const userInfo = await store.dispatch('user/getUserInfo')
      const menus = await store.dispatch('user/getMenuNav')
      if (userInfo && menus) {
        next()
      } else {
        next('/login')
      }
    }
  } else {
    if (writeList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
