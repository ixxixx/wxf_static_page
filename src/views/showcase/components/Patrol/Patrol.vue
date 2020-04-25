<template>
<div class="six">
  <div id="patrol">
    <!-- 这是用来渲染 echars -->
  </div>
  </div>
</template>

<script>
export default {
  props: ['refreshInfo'],
  data () {
    return {
      userInfo: {},
      patrolec: null,
      chartSixDataList: {}
    }
  },
  watch: {
    refreshInfo (val, old) {
      console.log(val)
      if (val) {
        this.initEcharts()
        console.log('更新成功patrol')
      }
    }
  },
  methods: {
    async initEcharts () {
      // 初始化
      let userId = this.userInfo.userId
      await this.$http.get(`/pf/show/deviceTypeNetworkTotal/${userId}`).then((res) => {
        console.log(res.data)
        this.chartSixDataList = res.data.data
        // console.log(res.data.data)
        let devType = []
        let total1 = []
        let total2 = []
        for (var i in this.chartSixDataList) {
          if (i % 2) {
            devType.push(this.chartSixDataList[i].devType)
            total2.push(this.chartSixDataList[i].total)
          } else {
            total1.push(this.chartSixDataList[i].total)
          }
        }
        this.chartSixDataList.devType = devType
        this.chartSixDataList.total1 = total1
        this.chartSixDataList.total2 = total2
      })
      this.patrolec = this.echarts.init(document.querySelector('#patrol'))
      let colorArray = [
        {
          top: 'red', // 红
          bottom: '#e79fa5'
        }, {
          top: '#fe6b01', // 橙
          bottom: '#f9b37f'
        },
        {
          top: '#e4f54d', // 黄
          bottom: '#f2fd86'
        }, {
          top: '#16f7fc', // 蓝
          bottom: '#b2fefc'
        }
      ]
      let option = {
        title: {
          text: '设备的在线/离线情况',
          // sublink: 'http://www.baidu.com', // 副标题超链接
          x: '10px',
          y: '10px',
          itemGap: 10,
          textStyle: {
            color: '#fff',
            fontSize: 15
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 11
          }
        },
        // backgroundColor: '#0E2A43',
        tooltip: {
          show: true,
          formatter: '{b}{c}个'
        },
        grid: {
          left: '5%',
          top: '10%',
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
          // data: ['烟雾报警有无缺失', '烟雾报警有无缺失', '九小场所有无缺失', '灭火器是否有效内']
          data: this.chartSixDataList.devType
        }

        ],
        series: [{
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{c}个在线',
              textStyle: {
                fontSize: 9,
                color: 'white' // color of value
              }
            }
          },
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
              barBorderRadius: 70,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '65%',
          // data: [9900, 7723, 7900, 9821]
          data: this.chartSixDataList.total1
        },
        {
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{c}个离线',
              textStyle: {
                fontSize: 9,
                color: 'white' // color of value
              }
            }
          },
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
              barBorderRadius: 70,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '120%',
          barCategoryGap: '65%',
          // data: [8900, 8723, 7000, 7821]
          data: this.chartSixDataList.total2
        }
        ]
      }
      this.patrolec.setOption(option)
    }
  },
  // 页面打开时初始化 echart
  mounted () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.initEcharts()
    window.addEventListener('resize', () => {
      this.patrolec.resize()
    })
    setInterval(() => {
      this.initEcharts()
      // 30分钟刷新一次
    }, 1800000)
  },
  beforeMount () {
  }
  // vue 的生命周期的问题；
  //  created: 没有生成 dom 初始化了 data & method
  //  mounted: 可以获取到 dom
}
</script>

<style lang="less" scoped>
.six {
  width: 100%;
  height: 100%;
  overflow: auto;
}
#patrol {
  height: 100%;
  width: 100%;
  // background-color: transparent;
}
</style>
