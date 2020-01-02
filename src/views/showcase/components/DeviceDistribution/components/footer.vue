<template>
  <div>
    <i @click="footerB" v-show="!footquanShow" class="el-icon-circle-plus"></i>
    <div class="footer" v-show="footquanShow" @dblclick="footerS">
      <div class="footer-quan">
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
        <div id="event-zzt"></div>
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
      eventRatioec: null,
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
    // 事件比例
    initEventEcharts () {
      this.eventRatioec = this.echarts.init(document.querySelector('#event-zzt'))
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
      this.eventRatioec.setOption(option)
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
    this.initEventEcharts()
    this.initFaultEcharts()
    window.addEventListener('resize', () => {
      this.fireec.resize()
      this.faultec.resize()
      this.eventRatioec.resize()
    })
  }
}
</script>

<style lang="less" scoped>
// 显示按钮
.el-icon-circle-plus {
  font-size: 10/96rem;
  color: #ccc;
  position: absolute;
  right: 2/96rem;
  top: 75%;
}
.footer {
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
            line-height: 1.9;
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
            line-height: 1.9;
            text-indent: 1em;
          }
        }
      }
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
