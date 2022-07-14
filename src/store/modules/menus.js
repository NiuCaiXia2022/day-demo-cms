export default {
  namespaced: true,
  state: {
    isCollapse: false
  },
  mutations: {
    setCodeMenus: (state) => {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {
    setCollapse: ({ commit }) => {
      commit('setCodeMenus')
    }
  }
}
