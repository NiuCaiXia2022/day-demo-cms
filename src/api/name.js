// 用户接口
import http from '../utils/request'

// const get = () => {
//   return http({
//     url: '',
//     method: ''
//   })
// }

// 用户列表
//  GET /sys/user/list
const getUserList = (data) => {
  return http({
    url: `/user/list?current=${data.current}&size=${data.size}&username=${data.username}`,
    method: 'GET'
  })
}

// 新增用户  user/add
const getUserAdd = (data) => {
  return http({
    url: 'user/add',
    method: 'POST',
    data
  })
}

// user / assign / 2
// 分配角色
// POST /sys/user/assign/{userId}
const getUserAssign = (id, data) => {
  return http({
    url: `/user/assign/${id}`,
    method: 'POST',
    data
  })
}

// 删除用户
// POST /sys/user/del
const getUserDel = (id) => {
  return http({
    url: '/user/del',
    method: 'POST'
  })
}

// 更新用户
// PUT /sys/user/update
const getUserupdata = (data) => {
  return http({
    url: '/user/update',
    method: 'PUT',
    data
  })
}

// 修改当前用户的密码
// POST /sys/user/upUserPwd
const getUserupUserPwd = (data) => {
  return http({
    url: '/user/upUserPwd',
    method: 'POST'
  })
}

// 单个用户信息
// GET /sys/user/userInfo/{id}
const getUseruserInfo = (id) => {
  return http({
    url: `/user/userInfo/${id}`,
    method: 'GET'
  })
}

export default {
  getUserList,
  getUserAdd,
  getUserAssign,
  getUserDel,
  getUserupdata,
  getUserupUserPwd,
  getUseruserInfo

}
