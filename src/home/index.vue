<template>
  <div class="home-content">
    <!-- 首页 -->
    <div class="home-box">
      <el-container>
        <!-- <el-aside @click="handleUserIcon" :width="isStatus ? '50px' : '200px'"> -->
        <el-aside width="auto">
          <Aside></Aside>
        </el-aside>
        <el-container>
          <el-container>
            <el-header>
              <Header :isStatus="isStatus" @handleUserIcon="handleUserIcon"></Header>
            </el-header>
            <el-main>
              <Main></Main>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import Header from './header'
import Aside from './aside'
import Main from './main'
export default {
  props: {},
  components: { Header, Aside, Main },
  data() {
    return {
      isStatus: false
    }
  },
  created() {
    // console.log(this.$router.getRoutes())
  },
  computed: {},
  methods: {
    // 折叠状态
    handleUserIcon() {
      this.isStatus = !this.isStatus
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.home-content {
  width: 100vw;
  height: 100vh;

  .el-aside {
    transition: all 1s;
  }

  .el-header {
    background-color: #4ea796;
  }

  .el-main {
    background-color: #e7ecef;
    padding: 20px;
    height: calc(100vh - 60px);
  }
}
</style>
