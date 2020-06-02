<template>
  <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="color:#fff;font-size:18px;font-weight:700;">用户信息</span>
        </div>
        <el-row :gutter="40">
            <el-col :span="12">
                <el-form :model="user" status-icon label-width="100px" class="demo-ruleForm">
                    <el-form-item label="手机号">
                        <el-input type="text" disabled v-model="user.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户等级">
                        <el-input type="text" disabled v-model="user.grade" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" >
                        <el-input type="text" disabled v-model="user.createTime" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="最后登录">
                        <el-input type="text" disabled v-model="user.lastTime" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input type="text" v-model="user.userName" autocomplete="off" @blur="yzName"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input type="text" v-model="user.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="user.sex">
                            <el-radio :label=0>男</el-radio>
                            <el-radio :label=1>女</el-radio>
                         </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="changeUserInfo">修改</el-button>
                    </el-form-item>
                </el-form>
            <el-button style="margin-left: 100px;" type="primary" @click="dialogChange = true" plain>重置密码</el-button>
      <!-- 修改密码 -->
            <el-dialog class="dialogXG" title="修改密码" :visible.sync="dialogChange">
      <el-form :model="changePawInfo" :rules="rules2" ref="changePawInfo">
        <el-form-item label="旧密码" label-width="150px" >
          <el-input v-model="changePawInfo.oldPwd" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="新密码" label-width="150px" prop="newPwd">
          <el-input type="password" v-model="changePawInfo.newPwd" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="确认密码" label-width="150px" prop="checkPass">
          <el-input type="password" v-model="changePawInfo.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChange = false">取 消</el-button>
        <el-button type="primary" @click="changePaw">修 改</el-button>
      </div>
    </el-dialog>
            </el-col>
            <el-col :span="12">
                <el-upload
          class="avatar-uploader"
          action="uploadUrl"
          :http-request="uploadImg"
          :show-file-list="false"
        >
          <img :src="`http://xf.padssz.com:9265/pf`+imageUrl" class="avatar" />
          <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.changePawInfo.checkPass !== '') {
          this.$refs.changePawInfo.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changePawInfo.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: {
        phone: '',
        grade: '',
        userName: '',
        headimg: '',
        userId: '',
        sex: '',
        email: ''
      },
      dialogChange: false,
      changePawInfo: {
        oldPwd: '',
        newPwd: '',
        checkPass: ''
      },
      rules2: {
        newPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      imageUrl: '', // 图片地址
      uploadUrl: 'http://xf.padssz.com:9265/pf/file/upload/headimg',
      yzData: false
    }
  },
  methods: {
    uploadImg (params) {
      const fd = new FormData()
      fd.append('headimg', params.file)
      this.$http.post('/pf/file/upload/headimg', fd).then((res) => {
        this.user.headImg = res.data.data
        this.imageUrl = this.user.headImg
        console.log(this.imageUrl, '================imageUrl')
        this.$store.commit('changeUserInfoImg', this.imageUrl)
      })
    },
    changeUserInfo () {
      const dto = {
        'email': this.user.email,
        'headImg': this.imageUrl,
        'sex': this.user.sex,
        'userId': this.user.userId,
        'userName': this.user.userName
      }
      console.log(this.yzData, '111111111111111111111`````````````````````')
      if (!this.yzData) {
        this.$http.put('/pf/user/info', dto).then((res) => {
          console.log(res)
          // 提示用户更新成功
          this.$store.commit('changeUserInfo', dto)
          console.log(dto)
          this.$message({
            message: '用户信息更新成功',
            type: 'success'
          })
        })
      } else {
        this.$message({
          message: '用户名已存在',
          type: 'error'
        })
      }
    },
    changePaw () {
      const dto = {
        'oldPwd': this.changePawInfo.oldPwd,
        'newPwd': this.changePawInfo.newPwd,
        'userId': this.user.userId
      }
      console.log(dto)

      this.$http.put('/pf/user/pwd', dto).then((res) => {
        console.log(res.data)
        if (res.data.code === 0) {
          this.dialogChange = true
          this.$message({
            type: 'success',
            message: '修改成功!请重新登录!'
          })
          this.$router.push({ name: 'login' })
        } else {
          this.$message({
            type: 'error',
            message: '信息错误,无法修改'
          })
        }
      })
    },
    // 获取图片路径
    getImageUrl () {
      var list = JSON.parse(localStorage.getItem('userInfo'))
      this.imageUrl = list.headImg
    },
    // 验证修改时名称是否重复
    yzName () {
      let userName = this.user.userName
      let userId = this.user.userId
      this.$http.get(`/pf/user/info/used/${userId}/${userName}`).then((res) => {
        this.yzData = res.data.data
        console.log(res.data.data, '')
      })
    },
    formatter (row, column) {
      return dayjs(row.createTime).format('YYYY-MM-DD')
    }
  },
  created () {
    this.user = this.$store.state.userInfo.userInfo
    this.user.createTime = dayjs(this.user.createTime).format('YYYY-MM-DD')
    this.user.lastTime = dayjs(this.user.lastTime).format('YYYY-MM-DD HH:mm:ss')
    this.getImageUrl()
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.box-card {
    background-color: #103154  !important;
    /deep/.el-form-item__label {
        color: #d9faff;
    }
}
.dialogXG {
    /deep/.el-dialog {
        width: 30%;
        .el-input{
            width: 70%;
        }
    }
    /deep/.el-form-item__label {
        color: #000;
    }
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
