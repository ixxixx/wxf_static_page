<template>
  <div class="layout">
    <el-container>
      <el-aside style="width:15%">
        <layoutasider />
      </el-aside>
      <el-container style="width:85%" class="conta">
        <el-header>
          <layoutheader />
          <!-- <el-badge
            :value="msgcacheList.length"
            :max="99"
            class="UnprocessedInfo"
          >
            <el-button
              @click="unclInfo = true"
              style="padding: 5px;background-color: #f56c6c;color: #fff"
              size="small"
              ><i style="fontSize: 18px" class="el-icon-bell"
            /></el-button>
          </el-badge> -->
          <!-- <el-button @click="stop">1111</el-button> -->
        </el-header>
        <div class="mbxNav">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item
              v-for="(item, index) in $route.meta"
              :key="index"
            >
              {{ item }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-main>
          <keep-alive :include="['new']">
            <!-- 将来请求 home, index, publish ... 路径时，优先加载 layout ，-->
            <!-- 加载完 layout 之后再用 home, index, publish 组件替换掉 layout 中的 router-view -->
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
      <el-dialog
        class="urgentTC"
        :title="this.msgTit"
        :visible.sync="urgentDialogVisible"
        width="25%"
        center
      >
        <!-- <span>{{this.alarmData[0]}}</span> -->
        <el-form v-if="this.allSidebar[0]">
          <!-- <el-form-item label="事件类型 :" label-width="150px" v-show="this.msgDesc === '紧急事件'">
          <P style="color:#f00;font-weight:700;">{{ this.allSidebar[0].msgDesc }}</P>
        </el-form-item> -->
          <el-form-item label="设备Id :" label-width="150px">
            <P>{{ this.allSidebar[0].devId }}</P>
          </el-form-item>
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
              !(
                this.allSidebar[0].province +
                this.allSidebar[0].city +
                this.allSidebar[0].county +
                this.allSidebar[0].detailAddress
              )
                ? "无"
                : this.allSidebar[0].province +
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
          <el-button plain @click="xybutton" type="warning" round
            >消音</el-button
          >
          <el-button
            type="warning"
            plain
            v-show="this.msgTit === '报警'"
            @click="Silencing"
            >复 位</el-button
          >
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
    </el-container>
    <el-drawer :visible.sync="unclInfo">
      <p class="unclInfo-tit">未处理消息列表!</p>
      <div class="unList" v-for="(item, index) in msgcacheList2" :key="index">
        <h1>报警:{{ item.msgDesc }}</h1>
        <span>设备编号：{{ item.devId }}</span>
        <span>设备类型：{{ item.devType }}</span>
        <span>项目名称:{{ item.proName }}</span>
        <span>负责人电话: {{ item.phone }}</span>
        <span>安装位置</span>
        <span>发送时间: {{ item.happenTime | dateFilter }}</span>
        <span style="width:100%">住址</span>
        <span style="width:100%">备注: {{ item.remark }}</span>
        <el-button class="fwbutton" type="warning" round>复位</el-button>
      </div>
    </el-drawer>
    <audio
      class="success"
      source
      loop
      ref="alarmMp3"
      src="@/assets/alarm.mp3"
    ></audio>
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
      msgTit: '紧急事件',
      unclInfo: false,
      msgcacheList: '',
      msgcacheList2: '',
      speech: ''
    }
  },
  watch: {
    allSidebar (val, old) {
      // console.log(val, '===============val')
      // console.log(old, '===============old')
      if (this.allSidebar) {
        speechSynthesis.cancel(this.speech)
      }
      if (old[0] !== undefined) {
        this.stop()
        this.urgentDialogVisible = true
        speechSynthesis.speak(this.speech)
        this.$refs.alarmMp3.play()
        this.$refs.alarmMp3.volume = 0.1
        if (old[0].msgType === 2) {
          this.msgTit = '报警'
        } else if (old[0].msgType === 3) {
          this.msgTit = '故障'
        }
      }
    },
    urgentDialogVisible (val, old) {
      // speechSynthesis.cancel(this.speech)
      if (val === false) {
        this.$refs.alarmMp3.currentTime = 0
        this.$refs.alarmMp3.pause()
        speechSynthesis.cancel(this.speech)
      }
    }
  },
  components: {
    layoutheader,
    layoutasider
  },
  methods: {
    Silencing () {
      const loading = this.$loading({
        lock: true,
        text: '正在处理中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$http.get(`/pf/device?devId=${this.allSidebar[0].devId}`).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$message({
            type: 'success',
            message: '复位成功!'
          })
          loading.close()
          this.urgentDialogVisible = false
        } else {
          this.$message({
            type: 'error',
            message: '复位失败'
          })
          loading.close()
        }
      })
    },
    getMsgcache () {
      this.$http.get(`/pf/welcome/msgcache?userId=${this.userInfo.userId}`).then(res => {
        // console.log(res)
        // console.log(res.data)
        // console.log(res.data.data)
        let arr
        this.msgcacheList = res.data.data
        let arr2 = []
        for (let i in this.msgcacheList) {
          // console.log(this.msgcacheList[i])
          arr = JSON.parse(this.msgcacheList[i])
          arr2.push(arr)
          // console.log(arr2)
          this.msgcacheList2 = arr2
          // console.log(this.msgcacheList2)
        }
        // this.msgcacheList = JSON.parse(this.msgcacheList)
        // console.log(JSON.parse(this.msgcacheList[0]).devId)
      })
    },
    stop () {
      // this.urgentDialogVisible = true
      // console.log(this.allSidebar[0])
      if (this.allSidebar[0].devId !== undefined) {
        this.speech = new SpeechSynthesisUtterance()
        this.speech.text = '设备编号' + this.allSidebar[0].devId + '正在发生-' + this.allSidebar[0].msgDesc + '--负责人电话为' + this.allSidebar[0].phone + '--地址为 ' + this.allSidebar[0].province + this.allSidebar[0].city + this.allSidebar[0].county + this.allSidebar[0].detailAddress
        // this.speech.text = '1-0-0-4-9-3-4 - 正在- - 报警,地址为广东省深圳市宝安新区石岩街道办 亿源达科技园'
        this.speech.lang = 'zh'
        this.speech.rate = 1
        this.speech.pitch = 1.5
        this.speech.volume = 1
      }
      // speechSynthesis.resume(this.speech)
      // this.$refs.alarmMp3.currentTime = 0
      // this.$refs.alarmMp3.pause()
      // this.$refs.alarmMp3.play()
    },
    xybutton () {
      this.$message({
        type: 'success',
        message: '消音成功!'
      })
      this.$refs.alarmMp3.currentTime = 0
      this.$refs.alarmMp3.pause()
    }
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
      let socketData = JSON.parse(data)
      console.log(socketData, 'ccccccccccccccccccc')
      socketData.happenTime = dayjs(socketData.happenTime).format('YYYY-MM-DD HH:mm:ss')
      // this.msgDesc = data.msgDesc
      // this.$store.commit('setReceiveInfo', data)
      this.$store.commit('setReceiveInfo', socketData)
    }).on('disconnect', () => {
      console.log('连接已断开。。。')
    })
    this.allSidebar = this.$store.state.Socket.sidebarInfo
    this.getMsgcache()
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
  // border: 1px solid #1176a7;
  margin-top: 5px;
  box-shadow: 0px 0px 5px #1176a7 inset, 0px 0px 5px #27a9eb;
}
/deep/.mbxNav {
  margin-top: 13px;
  margin-bottom: 13px;
  background-color: #113356;
  // border: 1px solid #1176a7;
  // box-shadow: 0px 0px 5px #1176a7 inset, 0px 0px 5px #27a9eb;
  height: 25px;
  .el-breadcrumb__inner.is-link,
  .el-breadcrumb__inner {
    color: #fff;
  }
  .el-breadcrumb {
    font-size: 14px;
    line-height: 25px;
    margin-left: 15px;
    // font-weight: bold;
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
.UnprocessedInfo {
  position: absolute;
  top: 23px;
  right: 80px;
}
/deep/.el-drawer__body {
  overflow-x: hidden;
  overflow-y: scroll;
}
.el-drawer {
  .unclInfo-tit {
    font-size: 26px;
    font-weight: 700;
    position: absolute;
    border-bottom: 1px solid #ccc;
    left: 35%;
    top: 30px;
  }
  .unList {
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
    float: left;
    height: 200px;
    background-color: #ccc;
    border-radius: 50px;
    padding: 20px;
    position: relative;
    span {
      display: inline-block;
      width: 50%;
      font-size: 16px;
    }
    .fwbutton {
      position: absolute;
      // right: 20px;
      left: 210px;
      bottom: 10px;
    }
    .xybutton {
      position: absolute;
      left: 150px;
      bottom: 10px;
    }
  }
}
</style>
