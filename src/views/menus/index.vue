<template>
  <div class="menus-box">
    <!-- 菜单管理 -->
    <!-- 表单 -->
    <div class="menus-from">
      <el-form :inline="true" :model="menusFrom" class="demo-form-inline">
        <el-form-item label="菜单">
          <el-input v-model.trim="menusFrom.username" placeholder="请输入菜单"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="handleOnSubmit">
            查询
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleMenusDialog('')"
            class="newAdd"
          >
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="user-table">
      <el-table :data="menusList" border>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="label" label="展示名称"></el-table-column>
        <el-table-column prop="name" label="文件名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="perms" label="唯一标识"></el-table-column>
        <el-table-column prop="icon" label="图标"></el-table-column>
        <el-table-column prop="parentId" label="类型"></el-table-column>
        <el-table-column prop="createTime" label="注册时间"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="hanldeMenusStatus(scope.row.status)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" @click="handleMenusDialog(scope.row)">
              编辑
            </el-tag>
            <el-tag
              type="warning"
              size="mini"
              @click="handleDistributionRoles(scope.row)"
            >
              分配角色
            </el-tag>
            <el-tag type="danger" size="mini" @click="handleMenusDelete(scope.row.id)">
              删除
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分配角色  弹框-->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      表单
      <el-form
        :model="menusForm"
        :rules="rules"
        ref="menusForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色" prop="roles">
          <el-select v-model="menusForm.roles" placeholder="请选择角色">
            <el-option v-for="item in menusFormList" :value="item" :key="item">
              <el-tag type="info">{{ item }}</el-tag>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 弹框 -->
    <el-dialog :title="title" :visible.sync="menusDialogVisible" :showClose="false">
      <el-form
        :model="menusDialogForm"
        :rules="rules"
        ref="userDialogForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="parentId" label="类型">
          <img :src="menusDialogForm.avatar" class="dialog-img" />
        </el-form-item>
        <el-form-item label="父级菜单" prop="name">
          <el-input
            v-model.trim="menusDialogForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="展示名称" prop="label">
          <el-input
            v-model.trim="menusDialogForm.password"
            placeholder="请输入密码"
            typeof="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="文件名称" prop="name">
          <el-select v-model="menusDialogForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-form-item>
        <el-form-item label="component" prop="component">
          <el-input
            v-model.trim="menusDialogForm.password"
            placeholder="请输入密码"
            typeof="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input
            v-model.trim="menusDialogForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="唯一标识" prop="perms">
          <el-input
            v-model.trim="menusDialogForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCloseDialog"> 取消 </el-button>
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
        layout="jumper, prev, pager, next, sizes"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Menus from '../../api/menu'
export default {
  props: {},
  components: {},
  data() {
    return {
      menusFrom: {
        username: ''
      },
      menusList: [], // 表格列表
      current: 1, // 当前页码
      size: 2, // 每页条数
      username: '', // 查询的条件
      title: '', // 弹框 标题
      menusDialogVisible: false, // 弹框 显示隐藏
      rules: {
        // 弹框表单 验证
        parentId: [{ required: true, message: '请输入类型', trigger: 'blur' }],
        component: [{ required: true, message: '请输入component', trigger: 'blur' }],
        name: [{ required: true, message: '请输入父级菜单', trigger: 'blur' }],
        label: [{ required: true, message: '请输入展示名称', trigger: 'blur' }],
        perms: [{ required: true, message: '请输入唯一标识', trigger: 'blur' }],
        status: [{ required: true, message: '请输入状态', trigger: 'blur' }]
      },
      // 弹框表单
      menusDialogForm: {
        avatar: '',
        username: '',
        password: '',
        email: '',
        status: ''
      },
      // 分配角色  弹框
      centerDialogVisible: false,
      //  分配角色  表单
      menusForm: {},
      // 分配角色 options
      menusFormList: []
    }
  },
  created() {
    this.getMenusList()
  },
  computed: {},
  methods: {
    // 列表数据
    async getMenusList() {
      const data = {
        current: this.current,
        size: this.size,
        username: this.username
      }
      const res = await Menus.getMenuList(data)
      // console.log('菜单列表数据1', res)
      res.forEach((item) => {
        this.menusList.push(item)
      })
      // console.log('菜单列表数据3', this.menusList)
    },
    // 查询
    handleOnSubmit() {
      this.username = this.menusFrom.username
      this.getMenusList()
    },
    // 删除
    handleMenusDelete(id) {
      this.$confirm(' 确定删除该条数据麽？', '提示', {
        type: 'warning'
      })
        .then(async () => {
          // 调接口
          const res = await Menus.getMenuDel(id)
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
    // 状态
    hanldeMenusStatus() {
      console.log('状态修改', status)
    },
    // 点击 添加、编辑
    handleMenusDialog(id) {
      if (typeof id === 'object') {
        this.title = '编辑角色'
        this.handleMenusBackfill(id)
      } else {
        this.title = '新增角色'
      }
      this.menusDialogVisible = true // 弹出框
    },
    // 数据回填
    handleMenusBackfill(data) {
      this.menusDialogForm = {
        name: data.name,
        code: data.code,
        remark: data.remark,
        status: data.status
      }
    },
    // 编辑
    async handleRolesEdit(data) {
      try {
        const res = await Menus.getRleupdata(data)
        console.log('编辑', res)
        this.getRolesList()
        // this.handleRestForm()
      } catch (error) {
        this.$message.success('编辑成功')
      }
    },
    // 添加
    async handleOnAdd() {
      try {
        const data = this.rolesDialogForm
        const res = await Menus.getMenuAdd(data)
        console.log('新增', res)
        this.getRolesList()
        this.handleRestForm()
      } catch (error) {
        console.log(error)
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
      this.menusDialogVisible = false
      this.handleRestForm()
    },
    // 重置
    handleRestForm() {
      this.$refs.rolesDialogForm.resetFields()
    },
    // 分配角色
    handleDistributionRoles() {},
    // 页码
    handleSizeChange(size) {
      this.size = size
      this.getMenusList()
    },
    // 页数
    handleCurrentChange(change) {
      this.current = change
      this.getMenusList()
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.menus-box {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-left: 20px;
}
.menus-from {
  padding-left: 20px;
}
.el-tag {
  cursor: pointer;
}
.user-table {
  width: 1145px;
}
</style>
