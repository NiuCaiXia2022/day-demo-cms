<template>
  <div class="content">
    <!-- 左边 -->

    <!-- <i class="el-icon-location"></i> -->

    <!-- @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse" -->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#232d33"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      router
      unique-opened
    >
      <MenuItem
        v-for="(item, index) in menuList"
        :key="index"
        :menu="item"
      ></MenuItem>
    </el-menu>
  </div>
</template>
<script>
// 菜单组件
import MenuItem from '../../components/MenuItem'
// utils 文件  去除空children
import { filterMenuData } from '../../utils/menulist'
// utils 文件  处理路由数据
// import { filterRouter, generateMenus } from '../../utils/menu'
export default {
  props: {},
  components: { MenuItem },
  data () {
    return {
      menuList: [],
      isCollapse: false
    }
  },
  created () {
    const data = localStorage.getItem('menus')
    this.menuList = JSON.parse(data)
    // 去空
    filterMenuData(this.menuList)
    // console.log(' 去空', this.menuList)
    // 筛选
  },
  computed: {},
  methods: {
  },
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
