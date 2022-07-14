<template>
  <div>
    <!-- 头部 -->
    <!-- 表单 -->
    <div class="user-from">
      <el-form :inline="true" :model="userFrom" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model.trim="userFrom.user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="handleOnSubmit">
            查询
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleUserDialog('')"
            class="newAdd"
          >
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {},
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
