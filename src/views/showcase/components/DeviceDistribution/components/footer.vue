<template>
  <div>
    <i @click="footerB" v-show="!footquanShow" class="el-icon-circle-plus"></i>
    <div class="footer" v-show="footquanShow" @dblclick="footerS">
      <div class="footer-quan">
        <div class="fireInfo">
           <router-link :to="{name:'SmokeSensorEquip'}"><div id="fire-quan"></div>
           </router-link>
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
        <div class="faultInfo">
          <div id="fault-quan"></div>
          <div class="fault-notes">
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
        <!-- 事件柱状图 -->
        <!-- <div id="event-zzt"></div> -->
        <div id="news">
          <div class="topLi"><a href="#">最新消息。。。。。</a></div>
          <ul id="chatContainer">
            <li>
              <a href="#">1-1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
          </ul>
        </div>
        <i @click="footerS" class="el-icon-error" v-show="footquanShow"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fireec: null,
      faultec: null,
      // eventRatioec: null,
      footquanShow: true
    }
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
  created () {
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
  font-size: 10/96rem;
  color: #ccc;
  position: absolute;
  right: 2/96rem;
  top: 75%;
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
    height: 100%;
    .fireInfo {
      width: 30%;
      height: 100%;
      background-color: rgba(173, 172, 171, 0.2);
      position: absolute;
    right: 0;

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
            padding-left: 10/96rem;
            padding-right: 5/96rem;
            font-size: 7/96rem;
            color: #fff;
            line-height: 1.7;
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
      #fault-quan {
        position: absolute;
        top: 5%;
        left: 40%;
        width: 25%;
        height: 40%;
        background-color: transparent;
      }
      .fault-notes {
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
            padding-left: 10/96rem;
            padding-right: 5/96rem;
            font-size: 7/96rem;
            color: #fff;
            line-height: 1.7;
            text-indent: 1em;
          }
        }
      }
    }
    .topLi {
      width: 100%;
      height: 10%;
      font-size: 10/96rem;
      margin-top: 5/96rem;
      margin-bottom: 5/96rem;
      a {
        margin-left: 10/96rem;
        color: #fff;
      }
    }
    #chatContainer {
      width: 100%;
      height: 80%;
      overflow-y: scroll;
      li {
        margin-left: 10/96rem;
        list-style: none;
        height: 15/96rem;
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
    }
  }
}
</style>
