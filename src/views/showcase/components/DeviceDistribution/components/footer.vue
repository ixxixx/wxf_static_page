<template>
  <div>
    <i @click="footerB" v-show="!footquanShow" class="el-icon-circle-plus"></i>
    <div class="footer" v-show="footquanShow" @dblclick="footerS">
      <div class="footer-quan">
        <div class="fireInfo Info">
          <router-link :to="{ name: 'SmokeSensorEquip' }"
            ><div id="fire-quan"></div>
          </router-link>
          <div class="fire-notes noteList">
            <ul>
              <li v-for="(item, index) in alarmData" :key="index">
                <p>
                  {{ item.happenTime | dateFilter }}---{{ item.devId }}---{{
                    item.province + item.city + item.county + item.detailAddress
                  }}
                </p>
                <p>{{ item.remark }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="faultInfo Info">
          <div id="fault-quan"></div>
          <div class="fault-notes noteList">
            <ul>
              <li v-for="(item, index) in faultData" :key="index">
                <p>
                  {{ item.happenTime | dateFilter }}---{{ item.devId }}---{{ item.province + item.city + item.county + item.detailAddress}}
                </p>
                <p>{{ item.remark }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 事件柱状图 -->
        <!-- <div id="event-zzt1"></div> -->
        <div id="news">
          <div class="topLi"><a href="#">实时消息</a></div>
          <ul id="chatContainer">
            <li v-for="(item, index) in newsData" :key="index">
              <p>
                {{ item.happenTime | dateFilter }}---{{ item.devId}}---{{ item | capitalize }}
              </p>
              <p>{{ item.remark }}</p>
            </li>
          </ul>
        </div>
        <i @click="footerS" class="el-icon-error" v-show="footquanShow"></i>
      </div>
    </div>
  </div>
</template>

<script>
// import dayjs from 'dayjs'
export default {
  data () {
    return {
      fireec: null,
      faultec: null,
      // eventRatioec: null,
      footquanShow: true,
      newsData: '',
      alarmData: '',
      faultData: ''
    }
  },
  filters: {
    capitalize: function (value) {
      if (value.msgType === '2') {
        return value.province + value.city + value.county + value.detailAddress
      } else if (value.msgType === '3') {
        return value.province + value.city + value.county + value.detailAddress
      } else {
        return '无'
      }
    } },
  created () {
    this.newsData = this.$store.state.Socket.news
    this.alarmData = this.$store.state.Socket.alarm
    this.faultData = this.$store.state.Socket.fault
  },
  methods: {
    // 火警
    initFireEcharts () {
      // 初始化
      this.fireec = this.echarts.init(document.querySelector('#fire-quan'))
      // this.fireec.showLoading()
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
                  fontSize: 14
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
      this.fireec.setOption(option)
    },
    // 故障
    initFaultEcharts () {
      // 初始化
      this.faultec = this.echarts.init(document.querySelector('#fault-quan'))
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
                    color: '#fd7b1d' // 0% 处的颜色
                  }, {
                    offset: 0.4,
                    color: '#fe6c03' // 100% 处的颜色
                  }, {
                    offset: 0.1,
                    color: '#fe6c03' // 100% 处的颜色
                  }, {
                    offset: 1,
                    color: '#fd7b1d' // 100% 处的颜色
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
                formatter: '故障',
                textStyle: {
                  color: '#fff',
                  fontSize: 14
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
                    color: '#e8f75c' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#e8f75c' // 100% 处的颜色
                  }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }]
        }]
      }
      this.faultec.setOption(option)
    },
    // 底部的隐藏
    footerS () {
      this.footquanShow = false
    },
    footerB () {
      this.footquanShow = true
    }
  },
  mounted () {
    this.initFireEcharts()
    this.initFaultEcharts()
    window.addEventListener('resize', () => {
      this.fireec.resize()
      this.faultec.resize()
    })
  }
}
</script>

<style lang="less" scoped>
@keyframes footerdh {
  /*定义从右边滑入文字的动画*/
  0% {
    transform: translatey(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
// 显示按钮
.el-icon-circle-plus {
  top: 75%;
  font-size: 20px;
  color: #ccc;
  position: absolute;
  right: 5px;
}
.footer {
  animation: footerdh 1s ease 1; /*调用动画：动画名、时间、时间线条、播放次数*/
  animation-fill-mode: forwards; /*定义动画结束的状态*/
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25%;
  // 隐藏点
  .el-icon-error {
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 4px;
    right: 4px;
  }

  .footer-quan {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    .Info {
      width: 30%;
      height: 100%;
      background-color: rgba(173, 172, 171, 0.2);
      position: absolute;
      right: 0;

      #fire-quan,
      #fault-quan {
        position: absolute;
        top: 5%;
        left: 40%;
        width: 25%;
        height: 40%;
        background-color: transparent;
      }
      .noteList {
        position: absolute;
        bottom: 3%;
        width: 100%;
        height: 53%;
        overflow: hidden;
        background-color: transparent;
        ul {
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          li {
            padding-left: 15px;
            padding-right: 8px;
            font-size: 12px;
            color: #fff;
            line-height: 1.7;
            text-indent: 1em;
            background-color: rgba(240, 237, 234, 0.1);
            margin-bottom: 1px;
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #fd6e06;
              &:nth-child(2) {
                color: #cccc00;
              }
            }
          }
        }
      }
    }
    .faultInfo {
      left: 35%;
    }
    .topLi {
      width: 100%;
      height: 25px;
      font-size: 18px;
      margin-top: 10px;
      margin-bottom: 5px;
      a {
        margin-left: 15px;
        font-weight: 700;
        color: #fff;
      }
    }
    #chatContainer {
      width: 100%;
      height: 80%;
      overflow-y: scroll;
      li {
        color: #fff;
        margin-left: 15px;
        list-style: none;
        height: 50px;
        p {
          width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
      }
    }
    #news {
      position: absolute;
      width: 30%;
      height: 100%;
      bottom: 0;
      // background-color: transparent;
      background-color: rgba(173, 172, 171, 0.2);
      overflow: hidden;
    }
  }
}
</style>
