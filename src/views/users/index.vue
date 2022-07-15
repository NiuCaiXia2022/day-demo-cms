<template>
  <div class="user-box">
    <!-- 用户管理 -->
    <!-- 表单 -->
    <div class="user-from">
      <el-form :inline="true" :model="userFrom" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input
            v-model.trim="userFrom.username"
            placeholder="请输入用户名"
            clearable
            @clear="getUserList"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="handleOnSubmit">
            查询
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleUserDialog('')"
            class="newAdd"
          >
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="user-table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
            <img class="user-img" :src="scope.row.avatar" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="roles" label="角色">
          <template slot-scope="scope">
            <el-tag v-for="(item, index) in scope.row.roles" :key="index">
              {{ item.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="createTime" label="注册时间"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="hanldeUserStatus(scope.row.status)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" @click="handleUserDialog(scope.row)">
              编辑
            </el-tag>
            <el-tag
              type="warning"
              size="mini"
              @click="handleDistributionRoles(scope.row)"
            >
              分配角色
            </el-tag>
            <el-tag type="danger" size="mini" @click="handleUserDelete(scope.row.id)">
              删除
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹框 -->
    <el-dialog
      :title="title"
      :visible.sync="userDialogVisible"
      :showClose="false"
      center
      width="30%"
    >
      <el-form
        :model="userDialogForm"
        :rules="rules"
        ref="userDialogForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="avatar" label="头像">
          <el-avatar :size="70" :src="userDialogForm.avatar"></el-avatar>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.trim="userDialogForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="userDialogForm.password"
            placeholder="请输入密码"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model.trim="userDialogForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="userDialogForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userDialogVisible = false"> 取消 </el-button>
          <el-button @click="handelDetermineForm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页 -->
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[2, 5, 10]"
        :page-size="size"
        layout="jumper, prev, pager, next, sizes,  total"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 分配角色  弹框-->
    <el-dialog title="提示" :visible.sync="rolesDialogVisible" width="30%" center>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色" prop="roleId">
          <el-select
            style="width: 100%"
            multiple
            v-model="ruleForm.roleId"
            placeholder="请选择角色"
          >
            <el-option
              v-for="(item, index) in ruleFormList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Name from '../../api/name'
import Roles from '../../api/roles'
export default {
  props: {},
  components: {},
  data() {
    return {
      // 表单
      userFrom: {
        username: ''
      },
      // 表格
      userList: [],
      title: '',
      // 弹框
      userDialogVisible: false, // 显示隐藏
      userDialogForm: {
        // 弹框--表单
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg',
        username: '',
        password: '',
        email: '',
        status: 1
      },
      rules: {
        //  弹框表单--角色表单公用 验证
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        roleId: [{ required: true, message: '请输入角色', trigger: 'change' }]
      },
      // 分配角色  弹框
      rolesDialogVisible: false, // 显示隐藏
      ruleForm: {
        roleId: []
      },
      roleId: '', // 保存id
      ruleFormList: [], // 分配角色 角色列表
      // 分页
      total: 0, // 总条数
      size: 5, // 每页条数
      current: 1 // 当前页码
    }
  },
  created() {
    this.getUserList()
    this.handleGetRoleList()
  },
  computed: {},
  methods: {
    // 列表数据
    async getUserList() {
      const data = {
        current: this.current,
        size: this.size,
        username: this.userFrom.username
      }
      const res = await Name.getUserList(data)
      // console.log('列表数据', res)
      this.userList = res.records
      this.total = res.total
    },
    // 角色列表
    async handleGetRoleList() {
      try {
        const data = { current: this.current, size: this.size }
        const response = await Roles.getRoleList(data)
        this.ruleFormList = response.records
        // console.log('角色列表', this.ruleFormList)
      } catch (e) {
        console.log(e)
      }
    },
    // 点击查询
    handleOnSubmit() {
      this.getUserList()
    },
    // 点击删除
    handleUserDelete(id) {
      this.$confirm(' 确定删除该条数据麽？', '提示', {
        type: 'warning'
      })
        .then(async () => {
          // 调接口
          const res = await Name.getUserDel(id)
          console.log(res)
          this.getUserList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 每页条数
    handleSizeChange(size) {
      this.size = size
      this.getUserList()
    },
    // 页数
    handleCurrentChange(change) {
      this.current = change
      this.getUserList()
    },
    // 点击按钮  增加、编辑
    handleUserDialog(id) {
      // console.log('点击按钮  增加、编辑', id)
      if (typeof id === 'object') {
        this.title = '编辑用户'
        this.handleUserBackfill(id)
      } else {
        this.title = '添加用户'
      }
      this.userDialogVisible = true
    },
    // 数据回填
    async handleUserBackfill(id) {
      const res = await Name.getUseruserInfo(id.id)
      // console.log('数据回填2', res)
      this.userDialogForm = res
    },
    // 确定
    handelDetermineForm() {
      this.$refs.userDialogForm.validate((valid) => {
        if (valid) {
          if (this.title === '编辑用户') {
            this.handleUserEdit()
          } else {
            this.handleUserAdd()
          }
        }
      })
    },
    // 编辑
    async handleUserEdit() {
      console.log('编辑', this.userDialogForm)
      const res = await Name.getUserupdata(this.userDialogForm)
      console.log('编辑', res)
      this.getUserList()
      this.$notify({
        title: '提示',
        message: '编辑用户成功',
        type: 'success'
      })
      this.handleCloseDialog() // 关闭弹窗
      this.$refs.userDialogForm.resetFields() // 重置
      // console.log('编辑', this.$refs.userDialogForm.resetFields())
    },
    // 添加
    async handleUserAdd() {
      try {
        await Name.getUserAdd()
        this.handleCloseDialog() // 关闭弹窗
        this.$notify({
          title: '提示',
          message: '添加用户成功',
          type: 'success'
        })
        this.$refs.userDialogForm.resetFields() // 重置
      } catch (error) {
        console.log(error)
      }
    },
    // 点击 分配角色
    handleDistributionRoles(row) {
      // console.log(' 点击 分配角色', row)
      // 表单的 默认为空
      this.ruleForm.roleId = []
      this.rolesDialogVisible = true // 关闭 弹框
      // 循环 row.roles   拿item.id  是角色的分配的权限 id(有的是一个有的是多个)
      console.log(' 点击 分配角色', row.roles)
      row.roles.forEach((item) => {
        this.ruleForm.roleId.push(item.id)
      })
      // 保存id
      this.roleId = row.id
      // console.log('点击 分配角色', this.ruleForm.roleId)
    },
    // 确定 角色
    handleUpRoles() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // console.log('确定 角色1', this.roleId)
          // 调用接口  id  和 表单的数据
          // const response = await Name.getUserAssign(this.roleId, this.ruleForm.roleId)
          // console.log('确定 角色2', response)
          await Name.getUserAssign(this.roleId, this.ruleForm.roleId)
          this.rolesDialogVisible = false
          this.$notify({ title: '提示', message: '更新成功', type: 'success' })
          // 调用 列表数据接口
          this.handleGetRoleList()
        }
      })
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.user-box {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  margin-top: 20px;
  .user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-tag {
    cursor: pointer;
  }
}
.el-tag {
  cursor: pointer;
}
.footer {
  float: right;
  padding-right: 25px;
}
.user-table {
  width: 1145px;
}
</style>
