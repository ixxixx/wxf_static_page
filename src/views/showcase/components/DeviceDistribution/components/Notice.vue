<template>
  <el-card class="notice">
  <div slot="header" class="clearfix">
    <span class="noticeTit">欢迎进入智慧消防报警平台</span>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容信息 ' + o }}
  </div>
</el-card>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
/deep/.text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .noticeTit {
    font-size: 28px;
    font-weight: bold;
  }
  .notice {
    background-color: rgba(233, 233, 233, 0.7);
    width: 380px;
    position: absolute;
    top: 140px;
    right: 36px;
    z-index: 2;
  }
</style>
