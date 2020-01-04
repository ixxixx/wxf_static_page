<template>
  <div>
    <!-- <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    > -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
       :before-close="getDialog"
      width="20%"
      center
    >
      <span class="message" >{{ neirong }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="getDialog">取 消</el-button>
        <el-button type="primary" @click="getDialog"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['title', 'dialogVisible', 'neirong'],
  data () {
    return {
    }
  },
  methods: {
    getDialog () {
      this.$emit('urgentF', false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-dialog{
.el-dialog__title {
    font-size: 20px;
    color: #f10;
    font-weight: bold;
    }
    .message {
        font-size: 16px;
    }
}

</style>
