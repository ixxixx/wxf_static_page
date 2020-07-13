<template>
  <div class="newBuild">
    <div class="projectTit">
      <p class="title">项目基本信息设置</p>
    </div>
    <el-form
      :label-position="labelPosition"
      :rules="rules"
      ref="NewsProjectform"
      :model="NewsProjectform"
      label-width="80px"
    >
      <el-form-item label="项目名称" prop="proName">
        <el-input
          v-model="NewsProjectform.proName"
          placeholder="请输入项目名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目负责人">
        <el-input
          v-model="NewsProjectform.people"
          placeholder="请输入项目负责人"
        ></el-input>
      </el-form-item>
      <el-form-item label="负责人电话" prop="phone">
        <el-input
          v-model="NewsProjectform.phone"
          placeholder="请输入负责人电话"
        ></el-input>
      </el-form-item>
            <el-form-item label="项目类型">
        <!-- <el-input v-model="NewsProjectform.proType" placeholder="请输入项目类型"></el-input> -->
        <el-radio-group v-model="NewsProjectform.proType">
          <el-radio style="color:#fff" :label="0">个人用户</el-radio>
          <el-radio style="color:#fff" :label="1">集团用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="NewsProjectform.proType === 1" label="地址">
        <v-distpicker
          :placeholders="placeholders"
          @selected="onChangedistpicker"
        ></v-distpicker>
        <el-input
          class="address"
          v-model="NewsProjectform.address"
          placeholder="详细地址"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loadingButton"
          >立即创建</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  name: 'new',
  data () {
    return {
      userInfo: {},
      labelPosition: 'left',
      NewsProjectform: {
      },
      loadingButton: false,
      placeholders: {
        province: '------ 省 ------',
        city: '------ 市 ------',
        area: '------ 区 ------'
      },
      rules: {
        phone: [
          { min: 11, max: 11, message: '长度必须为11位数字', trigger: 'blur' }
        ],
        proName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ]
      }
      // province: [],
      // address: ''
    }
  },
  components: { VDistpicker },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  methods: {
    onSubmit () {
      this.loadingButton = true
      if (this.NewsProjectform.proType === 0) {
        this.placeholders.city = ''
        this.placeholders.area = ''
        this.placeholders.province = ''
      }
      if (this.placeholders.province === '------ 省 ------') {
        this.placeholders.province = ''
      }
      if (this.placeholders.city === '------ 市 ------') {
        this.placeholders.city = ''
      }
      if (this.placeholders.area === '------ 区 ------') {
        this.placeholders.area = ''
      }
      let dto = {
        'userId': this.userInfo.userId,
        'city': this.placeholders.city,
        'county': this.placeholders.area,
        'detailAddress': this.NewsProjectform.address,
        'people': this.NewsProjectform.people,
        'phone': this.NewsProjectform.phone,
        'proName': this.NewsProjectform.proName,
        'proType': this.NewsProjectform.proType,
        'province': this.placeholders.province
      }
      this.$http.post('/pf/project', dto).then((res) => {
        console.log(res)
        this.loadingButton = false
        if (res.data.code === 0) {
          this.$message({
            message: '新建成功',
            type: 'success'
          })
          this.NewsProjectform = {}
          this.$router.push({ name: 'project/list' })
        } else {
          this.$message({
            message: '新建失败,请您输入正确',
            type: 'error'
          })
        }
      })
      // this.NewsProjectform.address = this.province + this.address
      // console.log('submit!')
    },
    onChangedistpicker (a) {
      // this.province = (a.province.value + a.city.value + a.area.value)
      this.placeholders.province = a.province.value
      this.placeholders.city = a.city.value
      this.placeholders.area = a.area.value
    }
  }
}
</script>

<style lang="less" scoped>
.newBuild {
  margin-top: 80px;
  margin-left: 150px;
  .projectTit {
    position: relative;
    // margin-top: 40px;
    margin: 5% 22%;
    margin-bottom: 40px;
    // margin-left: 330px;
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
    // margin-left: 400px;
    margin: 5% 26%;
    width: 450px;
    .el-form-item__label {
      width: 100px !important;
      color: #fff;
    }
    .el-form-item__content {
      margin-left: 100px !important;
    }
    .el-select {
      width: 100%;
    }
    .el-button {
      margin-top: 25px;
      margin-left: 110px;
    }
    .address {
      float: left;
      margin-top: 20px;
      width: 348px;
    }
  }
  /deep/.distpicker-address-wrapper {
    float: left;
    select {
      width: 113px;
      padding: 0;
      font-size: 14px;
      border-radius: 2px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
    }
  }
}
</style>
