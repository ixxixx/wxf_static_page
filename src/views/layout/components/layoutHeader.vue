<template>
    <div class="appheader">
        <!-- 一行 -->
        <el-row>
            <!-- 列 -->
            <el-col :span="20" >
                <span class="GSname">智慧消防报警平台</span>
            </el-col>
            <el-col :offset="5" :span="4" class="youName">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link userinfo">
                        <!-- <img class="icon" :src="userInfo.photo" alt="">
                        <span class="name">{{ userInfo.name }}</span> -->
                         <!-- <img class="icon" src="http://b-ssl.duitang.com/uploads/item/201511/13/20151113110434_kyReJ.jpeg" alt=""> -->
                        <span class="name">{{this.userInfo.userName}}</span>
                        <span class="role">{{this.userInfo.grade}}级管理员</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item ><router-link :to="{name:'Personal'}">个人信息</router-link></el-dropdown-item>
                        <el-dropdown-item @click="SignOut">
                            <a @click="SignOut"> 退 出</a>
                            </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: []
    }
  },
  methods: {
    SignOut () {
      console.log(1)
      this.$router.push('/login')
      localStorage.removeItem('userInfo')
      this.$message({
        message: '退出成功',
        type: 'success'
      })
    }
  },
  created () {
    // 从 localstorage 中取出 userInfo
    // this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    // 从 vuex 中取出 userInfo
    this.userInfo = this.$store.state.userInfo.userInfo
  }
}
</script>

<style lang="less" scoped>
.GSname{
  font-size: 33px;
  letter-spacing: 10px;
  line-height: 60px;
  // padding-left: 400px;
  display: inline-block;
  width: 100%;
  text-align: center;

  font-weight: bold;
  color: #d9faff;
}
.youName {
  margin-left: 0;
}
.userinfo {
  margin-top: 25px;
    display: flex;
    line-height: 100%;
    .name {
      font-weight: 700;
      color: #f00;
    }
    .role {
      margin-left: 20px;
      color: #fff;
    }
    i {
      // line-height: 60px;
    }
}
.el-dropdown-link {
    cursor: pointer;
}
.el-dropdown-menu__item{
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
