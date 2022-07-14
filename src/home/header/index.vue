<template>
  <div class="box">
    <!-- 头部 -->
    <div class="header-icon">
      <div class="header-icon-children">
        <i
          @click="handleHeaderIcon"
          :class="$store.getters.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        ></i>
      </div>
      <div class="header-closable">
        <Tags></Tags>
      </div>
    </div>
    <div class="header-right">
      <div class="header-right-div">
        <el-tooltip
          class="item"
          effect="dark"
          :content="isFullscreenTxt"
          placement="top-start"
        >
          <!-- <i class="el-icon-rank icon right full" @click="handleSubmitIcon"></i> -->
          <i class="el-icon-rank icon right full" @click="toggleScreen"></i>
        </el-tooltip>
      </div>
      <div>
        <el-tooltip
          class="item"
          effect="dark"
          content="关闭全部标签"
          placement="top-start"
        >
          <i
            class="el-icon-circle-close icon right fullscreen"
            @click="handleCloseTab"
          ></i>
        </el-tooltip>
      </div>
      <div>
        <el-avatar class="right" :src="$store.getters.userInfo.avatar"></el-avatar>
      </div>
      <div class="userCommand right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ $store.getters.userInfo.username }}
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
import Tags from '../../components/Tags'
// 全屏
import screenfull from 'screenfull'
export default {
  props: {
    isStatus: {
      type: Boolean,
      default: false
    }
  },
  components: { Tags },
  data() {
    return {
      isIcon: false,
      isFullscreen: false,
      isFullscreenTxt: '全屏'
    }
  },
  created() {},
  computed: {},
  methods: {
    // 折叠菜单
    handleHeaderIcon() {
      this.$store.dispatch('menus/setCollapse')
    },
    // 点击事件
    handleCommand(command) {
      console.log(command)
      if (command === 'userOut') return this.handleUserOut()
    },
    // 点击退出登录
    handleUserOut() {
      this.handleDelete() //  删除提示
    },
    // 删除提示
    handleDelete() {
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
    async logout() {
      const response = await this.$store.dispatch('user/getLogout')
      console.log('退出登录', response)
    },
    // 点击 全屏图标
    toggleScreen() {
      screenfull.toggle()
      this.isFullscreen = !this.isFullscreen
      this.isFullscreenTxt = this.isFullscreen === false ? '全屏' : '取消全屏'
    },

    // 点击 删除所有tagview  关闭全部标签
    handleCloseTab() {}
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.box {
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: #fff;
  .header-icon {
    font-size: 35px;
    height: 25px;
    margin-top: -10px;
    display: flex;
    .header-icon-children {
      margin-right: 10px;
    }
    .header-closable {
      height: 20px;
      line-height: 20px;
      .el-tag {
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
  .header-right {
    height: 60px;
    display: flex;
    align-items: center;
    text-align: center;
    .header-right-div {
      display: flex;
      flex-direction: column;
    }
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
  .full {
    margin-right: 20px;
    // 旋转
    transform: rotate(20deg);
    -webkit-transform: rotate(20deg);
    /*兼容-webkit-引擎浏览器*/
    -moz-transform: rotate(20deg);
    /*兼容-moz-引擎浏览器*/
  }
}
</style>
