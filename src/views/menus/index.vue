<template>
  <div class="menus-box">
    <!-- 菜单管理 -->
    <!-- 表单 -->
    <div class="user-from">
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
      <el-table :data="menusList" border >
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
    <!-- <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
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
    </el-dialog> -->

    <!-- 弹框 -->
    <!-- <el-dialog :title="title" :visible.sync="userDialogVisible" :showClose="false">
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
    </el-dialog> -->
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
      size: 20, // 每页条数
      username: '', // 查询的条件
      title: '', // 弹框 标题
      menusDialogVisible: false, // 弹框 显示隐藏
      rules: {
        // 弹框表单 验证
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
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
      console.log('菜单列表数据1', res)
      res.forEach(item => {
        this.menusList.push(item)
      })
      console.log('菜单列表数据3', this.menusList)
    },
    // 查询
    handleOnSubmit() {

    },
    // 删除
    handleMenusDelete() {

    },
    // 状态
    hanldeMenusStatus() {

    },
    // 点击 添加、编辑
    handleMenusDialog() {

    },
    // 分配角色
    handleDistributionRoles() {

    }
    //

  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.menus-box {
  width: 100%;
  height: 100%;
  padding: 20px;
}
.el-tag {
  cursor: pointer;
}
</style>
