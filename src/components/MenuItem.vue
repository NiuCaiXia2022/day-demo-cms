<template>
  <span>
      <el-menu-item :index="item.path"  v-if="!item.children||item.children.length<=0">
        <i class="el-icon-location"></i>
        <span>{{ item.label }}</span>
      </el-menu-item>
         <el-submenu :index="item.path" v-else>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.label }}</span>
        </template>
         <el-menu-item :index="tree.path"  v-for="tree in item.children" :key="tree.id">
        <i class="el-icon-location"></i>
        <span>{{ tree.label }}</span>
      </el-menu-item>
         </el-submenu>
  </span>
</template>
<script>
export default {
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data () {
    return {
      item: this.menu
    }
  },
  created () {
    console.log('1', this.item)
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
.menuList {
  width: 200px;
  height: 100vh;
}
</style>
