<template>
  <div class="layoutindex">
    <!-- 主页面 -->

    <!-- 头部 -->
    <app-header></app-header>
    <!-- 左 -->
    <app-aside></app-aside>
    <!-- 右 -->
    <app-main></app-main>
  </div>
</template>
<script>
import AppHeader from './AppHeader'
import AppAside from './AppAside'
import AppMain from './AppMain'

export default {
  components: {
    AppHeader,
    AppAside,
    AppMain
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  line-height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  background-color: #2d3a4b;
}
.aside {
  width: 230px;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 50px;
  background-color: #545c64;
  overflow: auto;
}
.main {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 50px;
  left: 230px;
  overflow: auto;
  padding: 10px;
}
</style>
