<template>
    <div class="content">
        <!-- 封装表格 -->
        <!-- 表格 -->
        <!-- <el-table :data="tableData" height="250" border style="width: 100%" @current-change="handleChange">
            <template v-for="(item,index) in column">
                <el-table-column v-if="item.type && item.type!=='action'" v-bind="item"></el-table-column>
                formatter  Function(row, column, cellValue, index)
                <el-table-column v-else-if="!item.type" v-bind="item"></el-table-column>
                <el-table-column v-else-if="item.type==='action'" v-bind="item">
                    <template slot-scope="scope">
                        <template v-for="(item, index) in item.buttons">
                            <el-button v-bind="item" @click="handleAction(item.action,scope.row)">{{item.text}}</el-button>
                        </template>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        分页
        <div class="block" v-if="pager">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"   :page-sizes="[1, 2, 3, 4]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div> -->
    </div>
</template>
<script>
export default {
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    column: {
      type: Array,
      default: () => []
    },
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 2
    },
    total: {
      type: Number,
      default: 0
    },
    pager: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
    // 子传父  按钮点击事件
    handleAction (action, row) {
      this.$emit('handleAction', { action, row })
    },
    //  子传父 点击分页条数
    handleSizeChange (size) {
      this.$emit('handleSizeChange', size)
    },
    //  子传父 点击分页页码
    handleCurrentChange (page) {
      this.$emit('handleCurrentChange', page)
    },
    // 获取当前行事件  在 goods商品管理页
    handleChange (row) {
      this.$emit('handleChange', row)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
