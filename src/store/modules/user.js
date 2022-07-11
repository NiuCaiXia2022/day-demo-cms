// 用户--模块化
import Login from '../../api/user'
import Storage from '../../utils/storage'

export default {
  namespaced: true,
  state: {
    token: Storage.getItem('token') || ''
  },
  mutations: {
    // token
    setToken (state, token) {
      state.token = token
      Storage.setItem('token', token)
    }
  },
  actions: {
    // 登录
    async getLogin ({ commit }, loginFrom) {
      const response = await Login.getUserLogin(loginFrom)
      console.log('登录', response)
      commit('setToken', response)
      // return response
    }
  }

}
