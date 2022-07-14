import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.scss'
import './permission'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import screenfull from 'screenfull'

// 菜单插件
import Fragment from 'vue-fragment'

Vue.use(ElementUI)
Vue.use(Fragment.Plugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
