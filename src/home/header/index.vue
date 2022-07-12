<template>
  <div class="box">
    <!-- 头部 -->
    <div class="header-icon" @click="handleHeaderIcon">
      <i class="el-icon-s-fold" ></i>
      <!-- <i class="el-icon-s-unfold" ></i> -->
    </div>
    <div class="header-right">
      <div>
        <i class="el-icon-s-fold icon right"></i>
      </div>
      <div>
        <i class="el-icon-s-fold icon right"></i>
      </div>
      <div>
        <el-avatar
          class="right"
          :src="$store.getters.userInfo.avatar"
        ></el-avatar>
      </div>
      <div class="userCommand right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{$store.getters.userInfo.username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人设置</el-dropdown-item>
            <el-dropdown-item command="userOut">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      isStatus: false
    }
  },
  created () {},
  computed: {},
  methods: {
    // 点击事件
    handleCommand (command) {
      console.log(command)
      if (command === 'userOut') return this.handleUserOut()
    },
    // 点击退出登录
    handleUserOut () {
      this.handleDelete() //  删除提示
    },
    // 删除提示
    handleDelete () {
      this.$confirm('是否确定退出登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.$notify({
            // 退出登录 提示
            title: '提示',
            message: '退出登录中···',
            type: 'success',
            duration: 1000
          })

          this.logout() // 请求退出接口

          // 跳转
          this.$router.push('/login')

          //   提示
          // this.$message({
          //   type: 'success',
          //   message: '退出登录!'
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '退出失败'
          })
        })
    },
    // 退出登录
    async logout () {
      const response = await this.$store.dispatch('user/getLogout')
      console.log('退出登录', response)
    },
    // 点击折叠按钮
    handleHeaderIcon () {}
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: #fff;
  .header-icon {
    font-size: 35px;
    width: 25px;
    height: 25px;
    margin-top: -10px;
  }
  .header-right {
    height: 60px;
    display: flex;
    align-items: center;
    text-align: center;
    .el-dropdown-link {
      color: #fff;
    }
    div {
      // width: 50px;
      .icon {
        font-size: 30px;
        color: #fff;
      }
    }
    .right {
      margin-right: 15px;
    }

    .el-dropdown {
      // width: 90px;
      font-weight: 700;
    }
  }
}
</style>
