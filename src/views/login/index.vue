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
  background: url("../../assets/dome3.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex; // 主轴居中：默认 水平
  justify-content: center; // 侧轴居中：默认 垂直
  align-items: center;
  .login-warp {
    width: 280/96rem;
    height: 210/96rem;
    border-radius: 10/96rem;
    padding: 15/96rem;
    background-color: rgba(206, 209, 216, 0.6);
    .logo {
      img {
        margin-left: 25%;
        width: 50%;
        height: 45/96rem;
        margin-bottom: 12/96rem;
      }
    }
    .el-form-item {
      margin-bottom: 10/96rem;
    }
    .el-input {
      width: 70%;
      height: 25/96rem;
    }
    /deep/.el-form-item__error {
      color: #f10;
      font-size: 9/96rem;
      left: 28/96rem;
    }
    .is-required {
      margin-left: 25/96rem;
    }
    .el-button--primary {
      margin-left: 60/96rem;
      margin-top: 10/96rem;
      border-radius: 6/96rem;
      width: 140/96rem;
      height: 25/96rem;
      line-height: 6/96rem;
    }
    .register {
      margin-left: 85/96rem;
      margin-right: 30/96rem;
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
