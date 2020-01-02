<template>
  <div class="asider">
    <div class="logoDiv">
      <i class="logo"></i>
    </div>
    <el-menu
      :router="true"
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
    <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>

          <el-menu-item index="/personal">个人信息</el-menu-item>
          <el-menu-item index="/userInfo">用户列表</el-menu-item>
        </el-menu-item-group>
          <el-menu-item index="1-3">最新消息</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/showcase">
        <i class="el-icon-menu"></i>
        <span slot="title">展示台</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.asider {
  .logoDiv {
    width: 100%;
    height: 50/96rem;
    background: #ccc;
    padding-top: 5/96rem;
    padding-left: 6/96rem;
    .logo {
      display: block;
      width: 100%;
      height: 50/96rem;
      background: url("../../../assets/minuoLogo.png");
      background-repeat: no-repeat;
      background-size: 90% 80%;
    }
  }
  .el-menu {
    width: 100%;
    border:none;
  }
}
</style>
