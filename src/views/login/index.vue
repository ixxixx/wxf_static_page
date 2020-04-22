<template>
  <div class="login">
    <!-- 登录主页面 -->
    <div class="login-warp">
      <!-- logo区域 -->
      <div class="logo">
        <img src="../../assets/minuoLogo.png" alt="" />
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="帐号" prop="nameOrPhone">
          <el-input v-model="form.nameOrPhone" placeholder="请输入用户名或手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input type="password" v-model="form.userPwd" @keyup.enter.native="onSubmit" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div>
          <span @click="registerFormVisible = true" class="register"
            >注册帐号</span
          >
          <!-- <span @click="forgetFormVisible = true" class="forget">忘记密码</span> -->
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册帐号弹窗 -->
    <el-dialog
      title="注册帐号"
      :visible.sync="registerFormVisible"
      width="30%"
      center
    >
      <el-form ref="formzc" :model="formzc" class="zc" :rules="rulesZC">
        <el-form-item label="名称" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="formzc.userName" clearable @blur="yzName"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formzc.userPwd" clearable></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="12">
               <el-input style="width:90%" maxlength=11 v-model="formzc.phone" clearable></el-input>
            </el-col>
            <el-col :span="10">
              <el-button style="width:90%" :disabled="!!timer" @click="getvcode" type="primary">{{timer ? `${codeTime}秒后重新获取` : '获取验证码'}}</el-button>
            </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="手机验证码" :label-width="formLabelWidth">
          <el-input v-model="formzc.vcode" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="register"
          >注 册</el-button
        >
      </div>
    </el-dialog>
    <!-- 忘记密码弹窗 -->
    <el-dialog
      title="忘记密码"
      :visible.sync="forgetFormVisible"
      width="30%"
      center
    >
      <el-form :model="formwj" class="wj" :rules="rules">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="formwj.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="formwj.userPwd" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="forgetFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="forgetFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    var validateName = (rule, value, callback) => {
      setTimeout(() => {
        if (value === '') {
          callback(new Error('用户名不能为空'))
        } else if (this.yzData) {
          callback(new Error('用户名已注册'))
        } else {
          callback()
        }
      }, 800)
    }
    return {
      // 控制加载的显示
      loginloading: false,
      form: {
        nameOrPhone: '',
        userPwd: ''
      },
      rules: {
        nameOrPhone: [
          // 必填
          { required: true, message: '请输入帐号名或者手机号码', trigger: 'blur' }

        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }]
      },

      registerFormVisible: false,
      formzc: {
        phone: '',
        userName: '',
        userPwd: '',
        vcode: ''
      },
      rulesZC: {
        userName: [
          // { required: true, message: '请输入名称', trigger: 'blur' }
          { validator: validateName, trigger: 'blur' }
        ],
        phone: [
          // 限制长度
          { min: 11, max: 11, message: '长度必须为11位', trigger: 'blur' }
        ]
      },
      yzData: false,
      formwj: {
        userName: '',
        userPwd: ''
      },
      forgetFormVisible: false,
      formLabelWidth: '120px',
      // 倒计时的时候
      codeTime: 60,
      // 设置一个定时器
      timer: null
    }
  },
  methods: {
    onSubmit () {
      this.loginloading = true
      this.$refs['form'].validate(valid => {
        let dto = {
          'nameOrPhone': this.form.nameOrPhone,
          'userPwd': this.form.userPwd
        }
        this.$http.post('/pf/user/login', dto).then((res) => {
          console.log(res)
          let userInfo = res.data.data
          if (res.data.code === 0) {
            this.$router.push('/home')
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            console.log(res.data)
            this.$store.commit('setUserInfo', userInfo)
          } else if (res.data.code === 1) {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      })
    },
    yzName () {
      let userName = this.formzc.userName
      this.$http.get(`/pf/user/reg/used/${userName}`).then((res) => {
        this.yzData = res.data.data
      })
    },
    getvcode () {
      // 获取 form 表单
      // validateField(field, callback)
      // field: 要验证的字段
      // callback：验证后的回调函数
      //    errMsg：验证不通过时的提示文本
      this.$refs['formzc'].validateField('phone', errMsg => {
        let phoneNumber = this.formzc.phone
        this.$http.get(`/pf/user/reg/vcode/${phoneNumber}`).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: '发送成功,请查看手机',
              type: 'success'
            })
            // 验证通过：开启倒计时
            this.timer = setInterval(() => {
              // 时间需要减少
              this.codeTime--
              // 当时间为 0 时，需要将定时器清除
              if (this.codeTime <= 0) {
                // 清除定时器
                clearTimeout(this.timer)
                // 重置倒计时
                this.codeTime = 60
                // 将定时器重置为 null
                this.timer = null
              }
            }, 1000)
          } else if (res.data.code !== 0) {
          // 说明验证不通过
            this.$message({
              message: '手机格式错误',
              type: 'error'
            })
          }
        })
      })
    },
    register () {
      const dto = {
        'phone': this.formzc.phone,
        'userName': this.formzc.userName,
        'userPwd': this.formzc.userPwd,
        'vcode': this.formzc.vcode
      }
      this.$http.post('/pf/user/reg', dto).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.registerFormVisible = false
          this.formzc = {}
        } else {
          this.$message({
            message: '注册失败,请您输入正确',
            type: 'error'
          })
        }
      })
    },
    forget () {

    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  // background: url("../../assets/background.jpg") no-repeat;
  background: url("../../assets/timg1.png") no-repeat;
  background-size: 100% 100%;
  display: flex; // 主轴居中：默认 水平
  justify-content: center; // 侧轴居中：默认 垂直
  align-items: center;
  .login-warp {
    width: 550px;
    height: 410px;
    border-radius: 30px;
    padding: 35px;
    background-color: rgba(206, 209, 216, 0.6);
    .logo {
      img {
        margin-left: 25%;
        width: 50%;
        height: 75px;
        margin-bottom: 22px;
      }
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-input {
      width: 70%;
      height: 25px;
    }
    /deep/.el-form-item__error {
      color: #f10;
      font-size: 12px;
      padding-top: 2px;
      left: 52px;
    }
    .is-required {
      margin-left: 55px;
    }
    .el-button--primary {
      margin-left: 120px;
      margin-top: 30px;
      border-radius: 6px;
      width: 240px;
      height: 45px;
      line-height: 100%;
    }
    .register {
      margin-left: 210px;
      margin-right: 30px;
      font-size: 16px;
      cursor: pointer;
    }
    .forget {
      font-size: 16px;
      cursor: pointer;
    }
  }
  .zc {
    .el-input {
      width: 80%;
    }
  }
  .wj {
    .el-input {
      width: 80%;
    }
  }
}
</style>
