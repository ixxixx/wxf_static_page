<template>
  <div class="eq-main">
    <div class="map">
      <el-tabs v-model="shouxuan" type="card" @tab-click="handleClick">
        <el-tab-pane label="矢量 图" name="first">
          <div id="china-map" style="height:100%" :class="[$route.name === 'showcase' ? 'bgshow' : 'bghide']"></div>
        </el-tab-pane>
        <el-tab-pane label="百度地图" name="second">
          <BaiDuMap></BaiDuMap>
        </el-tab-pane>
        <el-tab-pane  label="消防CRT" disabled> </el-tab-pane>
      </el-tabs>
    </div>
    <Notice v-show="$route.name === 'home'"></Notice>
    <div class="total-title" v-show="$route.name === 'showcase' && this.shouxuan === 'first'">
      <ul>
        <li :class="{ Acolor: this.colorShow[0] }" @click="allGetPointData">全部</li>
        <li :class="{ Acolor: this.colorShow[1] }" @click="dqaqGetPointData">电器安全</li>
        <li :class="{ Acolor: this.colorShow[2] }" @click="rqtcbjGetPointData ">燃气探测警报</li>
        <li :class="{ Acolor: this.colorShow[3] }" @click="hzywbjGetPointData ">火灾烟雾警报</li>
        <li :class="{ Acolor: this.colorShow[4] }" @click="wlwgGetPointData ">物联网关</li>
      </ul>
    </div>
    <i @click="navB" v-show="!navShow " class="el-icon-circle-plus navjia"></i>
    <div class="nav" v-show="navShow && $route.name === 'showcase'" @dblclick="navS">
      <ul class="ul-six">
        <li>
          <i></i>
          <p>电器安全</p>
        </li>
        <li>
          <i></i>
          <p>烟 感</p>
        </li>
        <li>
          <i></i>
          <p>燃 气</p>
        </li>
        <li>
          <i></i>
          <p>物联网网关</p>
        </li>
        <li>
          <i></i>
          <p>LoRa</p>
        </li>
        <li>
          <i></i>
          <p  @click.stop="Urgentmessage">NB</p>
        </li>
      </ul>
      <i @click="navS" class="el-icon-error" v-show="navShow"></i>
    </div>
    <!-- 侧边栏 -->
    <i
      @click="sidebarB"
      v-show="!sidebarShow"
      class="el-icon-circle-plus sidebarjia"
    ></i>
    <div class="sidebar" v-show="sidebarShow && $route.name === 'showcase'" @dblclick="sidebarS">
      <div @click.once="clickAddsjzt" class="sidebar-title">事件状态
      <i @click.stop="sidebarS" class="el-icon-error" v-show="sidebarShow"></i>

      </div>
      <ul>
        <li v-for="(item, index) in this.sjztData" :key="index" class="sidebar-one notes">
          <div class="yuan"><p>{{item.title}}</p></div>
          <span class="time">{{item.time}}</span>
          <span class="address">{{item.address}}</span>
        </li>
      </ul>
    </div>
    <!-- 底部 -->
    <Footer v-show="$route.name === 'showcase'"></Footer>
    <Urgent v-show="$route.name === 'showcase'" :title="title" :dialogVisible="dialogVisible" :neirong="neirong" @urgentF="urgentF"></Urgent>

    <router-link :to="{name:'showcase'}"><el-button v-show="$route.name === 'home'" round class="btnOn">进入展示台</el-button></router-link>
  </div>
</template>

<script>
import './china'
import Footer from './components/Footer'
import BaiDuMap from './components/BaiDuMap'
import Urgent from './components/Urgent'
import Notice from './components/Notice'
// import axios from 'axios'
export default {
  name: 'mapbox',
  data () {
    return {
      title: '紧急火警', // 弹窗主题
      dialogVisible: false, // 弹窗显示
      neirong: '这是传递给父组件的内容:大浪地区发生火警', // 弹窗显示内容
      chinaMapec: null,
      shouxuan: 'first',
      sidebarShow: true,
      navShow: true,
      colorShow: [], // 点击时的颜色
      optData: [], // 获取optData
      optData1: [], // 获取optData1
      optData2: [], // 获取optData2
      optData3: [], // 获取optData3
      optData4: [], // 获取optData4
      sjztData: []
    }
  },
  components: {
    Footer, // 底部组件
    BaiDuMap, // 地图组件
    Urgent, // 经济弹窗组件
    Notice // 首页信息
  },
  computed: {
  },
  methods: {
    // 获取vuex数值 传递给地图
    async allGetPointData () {
      await this.$http('/js/cm-data.json').then(res => {
        this.$store.commit('saveOptData', res.data)
        this.optData = this.$store.state.a.optData
        // console.log(this.optData)
        if (this.chinaMapec) {
          this.renderMap(this.optData)
        } else {
          this.initChinaMap(this.optData)
        }
      })
      this.colorShow = [false, false, false, false, false, false]
      this.colorShow[0] = true
    },
    qkPointData () {
      this.optData = []
      this.optData1 = [] // optData1清空
      this.optData2 = [] // optData2清空
      this.optData3 = [] // optData3清空
      this.optData4 = [] // optData4清空
      this.colorShow = [false, false, false, false, false, false]
    },
    dqaqGetPointData () {
      this.qkPointData()
      for (let i = 0; i < this.$store.state.a.optData.length; i++) {
        if (this.$store.state.a.optData[i].id === 1) {
          this.optData1.push(this.$store.state.a.optData[i])
        } else {
        }
      }
      this.colorShow[1] = true
      this.renderMap(this.optData1)
    },
    rqtcbjGetPointData () {
      this.qkPointData()
      for (let i = 0; i < this.$store.state.a.optData.length; i++) {
        if (this.$store.state.a.optData[i].id === 2) {
          this.optData2.push(this.$store.state.a.optData[i])
        } else {
        }
      }
      this.colorShow[2] = true
      this.renderMap(this.optData2)
    },
    hzywbjGetPointData () {
      this.qkPointData()
      for (let i = 0; i < this.$store.state.a.optData.length; i++) {
        if (this.$store.state.a.optData[i].id === 3) {
          this.optData3.push(this.$store.state.a.optData[i])
        } else {
        }
      }
      this.colorShow[3] = true
      this.renderMap(this.optData3)
    },
    wlwgGetPointData () {
      this.qkPointData()
      for (let i = 0; i < this.$store.state.a.optData.length; i++) {
        if (this.$store.state.a.optData[i].id === 4) {
          this.optData4.push(this.$store.state.a.optData[i])
        } else {
        }
      }
      this.colorShow[4] = true
      this.renderMap(this.optData4)
    },
    //  ----------------------------------------------------------------------------------------------------
    // 获取事件状态信息
    async getsjztData () {
      await this.$store.dispatch('saveSjztData', this.$store.state.b.sjztData)
      this.sjztData = this.$store.state.b.sjztData
      // console.log(this.sjztData)
    },
    clickAddsjzt () {
      let sjztlist = [{ 'title': '添加1',
        'time': '2019年12月00日 星期零1',
        'address': '深圳市龙华新区大浪街道办一号' }, { 'title': '添加2',
        'time': '2019年12月00日 星期零2',
        'address': '深圳市龙华新区大浪街道办一号' }, { 'title': '添加3',
        'time': '2019年12月00日 星期零3',
        'address': '深圳市龙华新区大浪街道办一号' }, { 'title': '添加4',
        'time': '2019年12月00日 星期零4',
        'address': '深圳市龙华新区大浪街道办一号' }, { 'title': '添加5',
        'time': '2019年12月00日 星期零5',
        'address': '深圳市龙华新区大浪街道办一号' }, { 'title': '添加6',
        'time': '2019年12月00日 星期零6',
        'address': '深圳市龙华新区大浪街道办一号' }, { 'title': '添加7',
        'time': '2019年12月00日 星期零7',
        'address': '深圳市龙华新区大浪街道办一号' }, { 'title': '添加8',
        'time': '2019年12月00日 星期零8',
        'address': '深圳市龙华新区大浪街道办一号' }, { 'title': '添加9',
        'time': '2019年12月00日 星期零9',
        'address': '深圳市龙华新区大浪街道办一号' }, { 'title': '添加10',
        'time': '2019年12月00日 星期零10',
        'address': '深圳市龙华新区大浪街道办一号' }]
      for (let i = 0; i < sjztlist.length; i++) {
        setTimeout(() => {
          this.sjztData.unshift(sjztlist[i])
        }, 1000 * (i + 1))
      }
    },
    //  ----------------------------------------------------------------------------------------------------
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 中国地图
    initChinaMap (data) {
      this.chinaMapec = this.echarts.init(document.querySelector('#china-map'))
      this.renderMap(data)
    },
    //  ----------------------------------------------------------------------------------------------------
    Urgentmessage () {
      this.dialogVisible = true
      // this.neirong = '中国广东深圳'
    },
    urgentF (value) {
      this.dialogVisible = value
    },
    //  ----------------------------------------------------------------------------------------------------
    // 侧边栏的隐藏
    sidebarS () {
      this.sidebarShow = false
    },
    sidebarB () {
      this.sidebarShow = true
    },
    // 右上的隐藏
    navS () {
      this.navShow = false
    },
    navB () {
      this.navShow = true
    },
    renderMap (opt) {
      let option = {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'transparent',
          formatter: (params) => {
            let tipHtml = ''
            tipHtml = '<div style="background:#fff;border-radius:10px;padding-top:10px;box-shadow:0 0 10px #666">' +
              '<div style="color:#fff;height:20px;border-radius:6px;font-size:16px;line-height:20px;background-color:#5861a2;text-align:center;margin:0 2px;">' + params.name + '</div>' +
              '<div style="text-align:left;color:#494949;padding:8px 6px">' +
              '<p style="font-size:12px;font-weight:bold;">' + '火警次数: ' + params.value[2].frequency + ' ' + '</p>' +
              '<p style="font-size:12px;font-weight:bold;">' + '用户电话: ' + params.value[2].phone + ' ' + '</p>' +
              '<p style="font-size:12px;font-weight:bold;">' + '用户地址: ' + params.value[2].address + ' ' + '</p>' +
              '</div>' + '</div>'
            return tipHtml
          }
        },
        // backgroundColor: '#333',
        geo: {
          left: 80,
          map: 'china',
          roam: true,
          zoom: 1,
          aspectScale: 0.8, // 长宽比
          scaleLimit: {
            min: 1
          },
          itemStyle: {
            normal: {
              areaColor: {
                colorStops: [{
                  offset: 0,
                  color: '#039ee1'
                }, {
                  offset: 1,
                  color: '#2e6fb1'
                }],
                borderColor: '#6ed6f7'
              }
            },
            emphasis: {
              areaColor: '#38a2d9'
            }
          },
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
            // emphasis: {
            //     color: '#fff',
            // }
          }
        },
        series: [{
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: opt, // 动态添加数据
          symbolSize: 10,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
            color: '#fff',
            period: 8,
            scale: 3
          },
          hoverAnimation: true,
          // label: {
          //   normal: {
          //     formatter: '{b}',
          //     position: 'bottom',
          //     padding: [0, 0, 0, 8],
          //     show: true,
          //     fontSize: 14
          //   }
          // },
          itemStyle: {
            normal: {
              color: 'red',
              shadowBlur: 10
            }
          },
          zlevel: 1
        }

        ]
      }
      this.chinaMapec.setOption(option)
    }
  },
  beforeCreate () {

  },
  created () {
  },
  // 页面打开时初始化 echart
  mounted () {
    this.allGetPointData()
    this.getsjztData()
    window.addEventListener('resize', () => {
      this.chinaMapec.resize()
    })
  }
}
</script>
<style lang="less" scoped >
@-webkit-keyframes zxdtY {
  0%{
    border: 1/96rem dashed #f10;
    box-shadow: 0px 0px 5/96rem #f10 inset
    }
    50% {
      border: 1/96rem dashed #fff;
      box-shadow: 0px 0px 5/96rem #fff inset
    }
    100%{
      border: 1/96rem dashed #f10;
      box-shadow: 0px 0px 5/96rem #f10 inset
    }
}
@-webkit-keyframes zxdtZ {
  0%{
    color: #f10;
    }
    50% {
      color: #fff;
    }
    100%{
      color: #f10;
    }
}
.bgshow {
  background:transparent !important;
}
.bghide {
  background:url('../../../../assets/dome3.jpg') !important;
}
@keyframes rightEaseInAnimate{/*定义从右边滑入文字的动画*/
    0%{transform: translateX(50px);opacity: 0;}
    100%{transform:translateX(0px);opacity: 1; }
}
.Acolor {
  font-weight: bold !important;
  color: #0094ff;
}
.eq-main {
  div {
    box-sizing: border-box;
  }
  width: 100%;
  height: 100%;
  position: relative;
  /deep/.map {
    position: absolute;
    width: 100%;
    height: 100%;
    .el-tabs {
      position: absolute;
      .el-tabs__header {
        margin-top: 9/96rem;
        z-index: 10;
        right: 5%;
        background-color: #08304b;
        border-radius: 4px 5px 0 0;
        color: #fff;
        .el-tabs__item {
          color: #fff;
          height: 20/96rem;
          line-height: 20/96rem;
          &.is-active {
            color: #0094ff;
          }
        }
      }
    }
    .el-tab-pane {
      width: 100%;
      height: 100%;
      padding-bottom: 30/96rem;
    }
    .el-tabs__header {
      position: absolute;
    }
    .el-tabs--top {
      width: 100%;
      height: 100%;
    }
    .el-tabs__content {
      width: 100%;
      height: 100%;
    }

    #china-map {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: transparent;
      // border: 1px solid rgb(44, 106, 177);
      box-shadow: 0px 0px 5/96rem #1176a7 inset;
    }
  }
  .total-title {
    position: absolute;
    top: 0;
    left: 10/96rem;
    color: #fff;
    li {
      float: left;
      margin-top: 10/96rem;
      margin-right: 14/96rem;
      font-size: 8/96rem;
      line-height: 12/96rem;
      &:nth-child(1) {
        font-size: 12/96rem;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .nav {
    position: absolute;
    animation: rightEaseInAnimate 1s ease 1; /*调用动画：动画名、时间、时间线条、播放次数*/
      animation-fill-mode: forwards;/*定义动画结束的状态*/
    top: 30/96rem;
    right: 0;
    width: 25%;
    height: 20%;
    .ul-six {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        width: 33.33%;
        height: 50/96rem;
        text-align: center;
        color: #fff;
        font-size: 6/96rem;
        &:hover {
          cursor: pointer;
        }
        i {
          display: block;
          margin: 10% auto 0;
          width: 55%;
          height: 60%;
          background-color: red;
          border-radius: 50%;
        }
      }
    }
  }
  .sidebar {
    animation: rightEaseInAnimate 1s ease 1; /*调用动画：动画名、时间、时间线条、播放次数*/
      animation-fill-mode: forwards;/*定义动画结束的状态*/
    background-color: transparent;
    position: absolute;
    top: 35%;
    // bottom: 30%;
    right: 5/96rem;
    width: 150/96rem;
    height: 144/96rem;
    border: 1px solid rgba(229, 233, 238, 0.7);
    overflow-y: scroll;
    .sidebar-title {
      position: fixed; // 有animation效果固定定位失效
      width: 150/96rem;
      height: 18/96rem;
      font-size: 12/96rem;
      color: #fff;
      // padding-left: 18/96rem;
      text-align: center;
      background-color: rgba(212, 63, 180);
    }
    ul {
      padding-top: 18/96rem;

    }
    .notes {
      box-sizing: border-box;
      width: 100%;
      height: 42/96rem;
      padding-top: 4/96rem;
      background: rgba(209, 161, 106, 0.5);
      .yuan {
        float: left;
        margin-left: 6/96rem;
        margin-right: 5/96rem;
        width: 35/96rem;
        height: 35/96rem;
        border: 1/96rem dashed #fff;
        border-radius: 50%;
        p {
          margin: 0 auto;
          color: #fff;
          font-size: 10/96rem;
          text-align: center;
          margin-top: 10/96rem;
        }
      }
      .time {
        width: 92/96rem;
        color: #fff;
        // position: absolute;
        float: right;
        margin-top: 2/96rem;
        margin-right: 3/96rem;
        font-size: 6/96rem;
      }
      .address {
        float: right;
        color: #ccc;
        width: 90/96rem;
        margin-top: 3/96rem;
        margin-right: 8/96rem;
        line-height: 1.2;
        font-size: 6/96rem;
      }
    }
    li:nth-child(1) {
      .yuan{

        -webkit-animation: zxdtY 2s infinite linear;
        p {
          -webkit-animation: zxdtZ 2s infinite linear;
        }
        }
    }
    li:nth-child(2) {
      background: rgba(241, 99, 103, 0.5);
    }
    li:nth-child(3) {
      background: rgba(66, 32, 145, 0.3);
      // .mt3 {
      //   margin-top: 4/96rem !important;
      // }
    }
    li:nth-child(n+4) {
      background: rgba(129, 186, 194, 0.5);
    }
  }
  // 显示按钮
  .el-icon-circle-plus {
    font-size: 10/96rem;
    color: #ccc;
    position: absolute;
    right: 2/96rem;
  }
  .sidebarjia {
    top: 35%;
    right: 8/96rem;
  }
  .footerjia {
    top: 75%;
  }
  .navjia {
    top: 32/96rem;
  }
  // 隐藏点
  .el-icon-error {
    font-size: 10/96rem;
    color: #fff;
    position: absolute;
    top: 2/96rem;
    right: 2/96rem;
  }
}
.btnOn {
  position: absolute;
  border-radius: 5/96rem;
  background-color: rgba(61, 168, 230, 0.678);
  color: #fff;
  font-weight: bold;
  width: 60/96rem;
  height: 20/96rem;
  bottom: 20/96rem;
  right: 20/96rem;
  padding: 0;
}
</style>
