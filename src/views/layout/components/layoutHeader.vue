<template>
    <div class="appheader">
        <!-- 一行 -->
        <el-row>
            <!-- 列 -->
            <el-col :span="16" >
                <span class="GSname">深 圳 市 派 安 科 技 有 限 公 司</span>
            </el-col>
            <el-col :offset="5" :span="3">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link userinfo">
                        <!-- <img class="icon" :src="userInfo.photo" alt="">
                        <span class="name">{{ userInfo.name }}</span> -->
                         <img class="icon" src="http://b-ssl.duitang.com/uploads/item/201511/13/20151113110434_kyReJ.jpeg" alt="">
                        <span class="name">某某某</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item ><router-link :to="{name:'personal'}">个人信息</router-link></el-dropdown-item>
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
      userInfo: {}
    }
  },
  methods: {
    SignOut () {
      console.log(1)
      this.$router.push('/login')
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
    this.userInfo = this.$store.state.userInfo
  }
}
</script>

<style lang="less" scoped>
.GSname{
  font-size: 16/96rem;
  line-height: 30/96rem;
  padding-left: 250/96rem;
  font-weight: bold;
}
.userinfo {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .icon {
        width: 30/96rem;
        height: 30/96rem;
        border-radius: 50%;
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
