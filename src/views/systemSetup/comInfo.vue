<template>
  <div class="info">
    <h1>公司信息</h1>
    <ul>
      <li>
        <img :src="`http://xf.padssz.com:9265/pf` + cominfo.comLogo" />
        <!-- <img :src="[cominfo.comLogo === undefined ? '../../assets/background.jpg' : `/pf`+cominfo.comLogo]" /> -->
      </li>
      <li>
        <span class="left">公司名称:</span
        ><span class="rigth">{{ cominfo.comName }}</span>
      </li>
      <li>
        <span class="left">平台标题:</span
        ><span class="rigth">{{ cominfo.title }}</span>
      </li>
      <li>
        <span class="left">负 责 人:</span
        ><span class="rigth">{{ cominfo.legalPeople }}</span>
      </li>
      <li>
        <span class="left">负责电话:</span
        ><span class="rigth">{{ cominfo.legalPhone }}</span>
      </li>
      <li>
        <span class="left">公司地址:</span>
        <el-tooltip placement="top">
          <div slot="content">{{ cominfo.comAddress }}</div>
          <span class="rigth">{{ cominfo.comAddress }}</span>
        </el-tooltip>
      </li>
    </ul>
    <el-button
      type="danger"
      :class="[this.cominfo.comName ? 'buttonS' : 'buttonH']"
      round
      @click="diaChange"
      >修改公司信息</el-button
    >
    <el-button
      :class="[!this.cominfo.comName ? 'buttonS' : 'buttonH']"
      type="danger"
      round
      @click="diaChange"
      >添加公司信息</el-button
    >
    <!-- 弹框 -->
    <el-dialog
      :title="!this.cominfo.comName ? '添加公司信息' : '修改公司信息'"
      :visible.sync="dialogChange"
    >
      <el-form :model="form">
        <el-upload
          class="avatar-uploader"
          action="www.baidu.com"
          :http-request="uploadImg"
          :show-file-list="false"
        >
          <img
            :src="`http://xf.padssz.com:9265/pf` + form.comLogo"
            class="avatar"
          />
          <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="form.comName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负 责 人" :label-width="formLabelWidth">
          <el-input v-model="form.legalPeople" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="平台标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" :label-width="formLabelWidth">
          <el-input v-model="form.legalPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" :label-width="formLabelWidth">
          <el-input v-model="form.comAddress" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChange = false">取 消</el-button>
        <el-button v-show="this.form.comId" type="primary" @click="upComInfo"
          >修 改</el-button
        >
        <el-button v-show="!this.form.comId" type="primary" @click="addComInfo"
          >添 加</el-button
        >
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
      formLabelWidth: '100px',
      form: {}
    }
  },
  methods: {
    // 获取公司信息
    getComInfo () {
      let userId = this.userInfo.userId
      console.log(userId)
      this.$http.get(`/pf/company/byUserId/${userId}`).then(res => {
        console.log(res.data)
        this.cominfo = res.data.data
        if (!this.cominfo.comName) {
          this.$message({
            message: '请您填写完善的公司信息',
            type: 'warning'
          })
        }
      })
    },
    diaChange () { // 点击按钮时把内容赋值给form
      this.dialogChange = true
      let userId = this.userInfo.userId
      this.$http.get(`/pf/company/byUserId/${userId}`).then(res => {
        this.form = res.data.data
      })
    },
    addComInfo () {
      const dto = {
        userId: this.userInfo.userId,
        comAddress: this.form.comAddress,
        comLogo: this.form.comLogo,
        comName: this.form.comName,
        legalPeople: this.form.legalPeople,
        legalPhone: this.form.legalPhone
      }
      this.$http.post('/pf/company', dto).then((res) => {
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
        userId: this.userInfo.userId,
        comAddress: this.form.comAddress,
        comId: this.form.comId,
        comLogo: this.form.comLogo,
        comName: this.form.comName,
        legalPeople: this.form.legalPeople,
        legalPhone: this.form.legalPhone
      }
      this.$http.put('/pf/company', dto).then((res) => {
        this.getComInfo()
        this.$message({
          message: '信息已更新',
          type: 'success'
        })
      })
      this.dialogChange = false
    },
    uploadImg (params) {
      const fd = new FormData()
      fd.append('logo', params.file)
      this.$http.post('/pf/file/upload/logo', fd).then((res) => {
        this.form.comLogo = res.data.data
      })
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
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
    margin-bottom: 30px;
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
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
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
