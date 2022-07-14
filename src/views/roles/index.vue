<template>
  <div class="roles-box">
    <!-- 角色管理 -->
    <!-- 表单 -->
    <div class="roles-from">
      <el-form :inline="true" :model="userFrom" class="demo-form-inline">
        <el-form-item label="角色">
          <el-input v-model.trim="userFrom.name" placeholder="请输入角色"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="handleOnSubmit">
            查询
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleRolesDialog('')"
            class="newAdd"
          >
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="roles-table">
      <el-table :data="rolesList.records" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="name" label="角色"></el-table-column>
        <el-table-column prop="code" label="编码"> </el-table-column>
        <el-table-column prop="remark" label="描述"></el-table-column>
        <el-table-column prop="email" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch> </template
        ></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" @click="handleRolesDialog(scope.row)">
              编辑
            </el-tag>
            <el-tag type="warning" size="mini" @click="handleAssignRoles(scope.row)">
              分配权限
            </el-tag>
            <el-tag type="danger" size="mini" @click="handleRolesDelete(scope.row.id)">
              删除
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="title" :visible.sync="rolesDialogVisible" :showClose="false">
      <el-form
        :model="rolesDialogForm"
        :rules="rules"
        ref="rolesDialogForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="name" label="角色">
          <el-input
            v-model.trim="rolesDialogForm.name"
            placeholder="请输入角色"
          ></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input
            v-model.trim="rolesDialogForm.code"
            placeholder="请输入编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input
            type="textarea"
            v-model.trim="rolesDialogForm.remark"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="rolesDialogForm.status">
            <el-radio label="启用"  value="1"></el-radio>
            <el-radio label="禁用"  value="2"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCloseDialog"> 取消 </el-button>
          <el-button @click="handelDetermineForm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Roles from '../../api/roles'
export default {
  props: {},
  components: {},
  data() {
    return {
      // 表单
      userFrom: {
        user: ''
      },
      current: 1, // 当前页码
      size: 20, // 每页条数
      name: '', // 查询的条件
      rolesList: [], // 表格
      title: '', // 弹框 标题
      rolesDialogVisible: false, // 弹框 显示隐藏
      rules: {
        // 弹框表单 验证
        name: [{ required: true, message: '请输入角色', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        status: [{ required: true, message: '请输入状态', trigger: 'blur' }]
      },
      // 弹框表单
      rolesDialogForm: {
        name: '',
        code: '',
        remark: '',
        status: ''
      }
    }
  },
  created() {
    this.getRolesList()
    // console.log('角色列表数据', this.getRolesList())
  },
  computed: {},
  methods: {
    // 列表数据
    async getRolesList() {
      const data = {
        current: this.current,
        size: this.size,
        name: this.name
      }
      const res = await Roles.getRoleList(data)
      console.log('列表数据', res)
      this.rolesList = res
    },
    //  查询
    handleOnSubmit() {
      this.name = this.userFrom.name
      const data = {
        current: this.current,
        size: this.size,
        name: this.name
      }
      this.getRolesList(data)
    },
    // 删除
    handleRolesDelete(id) {
      this.$confirm(' 确定删除该条数据麽？', '提示', {
        type: 'warning'
      })
        .then(async () => {
          // 调接口
          const res = await Roles.getRoleDel(id)
          console.log(res)
          this.getRolesList()
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
    // 分配权限
    handleAssignRoles() {},
    // 点击 添加、编辑
    handleRolesDialog(id) {
      if (typeof id === 'object') {
        this.title = '编辑角色'
        this.handleRolesrBackfill(id)
      } else {
        this.title = '新增角色'
      }
      this.rolesDialogVisible = true // 弹出框
    },
    //  新增
    async handleOnAdd() {
      try {
        const data = this.rolesDialogForm
        const res = await Roles.getRoleAdd(data)
        console.log('新增', res)
        this.getRolesList()
        this.handleRestForm()
      } catch (error) {
        console.log(error)
      }
    },
    // 数据回填
    handleRolesrBackfill(data) {
      this.rolesDialogForm = {
        name: data.name,
        code: data.code,
        remark: data.remark,
        status: data.status
      }
    },
    // 编辑
    async handleRolesEdit(data) {
      try {
        const res = await Roles.getRleupdata(data)
        console.log('编辑', res)
        this.getRolesList()
        // this.handleRestForm()
      } catch (error) {
        this.$message.success('编辑成功')
      }
    },
    // 点击确定
    handelDetermineForm(id) {
      if (this.title === '编辑角色') {
        this.handleRolesEdit(id)
      } else if (this.title === '新增角色') {
        this.handleOnAdd()
      }
      this.handleCloseDialog()
    },

    //  点击取消
    handleCloseDialog() {
      this.rolesDialogVisible = false
      this.handleRestForm()
    },
    // 重置
    handleRestForm() {
      this.$refs.rolesDialogForm.resetFields()
    },
    // 状态修改
    mounted() {
      console.log('状态修改', status)
    }
  }
}
</script>

<style lang="scss" scoped>
.roles-box {
  width: 100%;
  height: 100%;
  padding: 20px;
}
.el-tag {
  cursor: pointer;
}
</style>
