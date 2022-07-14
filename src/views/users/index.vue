<template>
  <div class="user-box">
    <!-- 用户管理 -->
    <!-- 表单 -->
    <div class="user-from">
      <el-form :inline="true" :model="userFrom" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model.trim="userFrom.user" placeholder="请输入用户名"></el-input>
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
      <el-table :data="userList.records" border style="width: 100%">
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

    <!-- 分配角色  弹框-->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色" prop="roles">
          <el-select v-model="ruleForm.roles" placeholder="请选择角色">
            <el-option v-for="item in ruleFormList" :value="item" :key="item">
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
    <el-dialog :title="title" :visible.sync="userDialogVisible" :showClose="false">
      <el-form
        :model="userDialogForm"
        :rules="rules"
        ref="userDialogForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="avatar" label="头像">
          <img :src="userDialogForm.avatar" class="dialog-img" />
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
            typeof="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model.trim="userDialogForm.email"
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
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination> -->
  </div>
</template>
<script>
import Name from '../../api/name'
export default {
  props: {},
  components: {},
  data() {
    return {
      userList: [], // 表格
      userFrom: {
        // 表单
        user: ''
      },
      current: 1, // 当前页码
      size: 20, // 每页条数
      username: '', // 查询的条件
      title: '', // 弹框 标题
      userDialogVisible: false, // 弹框 显示隐藏
      rules: {
        // 弹框表单 验证
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      },
      // 弹框表单
      userDialogForm: {
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg',
        username: '',
        password: '',
        email: '',
        status: ''
      },
      // 分配角色  弹框
      centerDialogVisible: false,
      //  分配角色  表单
      ruleForm: {},
      // 分配角色 options
      ruleFormList: []
    }
  },
  created() {
    this.getUserList()
  },
  computed: {},
  methods: {
    // 列表数据
    async getUserList() {
      const data = {
        current: this.current,
        size: this.size,
        username: this.username
      }
      const res = await Name.getUserList(data)
      // console.log(res)
      this.userList = res
    },
    // 点击查询
    handleOnSubmit() {
      this.username = this.userFrom.user
      const data = {
        current: this.current,
        size: this.size,
        username: this.username
      }
      this.getUserList(data)
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
    // 分配角色 拿数据
    handleDistributionRoles(data) {
      this.centerDialogVisible = true
      // this.ruleFormList = data.roles
      // console.log('分配角色', data)
      data.roles.forEach((item) => {
        console.log('分配角色', item)
        this.ruleFormList.push(item.name)
      })
      // console.log(this.ruleFormList)
      this.hsndleUserRoles(data.id)
    },
    // 分配角色 点击确定
    async hsndleUserRoles(id) {
      try {
        const res = await Name.getUserAssign(id)
        console.log('分配角色', res)
        this.getUserList()
      } catch (error) {
        console.log(error)
      }
    },
    //  点击  新增--编辑
    handleUserDialog(id) {
      // console.log('id', typeof (id) === 'object')
      // console.log('id', id)
      if (typeof id === 'object') {
        this.title = '编辑用户'
        this.handleUserBackfill(id)
      } else {
        this.title = '添加用户'
      }
      this.userDialogVisible = true // 弹出框
    },
    // 新增
    async handleOnAdd() {
      try {
        // this.userDialogForm.avatar = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg'
        const data = this.userDialogForm
        console.log('新增', this.userDialogForm)
        const res = await Name.getUserAdd(data)
        console.log('新增', res)
        this.getUserList()
        this.handleRestForm()
      } catch (error) {
        console.log(error)
      }
    },
    // 数据回填
    handleUserBackfill(data) {
      // console.log('数据回填', data)
      this.userDialogForm = {
        avatar: data.avatar,
        username: data.username,
        password: data.password,
        email: data.email,
        status: data.status
      }
    },
    // 编辑
    async handleUserEdit(data) {
      try {
        const res = await Name.getUserupdata(data)
        console.log('编辑', res)
        this.getUserList()
        this.handleRestForm()
      } catch (error) {
        this.$message.success('编辑成功')
      }
    },
    // 点击确定
    handelDetermineForm(id) {
      if (this.title === '编辑用户') {
        this.handleUserEdit(id)
      } else if (this.title === '添加用户') {
        this.handleOnAdd()
      }
      this.handleCloseDialog()
    },
    //  点击取消
    handleCloseDialog() {
      this.userDialogVisible = false
      this.handleRestForm()
    },
    // 重置
    handleRestForm() {
      this.$refs.userDialogForm.resetFields()
      // this.userDialogForm = {
      //   avatar: '',
      //   username: '',
      //   password: '',
      //   email: '',
      //   status: ''
      // }
    },
    // 状态修改
    hanldeUserStatus(status) {
      console.log('状态修改', status)
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.user-box {
  width: 100%;
  height: 100%;
  padding: 20px;
  // .user-from {

  // }
  .user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-tag {
    cursor: pointer;
  }
}
.dialog-img {
  width: 50px;
  height: 50px;
}
.el-tag {
  cursor: pointer;
}
</style>
