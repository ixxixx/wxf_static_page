<template>
  <div class="eq-main">
    <div class="map">
      <el-tabs v-model="shouxuan" type="card" @tab-click="handleClick">
        <el-tab-pane label="矢量 图" name="first">
          <div id="china-map" style="height:100%"></div>
        </el-tab-pane>
        <el-tab-pane label="百度地图" name="second">
          <BaiDuMap></BaiDuMap>
        </el-tab-pane>
        <el-tab-pane label="消防CRD" disabled> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="total-title">
      <ul>
        <li>设备类型分布</li>
        <li @click="allGetPointData">全部</li>
        <li @click="dqaqGetPointData">电器安全</li>
        <li @click="rqtcbjGetPointData">燃气探测警报</li>
        <li @click="hzywbjGetPointData">火灾烟雾警报</li>
        <li @click="wlwgGetPointData">物联网关</li>
      </ul>
    </div>
    <i @click="navB" v-show="!navShow" class="el-icon-circle-plus navjia"></i>
    <div class="nav" v-show="navShow" @dblclick="navS">
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
          <p>NB</p>
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
    <div class="sidebar" v-show="sidebarShow" @dblclick="sidebarS">
      <div class="sidebar-title">事件状态</div>
      <div class="sidebar-one notes">
        <div class="yuan"><p>火警</p></div>
        <span class="time">2019年12月23日 星期二</span>
        <span class="address">深圳市龙华新区大浪街道办大浪大浪</span>
      </div>
      <div class="sidebar-two notes">
        <div class="yuan"><p>故障</p></div>
        <span class="time">2019年12月24日 星期二</span>
        <span class="address">深圳市龙华新区大浪街道办石岩石岩</span>
      </div>
      <div class="sidebar-three notes">
        <div class="yuan">
          <p class="mt3">事件<br />比例</p>
        </div>
        <span class="time">2019年12月25日 星期三</span>
        <span class="address">深圳市龙华新区龙华街道办龙华龙华</span>
      </div>
      <i @click="sidebarS" class="el-icon-error" v-show="sidebarShow"></i>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import './china'
import Footer from './components/footer'
import BaiDuMap from './components/baiDuMap'
// import axios from 'axios'
export default {
  name: 'mapbox',
  data () {
    return {
      chinaMapec: null,
      shouxuan: 'first',
      sidebarShow: true,
      navShow: true,
      optData: [], // 获取optData
      optData1: [], // 获取optData1
      optData2: [], // 获取optData2
      optData3: [], // 获取optData3
      optData4: [] // 获取optData4
    }
  },
  components: {
    Footer, // 底部组件
    BaiDuMap // 地图组件
  },
  computed: {
  },
  methods: {
    // 获取vuex数值 传递给地图
    async allGetPointData () {
      await this.$http('/js/cm-data.json').then(res => {
        this.$store.commit('saveOptData', res.data)
        this.optData = this.$store.state.a.optData
        console.log(this.optData)
        if (this.chinaMapec) {
          this.renderMap(this.optData)
        } else {
          this.initChinaMap(this.optData)
        }
      })
    },
    qkPointData () {
      this.optData = []
      this.optData1 = [] // optData1并清空
      this.optData2 = [] // optData2清空
      this.optData3 = [] // optData3清空
      this.optData4 = [] // optData4清空
    },
    dqaqGetPointData () {
      this.qkPointData()
      for (let i = 0; i < this.$store.state.a.optData.length; i++) {
        if (this.$store.state.a.optData[i].id === 1) {
          this.optData1.push(this.$store.state.a.optData[i])
        } else {
        }
      }
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
      this.renderMap(this.optData4)
    },
    //  --------------------
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 中国地图
    initChinaMap (data) {
      this.chinaMapec = this.echarts.init(document.querySelector('#china-map'))
      this.renderMap(data)
    },
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
    footerS () {
      this.footquanShow = false
    },
    footerB () {
      this.footquanShow = true
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
            console.log(params)

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
          // {
          //   'name': '深圳',
          //   'value': [114.07, 22.62, 199, 13813813813, '深圳大浪']
          // }
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
    window.addEventListener('resize', () => {
      this.chinaMapec.resize()
    })
  }
}
</script>
<style lang="less" scoped >
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
      height: 200%;
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
        height: 50%;
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
    background-color: transparent;
    position: absolute;
    top: 35%;
    // bottom: 30%;
    right: 5/96rem;
    width: 150/96rem;
    height: 144/96rem;
    .sidebar-title {
      width: 100%;
      height: 18/96rem;
      font-size: 12/96rem;
      color: #fff;
      padding-left: 18/96rem;
      background-color: rgba(212, 63, 180, 0.7);
    }
    .notes {
      width: 100%;
      height: 42/96rem;
      padding-top: 3/96rem;
      background: rgba(209, 161, 106, 0.5);
      .yuan {
        float: left;
        margin-left: 6/96rem;
        margin-right: 13/96rem;
        width: 37/96rem;
        height: 37/96rem;
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
        width: 85/96rem;
        color: #fff;
        // position: absolute;
        float: right;
        margin-top: 3/96rem;
        margin-right: 5/96rem;
        font-size: 6/96rem;
      }
      .address {
        float: right;
        color: #ccc;
        width: 85/96rem;
        margin-top: 5/96rem;
        margin-right: 8/96rem;
        line-height: 1.2;
        font-size: 6/96rem;
      }
    }
    .sidebar-two {
      background: rgba(241, 99, 103, 0.5);
    }
    .sidebar-three {
      background: rgba(66, 32, 145, 0.3);
      .mt3 {
        margin-top: 4/96rem !important;
      }
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
</style>
