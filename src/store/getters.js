const getters = {
  // namespaced: true,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  authoritys: (state) => state.user.authoritys,
  menus: (state) => state.user.menus,
  isCollapse: (state) => state.menus.isCollapse,
  tags: (state) => state.tags.tags
}
export default getters
