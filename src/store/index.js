import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import tags from './modules/tags'
import menus from './modules/menus'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    tags,
    menus
  }
})
