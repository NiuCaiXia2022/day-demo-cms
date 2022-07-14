// 角色
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

// 新增角色
// POST /sys/role/add
const getRoleAdd = () => {
  return http({
    url: '/role/add',
    method: 'POST'
  })
}

// 单个删除角色和批量删除
// DELETE /sys/role/del
const getRoleDel = (id) => {
  return http({
    url: '/role/del',
    method: 'DELETE'
  })
}

// 单个角色信息和已有权限信息
// GET /sys/role/info/{id}
const getRoleInfo = (id) => {
  return http({
    url: `/role/info/${id}`,
    method: 'GET'
  })
}

// 角色列表
// GET /sys/role/list
const getRoleList = (data) => {
  return http({
    url: `/role/list?current=${data.current}&size=${data.size}&name=${data.name}`,
    method: 'GET'
  })
}

// 分配权限
// POST /sys/role/perm/{roleId}
const getRolePerm = () => {
  return http({
    url: '/role/perm/{roleId}',
    method: 'POST'
  })
}

// 更新角色
// PUT /sys/role/update
const getRleupdata = (data) => {
  return http({
    url: '/role/update',
    method: 'PUT',
    data
  })
}

export default {
  getRoleAdd,
  getRoleDel,
  getRoleInfo,
  getRoleList,
  getRolePerm,
  getRleupdata
}
