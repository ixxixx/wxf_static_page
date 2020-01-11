<template>
  <div>
    <div class="projectTit">
      <p class="title">项目基本信息设置</p>
    </div>
    <el-form :label-position="labelPosition" ref="form" :model="NewsProjectform" label-width="80px">
      <el-form-item label="项目名称" >
        <el-input v-model="NewsProjectform.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-select v-model="NewsProjectform.region" placeholder="负责人">
          <el-option label="负责人一" value="shanghai"></el-option>
          <el-option label="负责人二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址">
      <v-distpicker :placeholders="placeholders" @selected="onChangedistpicker"></v-distpicker>
      <el-input class="address" v-model="address" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item label="是否含有建筑">
        <el-radio-group v-model="NewsProjectform.resource">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="单层建筑数" v-show="NewsProjectform.resource === 'true'">
        <el-input v-model="NewsProjectform.monolayer"></el-input>
      </el-form-item>
      <el-form-item label="多层建筑数" v-show="NewsProjectform.resource === 'true'">
        <el-input v-model="NewsProjectform.multi_layer "></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  data () {
    return {
      labelPosition: 'left',
      loginloading: false,
      NewsProjectform: {
        name: '',
        region: '',
        address: '',
        resource: '',
        monolayer: '',
        multi_layer: ''
      },
      placeholders: {
        province: '------ 省 ------',
        city: '------ 市 ------',
        area: '------ 区 ------'
      },
      province: [],
      address: ''
    }
  },
  components: { VDistpicker },
  methods: {
    onSubmit () {
      this.NewsProjectform.address = this.province + this.address
      console.log(this.NewsProjectform)
      this.loginloading = true
      // console.log('submit!')
      this.$message({
        message: '新建成功',
        type: 'success'
      })
    },
    onChangedistpicker (a) {
      this.province = (a.province.value + a.city.value + a.area.value)
    }
  }
}
</script>

<style lang="less" scoped>
.projectTit {
  position: relative;
  margin-top: 30/96rem;
  margin-bottom: 30/96rem;
  margin-left: 160/96rem;
  width: 420/96rem;
  border-bottom: 3px solid #cccccc;
  .title {
    position: absolute;
    left: 133/96rem;
    top: -11/96rem;
    width: 170/96rem;
    height: 23/96rem;
    background-color: #eee;
    text-align: center;
    line-height: 23/96rem;
    font-size: 14/96rem;
    font-weight: bold;
  }
}
/deep/.el-form {
  margin-left: 190/96rem;
  width: 360/96rem;
  .el-form-item__label {
    width: 60/96rem !important;
  }
  .el-form-item__content {
    margin-left: 78/96rem !important;
  }
  .el-select {
    width: 100%;
  }
  .el-button {
    margin-top: 17/96rem;
    margin-left: 90/96rem;
  }
  .address {
    float: left;
    width: 96/96rem;
  }
}
/deep/.distpicker-address-wrapper {
    float: left;
  select {
    width: 60/96rem;
    padding: 0 ;
    font-size:8/96rem;
    border-radius:2px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  }
</style>
