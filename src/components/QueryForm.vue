<template>
    <div class="content">
        <!-- 封装表单 -->
        <!-- 行内表单 -->
        <!-- <el-form :inline="true" :model="model" ref="queryForm">
            <template v-for="(item, index) in formColumn">
                <el-form-item v-if="item.type==='input'" v-bind="item">
                    <el-input v-model.trim="model[item.prop]" v-bind="item"></el-input>
                </el-form-item>
                <el-form-item v-if="item.type==='select'" v-bind="item">
                    <el-select v-model="model[item.prop]" v-bind="item" :style="item.style">
                        <el-option v-for="(item, index) in item.payType" :key="item.type" :label="item.name" :value="item.type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="item.type==='date-picker'" v-bind="item">
                    value-format="yyyy-MM-dd"  element 的时间格式
                    <el-date-picker v-bind="item" value-format="item.value_format" v-model="model[item.prop]" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item v-if="item.type==='action'">
                    <template v-for="(item, index) in item.buttons">
                        <el-button v-bind="item" @click="handleAction(item.action)">{{item.text}}</el-button>
                    </template>
                </el-form-item>
            </template> -->
            <!-- <el-form-item class="form-item" prop="name">
                <el-input v-model.trim="model.name" placeholder="会员姓名"></el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="payType">
                <el-select v-model="model.payType" placeholder="支付类型">
                    <el-option v-for="(item, index) in payType" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                value-format="yyyy-MM-dd"  element 的时间格式
                <el-date-picker value-format="yyyy-MM-dd" v-model="model.birthday" type="date" placeholder="出生日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <el-button type="primary" @click="handleAdd">新增</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item> -->
        <!-- </el-form> -->
    </div>
</template>
<script>
export default {
  components: {},
  props: {
    model: {
      type: Object,
      default: () => { }
    },
    formColumn: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    // 子传父  点击按钮事件
    handleAction (action) {
      this.$emit('handleAction', action)
    },

    // 子组件方法  重置
    handleReset () {
      this.$refs.queryForm.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
