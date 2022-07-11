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

export default {
  getCaptcha,
  getUserLogin
}
