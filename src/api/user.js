// 用户 接口
import http from '../utils/request'

// token
const getCaptcha = () => {
  return http({
    url: '/captcha',
    method: 'GET'
  })
}

// 登录
const getUserLogin = (data) => {
  return http({
    url: `/login?username=${data.username}&password=${data.password}&token=${data.token}&code=${data.code}`,
    method: 'POST'
  })
}

// 退出登录
const getLogout = () => {
  return http({
    url: '/logout',
    method: 'POST'
  })
}

// 用户信息
const getUserInfo = () => {
  return http({
    url: '/user/info',
    method: 'GET'
  })
}

// 菜单  /menu/nav  用户管理
const getMenuNav = () => {
  return http({
    url: '/menu/nav',
    method: 'GET'
  })
}

export default {
  getCaptcha,
  getUserLogin,
  getMenuNav,
  getLogout,
  getUserInfo
}
