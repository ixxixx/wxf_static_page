<template>
  <div class="info">
    <h1>公司信息</h1>
    <ul>
      <li>
        <img :src="`/pf`+cominfo.comLogo" />
        <!-- <img :src="[cominfo.comLogo === undefined ? '../../assets/background.jpg' : `/pf`+cominfo.comLogo]" /> -->
      </li>
      <li>
        <span class="left">公司名称:</span
        ><span class="rigth">{{ cominfo.comName }}</span>
      </li>
      <li>
        <span class="left">负责人:</span
        ><span class="rigth">{{ cominfo.legalPeople }}</span>
      </li>
      <li>
        <span class="left">负责人电话:</span
        ><span class="rigth">{{ cominfo.legalPhone }}</span>
      </li>
      <li>
        <span class="left">公司地址:</span
        ><span class="rigth">{{ cominfo.comAddress }}</span>
      </li>
    </ul>
    <el-button
      type="danger"
      :class="[this.cominfo.comName ? 'buttonS' : 'buttonH']"
      round
      @click="dialogChange = true"
      >修改公司信息</el-button
    >
    <el-button
      :class="[!this.cominfo.comName ? 'buttonS' : 'buttonH']"
      type="danger"
      round
      @click="dialogChange = true"
      >添加公司信息</el-button
    >
    <!-- 弹框 -->
    <el-dialog :title="!this.cominfo.comName ? '添加公司信息' : '修改公司信息'" :visible.sync="dialogChange">
      <el-form :model="cominfo">
        <el-upload
          class="avatar-uploader"
          action="www.baidu.com"
          :http-request="uploadImg"
          :show-file-list="false"
        >
          <img :src="`/pf`+cominfo.comLogo" class="avatar" />
          <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="cominfo.comName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负 责 人" :label-width="formLabelWidth">
          <el-input
            v-model="cominfo.legalPeople"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" :label-width="formLabelWidth">
          <el-input v-model="cominfo.legalPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" :label-width="formLabelWidth">
          <el-input v-model="cominfo.comAddress" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input v-model="cominfo.insertTime" auto-complete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChange = false">取 消</el-button>
        <el-button v-show="this.cominfo.comId" type="primary" @click="upComInfo">修 改</el-button>
        <el-button v-show="!this.cominfo.comId" type="primary" @click="addComInfo">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      cominfo: {},
      dialogChange: false,
      formLabelWidth: '160px',
      form: {
      }
    }
  },
  methods: {
    // 获取公司信息
    getComInfo () {
      let userId = this.userInfo.userId
      console.log(userId)
      this.$http.get(`/pf/company/byUserId/${userId}`).then(res => {
        console.log(res.data.data, '看来是没修改成功')
        this.cominfo = res.data.data
        console.log(this.cominfo)
        if (!this.cominfo.comName) {
          this.$message({
            message: '请您填写完善的公司信息',
            type: 'warning'
          })
        }
      })
    },
    addComInfo () {
      const dto = {
        userId: this.userInfo.userId,
        comAddress: this.cominfo.comAddress,
        comLogo: this.cominfo.comLogo,
        comName: this.cominfo.comName,
        legalPeople: this.cominfo.legalPeople,
        legalPhone: this.cominfo.legalPhone
      }
      this.$http.post('/pf/company', dto).then((res) => {
        console.log(res, '11111----------------')
        this.getComInfo()
        this.$message({
          message: '信息已更新',
          type: 'success'
        })
      })
      this.dialogChange = false
    },
    // 改变公司信息
    upComInfo () {
      const dto = {
        comAddress: this.cominfo.comAddress,
        comId: this.cominfo.comId,
        comLogo: this.cominfo.comLogo,
        comName: this.cominfo.comName,
        legalPeople: this.cominfo.legalPeople,
        legalPhone: this.cominfo.legalPhone,
        userId: this.userInfo.userId
      }
      console.log(dto)
      this.$http.put('/pf/company', dto).then((res) => {
        console.log(res, '11111----------------')
        this.getComInfo()
        this.$message({
          message: '信息已更新',
          type: 'success'
        })
      })
      this.dialogChange = false
    },
    // addComInfo () {
    //   this.$http.post('/pf/company/1').then((res) => {

    //   })
    // },
    uploadImg (params) {
      const fd = new FormData()
      fd.append('logo', params.file)
      this.$http.post('/pf/file/upload/logo', fd).then((res) => {
        this.cominfo.comLogo = res.data.data
      })
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log(this.userInfo)
  },
  mounted () {
    this.getComInfo()
  }
}
</script>

<style lang="less" scoped>
.info {
  color: #d9faff;
  text-align: center;
  width: 100%;
  height: 100%;
  .el-input {
    float: left;
    width: 60%;
  }
  /deep/.el-dialog {
    width: 40%;
    .el-form-item {
      margin-left: 110px;
    }
  }

  /deep/.el-dialog__header {
    border-bottom: 2px solid #eee;
    .el-dialog__title {
      font-size: 28px;
      font-weight: 700;
    }
  }
  .buttonH {
    display: none !important;
  }
  .buttonS {
    display: inline-block !important;
  }
  .avatar {
    width: 170px;
    height: 150px;
    display: block;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 48px;
    margin-bottom: 50px;
  }
  ul {
    height: 450px;
  }
  li {
    width: 800px;
    height: 35px;
    margin: 30px auto;
    font-size: 30px;
    text-align: right;
    .left {
      margin-left: 50px;
      float: left;
      display: block;
      width: 250px;
    }
    .rigth {
      float: left;
      text-align: left;
      width: 470px;
      margin-left: 30px;
    }
    &:nth-child(1) {
      display: block;
      width: 180px;
      height: 150px;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
