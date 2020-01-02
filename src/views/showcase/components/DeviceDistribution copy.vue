<template>
  <div class="eq-main">
    <div class="map">
      <el-tabs v-model="shouxuan" type="card" @tab-click="handleClick">
        <el-tab-pane label="矢量 图" name="first">
          <div id="china-map" style="height:100%"></div>
        </el-tab-pane>
        <el-tab-pane label="百度地图" name="second">
          <div id="mapbox">
            <baidu-map
              :center="center"
              :zoom="zoom"
              :scroll-wheel-zoom="true"
              class="baidu-m"
              @ready="handler"
              :mapStyle="mapStyle"
            >
              <!-- 必须给容器指高度，不然地图将显示在一个高度为0的容器中，看不到 -->
              <bm-map-type
                :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
                anchor="BMAP_ANCHOR_TOP_LEFT"
              ></bm-map-type>
              <!-- 标记 -->、
              <bm-marker
                :position="{ lng: 102.73333, lat: 25.05 }"
                :dragging="true"
                animation="BMAP_ANIMATION_BOUNCE"
              >
              </bm-marker>
              <bm-local-search
                :keyword="keyword"
                :location="location"
                :auto-viewport="autoViewport"
                :panel="panel"
                :select-first-result="selectFirstResult"
                @searchcomplete="searchcomplete"
              ></bm-local-search>
              <bm-control>
                <bm-auto-complete
                  v-model="keyword"
                  :sugStyle="{ zIndex: 999999 }"
                >
                  <el-input
                    style="top:5px;left:100px"
                    v-model="mapvalue"
                    placeholder="请搜索活动地址"
                    size="mini"
                    clearable
                  ></el-input>
                </bm-auto-complete>
              </bm-control>
            </baidu-map>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消防CRD" disabled> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="total-title">
      <ul>
        <li>设备类型分布</li>
        <li>全部</li>
        <li>电器安全</li>
        <li>燃气探测警报</li>
        <li>火灾烟雾警报</li>
        <li>物联网关</li>
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
    <i
      @click="footerB"
      v-show="!footquanShow"
      class="el-icon-circle-plus footerjia"
    ></i>
    <div class="footer-quan" v-show="footquanShow" @dblclick="footerS">
      <div class="fireInfo">
        <div id="fire-quan"></div>
        <div class="fire-notes">
          <ul>
            <li>这是数据的展示</li>
            <li>这是数据的展示</li>
            <li>这是数据的展示</li>
            <li>
              这是数据的展示这是数据的展示这是数据的展示这是数据的展示这是数据的展示这是数据的展示
            </li>
            <li>这是数据的展示这是数据的展示这是数据的展示</li>
            <li>这是数据的展示这是数据的展示这是数据的展示</li>
          </ul>
        </div>
      </div>
      <div class="faultInfo"></div>
      <!-- 事件柱状图 -->
      <div id="event-zzt"></div>
      <i @click="footerS" class="el-icon-error" v-show="footquanShow"></i>
    </div>
    <!-- <div class="dome-cs" v-show="demoshow"></div> -->
    <el-dialog :title="location + '火警'" :visible.sync="demoshow" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="demoshow = false">取 消</el-button>
        <el-button type="primary" @click="demoshow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import './china'
export default {
  name: 'mapbox',
  data () {
    return {
      myChart: null,
      shouxuan: 'first',
      // 地图
      center: { lng: 0, lat: 0 }, // 经纬度
      zoom: 5, // 地图展示级别
      mapvalue: '',
      arr: [], // 接收list
      markers: [{}],
      sidebarShow: true,
      footquanShow: true,
      navShow: true,
      // infoMarkers: [1, 23, 3, 5435, 6567, 45, 214],
      // marker: { lng: null, lat: null },
      search: { lng: null, lat: null },
      panel: false,
      keyword: '',
      selectFirstResult: true,
      location: '深圳',
      autoViewport: true,
      demoshow: false,
      // 地图颜色
      mapStyle: {
        styleJson: [
          {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': {
              'color': '#021019'
            }
          },
          {
            'featureType': 'highway',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'highway',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#147a92'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#0b3d51'
            }
          },
          {
            'featureType': 'local',
            'elementType': 'geometry',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'land',
            'elementType': 'all',
            'stylers': {
              'color': '#08304b'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#08304b'
            }
          },
          {
            'featureType': 'subway',
            'elementType': 'geometry',
            'stylers': {
              'lightness': -70
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#857f7f'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.stroke',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'green',
            'elementType': 'geometry',
            'stylers': {
              'color': '#062032'
            }
          },
          {
            'featureType': 'boundary',
            'elementType': 'all',
            'stylers': {
              'color': '#1e1c1c'
            }
          },
          {
            'featureType': 'manmade',
            'elementType': 'geometry',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.icon',
            'stylers': {
              'visibility': 'off'
            }
          },
          {
            'featureType': 'poilabel',
            'elementType': 'labels.text.stroke',
            'stylers': {
              'color': '#2da0c6',
              'visibility': 'on'
            }
          }
        ]
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handler ({ BMap, map }) {
      // console.log(BMap, map)
      this.center.lng = 70.034564
      this.center.lat = 48.96456
      this.zoom = this.zoom
    },
    // getClickInfo (e) {
    //   console.log(e)
    //   this.markers.push({ local: { lng: e.point.lng, lat: e.point.lat }, show: false })
    // },
    /* rmInfo () {
    this.markers.splice(this.markers[this.markers.length - 1], 1)
  }, */
    locationSuccess (e) { // 百度地图定位完成后
      // console.log(e)
      this.search.lng = e.point.lng
      this.search.lat = e.point.lat
    },
    searchcomplete (e) { // 百度地图搜索框完成之后
      // console.log(e)
      if (e) {
        this.search.lng = ''
        this.search.lat = ''
      }
    },
    // 火警圆圈
    initFireEcharts () {
      // 初始化
      this.myChart1 = this.echarts.init(document.querySelector('#fire-quan'))
      // this.myChart1.showLoading()
      let option = {
        tooltip: {
          show: false
        },
        series: [{
          type: 'pie',
          radius: ['50%', '80%'],
          label: {
            normal: {
              position: 'center'
            }
          },
          hoverAnimation: false,
          data: [{
            value: 50,
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 0.05,
                  colorStops: [{
                    offset: 0,
                    color: '#f87d29' // 0% 处的颜色
                  }, {
                    offset: 0.4,
                    color: '#f6f511' // 100% 处的颜色
                  }, {
                    offset: 0.1,
                    color: '#f6f511' // 100% 处的颜色
                  }, {
                    offset: 1,
                    color: '#f87d29' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          },

          {
            value: 50,
            name: '占位',
            label: {
              normal: {
                formatter: '火警',
                textStyle: {
                  color: '#fff',
                  fontSize: 16
                }
              }
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'red' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'red' // 100% 处的颜色
                  }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }]
        }]
      }
      this.myChart1.setOption(option)
      this.myChart1.on('click', (param) => {
        console.log(param.name)
        this.demoshow = true
      })
    },
    // 事件比例
    initEventEcharts () {
      this.myChart2 = this.echarts.init(document.querySelector('#event-zzt'))
      let colorArray = [
        {
          top: '#4826ac', // 红
          bottom: '#e60aee'
        }, {
          top: '#033899', // 橙
          bottom: '#6f22c8'
        },
        {
          top: '#e4f54d', // 黄
          bottom: '#02fdf6'
        }, {
          top: '#1ff5fc', // 蓝
          bottom: '#0094ff'
        }
      ]
      let option = {
        title: {
          text: '事件比例',
          x: '38%',
          y: '12%',
          itemGap: 20,
          textStyle: {
            color: '#fff',
            fontSize: 20
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 11
          }
        },
        // backgroundColor: '#0E2A43',
        tooltip: {
          show: true,
          formatter: '{b}:{c}'
        },
        grid: {
          left: '5%',
          top: '20%',
          right: '20%',
          bottom: '1%',
          containLabel: true
        },

        xAxis: {
          type: 'value',
          show: false,
          position: 'top',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [{
          type: 'category',
          axisTick: {
            show: false,
            alignWithLabel: false,
            length: 5

          },
          'splitLine': { // 网格线
            'show': false
          },
          inverse: 'true', // 排序
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          data: ['第一事件', '第二事件', '第三事件', '第四事件']
        }

        ],
        series: [{
          type: 'bar',
          itemStyle: {
            normal: {
              show: true,
              color: function (params) {
                let num = colorArray.length
                return {
                  type: 'linear',
                  colorStops: [{
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }]
                  // globalCoord: false
                }
              },
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '65%',
          data: [9900, 7723, 7900, 9821]
        }

        ]
      }
      this.myChart2.setOption(option)
    },
    // 中国地图
    async initChinaMap () {
      let list = []
      await this.$http({
        url: '/js/cm-data.json',
        method: 'GET'
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          list.push(res.data[i])
        }
        this.arr = list // 把list 赋值给数组arr
      })
      this.myChart3 = this.echarts.init(document.querySelector('#china-map'))
      let optData = []
      for (let j = 0; j < this.arr.length; j++) {
        optData.push({ name: this.arr[j].name, value: this.arr[j].value })
      }
      this.$store.state.optData = optData
      console.log(optData)
      let option = {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'transparent',
          formatter: (params) => {
            let tipHtml = ''
            tipHtml = '<div style="background:#fff;border-radius:10px;padding-top:10px;box-shadow:0 0 10px #666">' +
              '<div style="color:#fff;height:20px;border-radius:6px;font-size:16px;line-height:20px;background-color:#5861a2;text-align:center;margin:0 2px;">' + params.name + '</div>' +
              '<div style="text-align:left;color:#494949;padding:8px 6px">' +
              '<p style="font-size:12px;font-weight:bold;">' + '火警次数: ' + params.value[2] + ' ' + '</p>' +
              '<p style="font-size:12px;font-weight:bold;">' + '用户电话: ' + params.value[3] + ' ' + '</p>' +
              '<p style="font-size:12px;font-weight:bold;">' + '用户地址: ' + params.value[4] + ' ' + '</p>' +
              '</div>' + '</div>'
            // return params.name + ':' + params.value[2]
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
          data: optData,
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
      this.myChart3.setOption(option)
    },
    // 侧边栏的隐藏
    sidebarS () {
      this.sidebarShow = false
    },
    sidebarB () {
      this.sidebarShow = true
    },
    // 底部的隐藏
    footerS () {
      this.footquanShow = false
    },
    footerB () {
      this.footquanShow = true
    },
    // 右上的隐藏
    navS () {
      this.navShow = false
    },
    navB () {
      this.navShow = true
    }

  },
  // 页面打开时初始化 echart
  mounted () {
    // this.huoqu()
    this.initFireEcharts()
    this.initEventEcharts()
    this.initChinaMap()
    window.addEventListener('resize', () => {
      this.myChart1.resize()
      this.myChart2.resize()
      this.myChart3.resize()
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
      #mapbox {
        width: 100%;
        height: 100%;
        margin-top: 30/96rem;
        .baidu-m {
          height: 100%;
          .BMap_mask {
            border: 1px solid #ccc;
          }
        }
        .el-input__inner {
          background-color: transparent;
          color: #fff;
        }
      }
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
    // top: 38%;
    bottom: 30%;
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
    top: 40%;
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
  .footer-quan {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25%;
    .fireInfo {
      width: 30%;
      height: 100%;
      background-color: rgba(173, 172, 171, 0.2);
      position: absolute;
      #fire-quan {
        position: absolute;
        top: 5%;
        left: 40%;
        width: 25%;
        height: 40%;
        background-color: transparent;
      }
      .fire-notes {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 55%;
        overflow: hidden;
        background-color: transparent;
        ul {
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          li {
            padding-left: 10/96rem;
            padding-right: 5/96rem;
            font-size: 7/96rem;
            color: #fff;
            line-height: 1.8;
            text-indent: 1em;
          }
        }
      }
    }
    .faultInfo {
      width: 30%;
      height: 100%;
      background-color: rgba(173, 172, 171, 0.2);
      position: absolute;
      left: 35%;
    }
    #event-zzt {
      position: absolute;
      width: 30%;
      height: 100%;
      right: 0;
      bottom: 0;
      // background-color: transparent;
      background-color: rgba(173, 172, 171, 0.2);
    }
  }
}
</style>
