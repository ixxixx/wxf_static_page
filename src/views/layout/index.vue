<template>
  <div class="layout">
    <el-container>
      <el-aside style="width:15%">
        <layoutasider />
      </el-aside>
      <el-container style="width:85%" class="conta">
        <el-header>
          <layoutheader />
        </el-header>
        <div class="mbxNav">
          <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in $route.meta.nav" :key="index">
    {{item}}
    </el-breadcrumb-item>
</el-breadcrumb>
        </div>
        <el-main>
        <keep-alive :include="['new']">
          <!-- 将来请求 home, index, publish ... 路径时，优先加载 layout ，-->
          <!-- 加载完 layout 之后再用 home, index, publish 组件替换掉 layout 中的 router-view -->
          <router-view/>
        </keep-alive>
        </el-main>
      </el-container>
    <el-dialog
    class="urgentTC"
      :title="this.msgTit"
      :visible.sync="urgentDialogVisible"
      width="25%"
      center>
  <!-- <span>{{this.alarmData[0]}}</span> -->
   <el-form v-if="this.allSidebar[0]">
        <!-- <el-form-item label="事件类型 :" label-width="150px" v-show="this.msgDesc === '紧急事件'">
          <P style="color:#f00;font-weight:700;">{{ this.allSidebar[0].msgDesc }}</P>
        </el-form-item> -->
        <el-form-item label="项目名称 :" label-width="150px">
          <P>{{ this.allSidebar[0].proName }}</P>
        </el-form-item>
        <el-form-item label="消息描述:" label-width="150px">
          <P>{{ this.allSidebar[0].msgDesc }}</P>
        </el-form-item>
        <el-form-item label="负责人电话 :" label-width="150px">
          <P>{{ this.allSidebar[0].phone }}</P>
        </el-form-item>
        <!-- <el-form-item label="设备类型 :" label-width="150px">
          <P>{{ this.allSidebar[0].devType }}</P>
        </el-form-item>
        <el-form-item label="危险等级 :" label-width="150px">
          <P>{{ this.allSidebar[0].dangerLevel }}</P>
        </el-form-item>
        <el-form-item label="是否为个人 :" label-width="150px">
          <el-radio-group disabled v-model="allSidebar[0].personal">
            <el-radio :label=false>否</el-radio>
            <el-radio :label=true>是</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="地址 :" label-width="150px">
          <P>{{ this.allSidebar[0].province+ this.allSidebar[0].city+ this.allSidebar[0].county+ this.allSidebar[0].detailAddress }}</P>
        </el-form-item>
        <el-form-item label="安装位置 :" label-width="150px">
          <P>{{ this.allSidebar[0].point }}</P>
        </el-form-item>
        <el-form-item label="发生时间 :" label-width="150px">
          <P>{{ this.allSidebar[0].happenTime }}</P>
        </el-form-item>
        <el-form-item label="备注 :" label-width="150px">
          <P>{{ this.allSidebar[0].remark }}</P>
        </el-form-item>
   </el-form>
  <span slot="footer" class="dialog-footer">
            <el-button type="warning" plain v-show="this.msgTit === '报警'" >消 音</el-button>
    <el-button @click="urgentDialogVisible = false">关 闭</el-button>
   <router-link :to="{ name: 'SmokeSensorEquipAlert' }">
         <el-button  @click="urgentDialogVisible = false" style="margin-left: 10px" type="danger" plain>进入报警页面</el-button></router-link>
  </span>
</el-dialog>
    </el-container>
  </div>
</template>

<script>
// 导入两个布局组件
import layoutheader from '@/views/layout/components/layoutHeader'
import layoutasider from '@/views/layout/components/layoutAsider'
import dayjs from 'dayjs'
import io from 'socket.io-client'
export default {
  data () {
    return {
      userInfo: [],
      // : '',
      faultData: '',
      allSidebar: [],
      urgentDialogVisible: false,
      msgTit: '紧急事件'
    }
  },
  watch: {
    allSidebar (val, old) {
      // console.log(val, '===============val')
      // console.log(old, '===============old')
      if (old[0] !== undefined) {
        this.urgentDialogVisible = true
        if (old[0].msgType === 2) {
          this.msgTit = '报警'
        } else if (old[0].msgType === 3) {
          this.msgTit = '故障'
        }
      }
    }
  },
  components: {
    layoutheader,
    layoutasider
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let id = this.userInfo.userId
    let serverHome = 'http://xf.padssz.com:3863'

    const socket = io(serverHome, {
      'force new connection': true,
      'query': 'id=' + id
    })
    // 连接事件
    socket.on('connect', () => {
      console.log('连接中。。。')
    }).on('auth', (data) => {
      console.log('连接后验证：' + data)
    }).on('message', (data) => {
      // 后台推送的业务的数据
      console.log(data)
      data.happenTime = dayjs(data.happenTime).format('YYYY-MM-DD HH:mm:ss')
      // this.msgDesc = data.msgDesc
      this.$store.commit('setReceiveInfo', data)
    }).on('disconnect', () => {
      console.log('连接已断开。。。')
    })
    this.allSidebar = this.$store.state.Socket.sidebarInfo
  }
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  & > .el-container {
    height: 100%;
  }
  .conta {
    background-color: #0b2349;
  }
}

.el-aside {
  background-color: #304156;
  color: #333;
}
.el-header {
  height: 70px !important;
  background-color: #082449;
  color: #000;
  border: 1px solid #1176a7;
  margin-top: 5px;
  box-shadow: 0px 0px 5px #1176a7 inset, 0px 0px 5px #27a9eb;
}
/deep/.mbxNav {
  margin-top: 13px;
  margin-bottom: 13px;
  background-color: #113356;
  border: 1px solid #1176a7;
  box-shadow: 0px 0px 5px #1176a7 inset, 0px 0px 5px #27a9eb;
  height: 55px;
  .el-breadcrumb__inner.is-link, .el-breadcrumb__inner {
    color: #fff;
  }
  .el-breadcrumb {
  font-size: 16px;
    line-height: 55px;
    margin-left: 15px;
    font-weight: bold;
  }
}
.el-main {
  background-color: #103154;
  color: #333;

}
.urgentTC {
    /deep/.el-dialog {
      margin-top: 25vh !important;
      .el-dialog__body {
        padding: 0;
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__content {
            p {
              width: 85%;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
            }
          }
        }
      }
    }
    }
/deep/.el-dialog__title {
    font-size: 30px;
    color: #fb3205;
}
</style>
