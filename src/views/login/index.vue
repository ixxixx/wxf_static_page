<template>
  <div class="login">
    <!-- 登录主页面 -->
    <div class="login-warp">
      <!-- logo区域 -->
      <div class="logo">
        <img src="../../assets/minuoLogo.png" alt="" />
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="帐号" prop="accounts">
          <el-input v-model="form.accounts"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <div>
          <span @click="registerFormVisible = true" class="register"
            >注册帐号</span
          >
          <span @click="forgetFormVisible = true" class="forget">忘记密码</span>
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
      <el-form :model="formzc" class="zc" :rules="rules">
        <el-form-item label="帐号" :label-width="formLabelWidth">
          <el-input v-model="formzc.accounts" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formzc.password" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerFormVisible = false"
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
          <el-input v-model="formwj.accounts" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="formwj.password" clearable></el-input>
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
    return {
      // 控制加载的显示
      loginloading: false,
      form: {
        accounts: '13753217896',
        password: '123456'
      },
      rules: {
        accounts: [
          // 必填
          { required: true, message: '请输入号码', trigger: 'blur' },
          // 限制长度
          { min: 11, max: 11, message: '长度必须为11位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }]
      },
      registerFormVisible: false,
      formzc: {
        accounts: '',
        password: ''
      },
      formwj: {
        accounts: '',
        password: ''
      },
      forgetFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    onSubmit () {
      this.loginloading = true
      this.$refs['form'].validate(valid => {
        if (this.form.accounts === '13753217896' && this.form.password === '123456') {
          // this.$store.dispatch('setToken', this.form.accounts)
          // window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.$router.push('/home')
          this.$message({
            message: '登录成功',
            type: 'success'
          })
        } else {
          this.$message.error('帐号或密码错误')
        }
      })
    },
    register () {

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
  background: url("../../assets/background.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex; // 主轴居中：默认 水平
  justify-content: center; // 侧轴居中：默认 垂直
  align-items: center;
  .login-warp {
    width: 550px;
    height: 410px;
    border-radius: 10px;
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
      margin-left: 165px;
      margin-right: 30px;
      cursor: pointer;
    }
    .forget {
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
