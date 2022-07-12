<template>
  <div class="user-box">
    <!-- 用户管理 -->
    <!-- 表单 -->
    <div class="user-from">
      <el-form :inline="true" :model="userFrom" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input
            v-model.trim="userFrom.user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            icon="el-icon-search"
            @click="handleOnSubmit"
          >
            查询
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleUserDialog(add,'')"
            class="newAdd"
          >
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="user-table">
      <el-table :data="userList.records" border style="width: 100%;">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
            <img class="user-img" :src="scope.row.avatar" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="角色"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="createTime" label="注册时间"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-tag
              type="success"
              size="mini"
              @click="handleUserDialog(edit, scope.row)"
            >
              编辑
            </el-tag>
            <el-tag
              type="warning"
              size="mini"
              @click="handleAssignRoles(scope.$index, scope.row)"
            >
              分配角色
            </el-tag>
            <el-tag
              type="danger"
              size="mini"
              @click="handleUserDelete(scope.row.id)"
            >
              删除
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--  -->
    <el-dialog title="title" :visible.sync="userDialogVisible">
      <el-form
        :model="userDialogForm"
        :rules="rules"
        ref="userRuleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像" prop="avatar">
          <el-input v-model.trim="userDialogForm.avatar"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="userDialogForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="userDialogForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="userDialogForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input type="textarea" v-model="userDialogForm.status"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userDialogForm')">
            取消
          </el-button>
          <el-button @click="resetForm('userDialogForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Name from '../../api/name'
export default {
  props: {},
  components: {},
  data () {
    return {
      userList: [], // 表格
      userFrom: {
        // 表单
        user: ''
      },
      current: 1, // 当前页码
      size: 20, // 每页条数
      username: '', // 查询的条件
      title: '',
      userDialogVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      userDialogForm: {
        avatar: '',
        username: '',
        password: '',
        email: '',
        status: ''
      }
    }
  },
  created () {
    this.getUserList()
  },
  computed: {},
  methods: {
    // 列表数据
    async getUserList () {
      const data = {
        current: this.current,
        size: this.size,
        username: this.username
      }
      const res = await Name.getUserList(data)
      console.log(res)
      this.userList = res
    },
    // 点击查询
    handleOnSubmit () {
      this.username = this.userFrom.user
      const data = {
        current: this.current,
        size: this.size,
        username: this.username
      }
      this.getUserList(data)
    },

    // 点击删除
    handleUserDelete (id) {
      this.$confirm(' 确定删除该条数据麽？', '提示', {
        type: 'warning'
      })
        .then(async () => {
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
    // 分配角色
    handleAssignRoles () {},
    //  点击  新增--编辑
    handleUserDialog (title, id) {

    },
    // 新增
    handleOnAdd () {},
    // 编辑
    handleUserEdit () {}
  },
  mounted () {}
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
</style>
