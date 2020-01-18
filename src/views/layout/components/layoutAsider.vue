<template>
  <div class="asider">
    <div class="logoDiv">
      <i class="logo"></i>
    </div>
    <el-menu
      :router="true"
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
       :collapse="true"
    >
    <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <em class="asiderTitle">首页</em>
        <!-- <span slot="title">首页</span> -->
      </el-menu-item>
      <el-menu-item index="/showcase">
        <i class="el-icon-view"></i>
        <em class="asiderTitle">展示台</em>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-news"></i>
          <em class="asiderTitle">实时状况</em>
          <!-- <span>实时状况</span> -->
        </template>
        <el-menu-item-group>
          <el-submenu index="1-4" :collapse="true">
          <template slot="title">二级菜单</template>
          <el-menu-item index="/alarm/qbygbjxx">三级子菜单</el-menu-item>
        </el-submenu>
          <el-menu-item index="/personal">个人信息</el-menu-item>
          <el-menu-item index="/userInfo">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-info"></i>
          <em class="asiderTitle">报警信息</em>
          <!-- <span>报警信息</span> -->
        </template>
        <el-menu-item-group>
          <el-submenu index="alarm-1" >
          <template slot="title">NB烟感/燃气</template>
          <el-menu-item index="/alarm/qbygbjxx">全部烟感报警信息</el-menu-item>
          <el-menu-item index="/alarm/rqtcq">燃气探测器</el-menu-item>
          <el-menu-item index="/alarm/krqttcqzj">可燃气体探测器主机</el-menu-item>
          </el-submenu>
          <el-submenu index="alarm-2" >
          <template slot="title">消防报警系统</template>
          <el-menu-item index="/alarm/hzbjkzqbjxx">火灾报警控制器报警信息</el-menu-item>
          <el-menu-item index="/alarm/LORA868">LORA868</el-menu-item>
          <el-menu-item index="/alarm/GSMbjxtbjxx">GSM报警系统报警信息</el-menu-item>
          </el-submenu>
          <!-- <el-menu-item index="/alarm">NB烟感/燃气</el-menu-item>
          <el-menu-item index="/alarm">消防报警系统</el-menu-item>-->
          <el-menu-item index="/alarm">压力/液位/温湿度</el-menu-item>
          <el-menu-item index="/alarm">智慧用电系统</el-menu-item>
          <el-menu-item index="/alarm">安全报警系统</el-menu-item>
          <el-menu-item index="/showcase/baiduMap">智慧城市</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu  index="3">
        <template slot="title">
          <i class="el-icon-printer"></i>
          <em class="asiderTitle">项目管理</em>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/project/new">新建项目</el-menu-item>
          <el-menu-item index="/project/list">项目列表</el-menu-item>
          <el-menu-item index="/project/deviceConfig">设备配置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu  index="4">
        <template slot="title">
          <i class="el-icon-mobile-phone"></i>
          <em class="asiderTitle">设备管理</em>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/equipment">NB烟感/燃气</el-menu-item>
          <el-menu-item index="/equipment">消防报警系统</el-menu-item>
          <el-menu-item index="/equipment">压力/液位/温湿度</el-menu-item>
          <el-menu-item index="/equipment">智慧用电系统</el-menu-item>
          <el-menu-item index="/equipment">安全警报系统</el-menu-item>
          <el-menu-item index="/equipment">联动系统</el-menu-item>
          <el-menu-item index="/equipment">智慧城市</el-menu-item>
          <el-menu-item index="/equipment">物资管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu  index="5">
        <template slot="title">
          <i class="el-icon-document"></i>
          <em class="asiderTitle">维修/维保</em>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/repair/recordFree">维修维保</el-menu-item>
          <el-menu-item index="/repair">待确认维修单</el-menu-item>
          <el-menu-item index="/repair/NewOrder">维修下单</el-menu-item>
          <el-menu-item index="/repair">二维码</el-menu-item>
          <el-menu-item index="/repair">设备巡检</el-menu-item>
          <el-menu-item index="/repair">物资巡检</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu  index="6">
        <template slot="title">
          <i class="el-icon-star-off"></i>
          <em class="asiderTitle">增值服务</em>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/increment">短信充值</el-menu-item>
          <el-menu-item index="/increment">语音充值</el-menu-item>
          <el-menu-item index="/increment">数据云存储查询</el-menu-item>
          <el-menu-item index="/increment">数据备份</el-menu-item>
          <el-menu-item index="/increment">教育培训</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <em class="asiderTitle">系统设置</em>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/systemSetup">公司信息</el-menu-item>
          <el-menu-item index="/systemSetup">人员设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-question"></i>
          <em class="asiderTitle">帮助中心</em>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/helpCenter">热门问题</el-menu-item>
          <el-menu-item index="/helpCenter">意见反馈</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
/deep/.el-menu-item-group__title {
    padding: 0 !important;
  }
.asider {
  .logoDiv {
    width: 100%;
    height: 50/96rem;
    background: rgb(106, 193, 243);
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

  /deep/.el-menu {
    width: 100%;
    border: none;
    .asiderTitle {
      margin-left: 10px;
    }
    .el-menu-item-group {
      .el-submenu__title {
      background-color: #5e6164 !important;
    }
      li {
        box-sizing: border-box;
        background: #858c90 !important;
        border-bottom: 0.1/96rem solid rgb(117, 115, 115);
        &:hover {
          font-size: 16px;
          font-weight: bold;
          background-color: #434a50 !important;
        }
      }
    }
  }
}
</style>
