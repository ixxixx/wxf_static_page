<template>
  <div>
    <div class="projectTit">
      <p class="title">派发维修单</p>
    </div>
      <el-form :label-position="labelPosition" ref="form" :model="NewRepairOrderform" label-width="80px">

      <el-form-item label="项目名称">
        <el-select v-model="NewRepairOrderform.name" placeholder="请选择您要下单的项目">
          <el-option label="项目一" value="shanghai"></el-option>
          <el-option label="项目二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址">
      <el-input class="address" v-model="NewRepairOrderform.address" placeholder="请输入项目派工地址"></el-input>
      </el-form-item>
      <el-form-item label="下单原因" >
        <el-input v-model="NewRepairOrderform.reason" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="下单对象">
        <el-radio-group v-model="NewRepairOrderform.target">
          <el-radio label="true">本公司人员</el-radio>
          <el-radio label="false">维保公司</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="接单人" v-show="NewRepairOrderform.target === 'true'">
        <el-select v-model="NewRepairOrderform.receiver">
          <el-option label="米若消防 13878524123" value="miruo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'left',
      loginloading: false,
      NewRepairOrderform: {
        name: '',
        address: '',
        reason: '',
        target: '',
        receiver: ''

      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.NewsProjectform)
      this.loginloading = true
      // console.log('submit!')
      this.$message({
        message: '新建成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.projectTit {
    position: relative;
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: 330px;
    width: 620px;
    border-bottom: 3px solid #ccc;
    .title {
      position: absolute;
      left: 205px;
      top: -20px;
      width: 200px;
      height: 40px;
      background-color: #103154;
      color: #fff;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      font-weight: bold;
    }
  }
/deep/.el-form {
  margin-left: 400px;
    width: 450px;
  .el-form-item__label {
    color: #fff;
    width: 100px !important;
  }
  .el-form-item__content {
    margin-left: 100px !important;
  }
  .el-select {
    width: 100%;
  }
  .el-button {
    margin-top: 25px;
    margin-left: 100px;
  }
}
</style>
