<template>
  <div
    id="app"
    v-loading="loading2"
    element-loading-text="加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <header>
      <el-row>
        <el-col :span="6">
          <div class="left-top">
            <div class="menuNav">
              <el-tooltip placement="top">
                <div slot="content">返回后台首页</div>
                <i class="el-icon-menu" @click="getMenuS"></i>
              </el-tooltip>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">
            智慧消防云服务平台
          </div>
        </el-col>
        <el-col :span="6">
          <div class="box">
            <p class="time">{{ nowTime | datefilter }}</p>
          </div>
        </el-col>
      </el-row>
    </header>
    <main>
      <PAMain></PAMain>
    </main>
    <el-dialog
      class="urgentTit"
      :title="this.msgTit"
      :visible.sync="urgentDialogVisible"
      width="25%"
      center
    >
      <!-- <span>{{this.alarmData[0]}}</span> -->
      <el-form v-if="this.allSidebar[0]">
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
          <P>{{
            this.allSidebar[0].province +
              this.allSidebar[0].city +
              this.allSidebar[0].county +
              this.allSidebar[0].detailAddress
          }}</P>
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
          <el-button
            @click="urgentDialogVisible = false"
            style="margin-left: 10px"
            type="danger"
            plain
            >进入报警页面</el-button
          ></router-link
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PAMain from './PA_Main'
import moment from 'moment'
import io from 'socket.io-client'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      userInfo: '',
      userId: '',
      nowTime: new Date(), // 初始化时间
      Allture: true,
      loading2: true,
      menuS: false,
      allSidebar: [],
      urgentDialogVisible: false,
      msgTit: ''
    }
  },
  components: {
    PAMain
  },
  watch: {
    allSidebar (val, old) {
      console.log(val, '===============val')
      console.log(old, '===============old')

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
  filters: {
    datefilter: function (value) {
      return moment(value).format('YYYY年 MM月 Do H:mm:ss dddd')
    }
  },
  methods: {
    getMenuS () {
      this.$router.push({ name: 'home' })
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.userId = this.userInfo.userId
    let serverHome = 'http://xf.padssz.com:3863'
    const socket = io(serverHome, {
      'force new connection': true,
      'query': 'id=' + this.userId
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
    setTimeout(() => {
      this.loading2 = false
    }, 1000)
  },
  mounted () {
    // 定时器实时更新时间数据
    this.allSidebar = this.$store.state.Socket.sidebarInfo
    setInterval(() => {
      this.nowTime = new Date()
    }, 1000)
  }
}
</script>
<style lang="less" scoped >
/deep/.el-menu-item-group__title {
  padding: 0 !important;
}
#app {
  background: url("../../assets/background.jpg");
  // background: -webkit-gradient(linear, 0 0, 0 100%, from(#0a2971), to(#45a1ea));
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  header {
    background-color: transparent;
    width: 100%;
    height: 10%;
    .el-row {
      width: 100%;
      height: 100%;
      .el-col {
        height: 100%;
        color: #fff;
        /deep/ .left-top {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 5;
          /deep/ ul {
            margin-top: 30px;
          }
          .el-submenu {
            // background-color: #148bce;
            .el-submenu__title:hover {
              background-color: transparent;
            }
            .el-menu-item {
              width: 100%;
              min-width: 0;
              background-color: #2b2b2b;
              color: #fff;
              &.is-active {
                color: #0094ff;
              }
            }
            .el-submenu__icon-arrow {
              visibility: hidden;
            }
          }
          .el-menu {
            background-color: #3f4142;
            border: none;
          }
          .tabDiv {
            background-color: transparent;
            width: 100%;
            margin-top: 30px;
            background-color: #fff;
            .el-submenu__title {
              color: #fff;
              width: 100%;
            }
          }
          .el-menu--collapse {
            width: 190px !important;
          }
        }
      }
      .menuNav {
        position: relative;
        top: 15px;
        left: 25px;
        .el-icon-menu {
          width: 60px;
          height: 60px;
          background: rgba(105, 102, 99, 0.5);
          border-radius: 50%;
          color: #fff;
          font-size: 40px;
          text-align: center;
          line-height: 60px;
        }
      }
      .title {
        font-size: 44px;
        height: 100%;
        text-align: center;
        line-height: 2;
      }
      .box {
        position: relative;
        width: 100%;
        height: 100%;
        .time {
          margin-top: 32px;
          text-align: center;
          font-size: 20px;
        }
      }
    }
  }
  main {
    background-color: transparent;
    width: 100%;
    height: 90%;
  }
  .urgentTit {
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
    /deep/.el-dialog__title {
      font-size: 30px;
      color: #fb3205;
    }
  }
}
</style>
