const getters = {
  // namespaced: true,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  authoritys: (state) => state.user.authoritys,
  menus: (state) => state.user.menus
}
export default getters
