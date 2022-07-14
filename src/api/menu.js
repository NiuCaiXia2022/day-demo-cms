// 菜单
// /menu/nav  用户管理

import http from '../utils/request'

/*

const get = () => {
  return http({
    url: '',
    method: ''
  })
}

*/

// 新增菜单
// POST /sys/menu/add
const getMenuAdd = () => {
  return http({
    url: '/menu/add',
    method: 'POST'
  })
}

// 删除菜单
// DELETE /sys/menu/del/{id}
const getMenuDel = () => {
  return http({
    url: '/menu/del/{id}',
    method: 'DELETE'
  })
}

// 单个菜单信息
// GET /sys/menu/info/{id}
const getMenuInfo = () => {
  return http({
    url: '/menu/info/{id}',
    method: 'GET'
  })
}

// 菜单列表
// GET /sys/menu/list
const getMenuList = (data) => {
  return http({
    url: `/menu/list?current=${data.current}&size=${data.size}&username=${data.username}`,
    method: 'GET'
  })
}

// 当前登录用户的菜单
// GET /sys/menu/nav
const getMenuNav = () => {
  return http({
    url: '/menu/nav',
    method: 'GET'
  })
}

// 更新菜单
// PUT /sys/menu/update
const getMenuupdate = () => {
  return http({
    url: '/menu/update',
    method: 'PUT'
  })
}

export default {
  getMenuAdd,
  getMenuDel,
  getMenuInfo,
  getMenuList,
  getMenuNav,
  getMenuupdate
}
