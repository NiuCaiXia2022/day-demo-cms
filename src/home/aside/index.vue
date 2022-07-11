<template>
  <div class="content">
    <!-- 左边 -->

    <!-- @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse" -->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#232d33"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">控制台</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">角色管理</el-menu-item>
          <el-menu-item index="1-3">菜单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
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
  height: 100vh;
  width: 200px;
  background-color: #232d33;
  .el-menu-vertical-demo {
    border: none !important;
  }
}
</style>
