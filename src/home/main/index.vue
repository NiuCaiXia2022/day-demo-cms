<template>
  <div class="content">
    <div class="main-div">
      <!-- 头部标题 -->
      <header class="main-header">
        <!-- 面包屑 -->
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          class="main-header-left"
        >
          <div v-if="$route.meta.title==='控制台'"  class="mateTitle">
           <el-breadcrumb-item  >{{ $route.meta.title }}</el-breadcrumb-item>
          </div>
          <div v-else>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/sys/users' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </div>
        </el-breadcrumb>
      </header>
      <!-- 右下 -->
      <footer class="main-footer">
        <router-view></router-view>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {}
  },
  created () {},
  computed: {},
  methods: {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  width: 100%;
  height: 100%;
  .main-header {
    height: 65px;
    box-sizing: border-box;
    background-color: #fff;
    line-height: 65px;
    display: flex;
    border-radius: 5px;
    border-bottom: 1px solid #eee;

    .main-header-left {
      margin-left: 20px;
      font-weight: 700;
      font-size: 20px;
      width: 100%;
      line-height: 65px;
    }
  }
  .mateTitle{
    :deep .el-breadcrumb__inner{
        font-weight: 700;
    color: #000;
    }

  }

}
</style>
