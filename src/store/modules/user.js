// 用户--模块化
import Login from '../../api/user'
import Storage from '../../utils/storage'

export default {
  namespaced: true,
  state: {
    token: Storage.getItem('token') || '',
    userInfo: Storage.getItem('userInfo') || {},
    // userInfo: {},
    authoritys: Storage.getItem('authoritys') || '',
    // authoritys: '',
    menus: Storage.getItem('menus') || {}
    // isStatus: false// 折叠状态
    // menus: {}
  },
  mutations: {
    // token
    setToken (state, token) {
      state.token = token
      Storage.setItem('token', token)
    },
    // 用户信息
    userInfo (state, userInfo) {
      state.userInfo = userInfo
      Storage.setItem('userInfo', userInfo)
    },
    //  菜单
    authoritys (state, authoritys) {
      state.authoritys = authoritys
      Storage.setItem('authoritys', authoritys)
    },
    // 菜单列表
    menus (state, menus) {
      state.menus = menus
      Storage.setItem('menus', menus)
    }
    // // 折叠状态
    // icon (state, isStatus) {
    //   state.isStatus = isStatus
    // }
  },
  actions: {
    // 登录
    async getLogin ({ commit }, loginFrom) {
      const response = await Login.getUserLogin(loginFrom)
      console.log('登录', response)
      commit('setToken', response)
      // return response
    },
    // 退出
    async getLogout ({ commit }) {
      const response = await Login.getLogout()
      // console.log(response)
      commit('setToken', '')
      commit('userInfo', '')
      commit('authoritys', '')
      commit('menus', '')
      return response
    },
    // 用户信息
    async getUserInfo ({ commit }) {
      const response = await Login.getUserInfo()
      console.log('用户信息', response)
      commit('userInfo', response)
    },
    // 菜单
    async getMenuNav ({ commit }) {
      const { authoritys, menus } = await Login.getMenuNav()
      console.log('菜单', authoritys)
      console.log('菜单列表', menus)
      commit('authoritys', authoritys)
      commit('menus', menus)
    }
  }

}
