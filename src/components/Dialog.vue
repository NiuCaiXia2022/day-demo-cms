<template>
  <div class="content">
    <!-- 弹框 -->
    <!-- <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="handleDialoFromClose"
      width="500px"
    >
      验证表单
      <el-form
        :model="value"
        :rules="rules"
        ref="dialogForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form :model="model" :rules="rules" ref="dialogForm" label-width="80px" class="demo-ruleForm">
        <template v-for="(item, index) in dialogFormColumn">
          <el-form-item v-if="item.type === 'input'" v-bind="item">
            <el-input v-model.trim="value[item.prop]"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type === 'date'" v-bind="item" required>
            <el-form-item prop="birthday">
              <el-date-picker
                :value-format="item.value_format"
                type="date"
                placeholder="选择日期"
                v-model.trim="value[item.prop]"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item v-if="item.type === 'select'" v-bind="item">
            <el-select
              v-model.trim="value[item.prop]"
              placeholder="支付类型"
              style="width: 150px;"
            >
              <el-option
                v-for="(ele, i) in item.payType"
                :key="i"
                :label="ele.name"
                :value="ele.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="item.type === 'textarea'" v-bind="item">
            <el-input
              type="textarea"
              v-model.trim="value[item.prop]"
            ></el-input>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button @click="handlResetDialogFrom">取消</el-button>
          <el-button @click="handleFormDialogSubmit" type="primary">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  props: {
    title: {
      // 弹窗标题
      type: String,
      default: ''
    },
    dialogVisible: {
      // 弹窗显示隐藏
      type: Boolean,
      default: false
    },
    // 弹框 v-model 接收 父组件接收数据
    value: {
      // dialogForm
      type: Object, // 这是父组件的input的值
      default: () => {} // 这是父组件的input的事件
    },
    // 弹框  原生弹窗表单数据
    // model: {
    //     type: Object,
    //     default: () => { }
    // },
    rules: {
      // 弹窗表单验证
      type: Object,
      default: () => {}
    },
    dialogFormColumn: {
      // 弹窗表单抽离的数据
      type: Array,
      default: () => []
    }
    // 点击  X号关闭弹窗
    // handleDialoFromClose: Function
  },
  components: {},
  data () {
    return {}
  },
  methods: {
    // 点击关闭 X
    handleDialoFromClose () {
      // this.$emit('handlResetDialogFrom')
      this.handlResetDialogFrom() // 重置
    },

    // 确定
    handleFormDialogSubmit () {
      this.$emit('handleFormDialogSubmit')
    },
    // 弹框  点击取消 表单重置
    handlResetDialogFrom () {
      this.$emit('handlResetDialogFrom')
      // this.$refs['dialogForm'].resetFields()//表单重置
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped></style>
