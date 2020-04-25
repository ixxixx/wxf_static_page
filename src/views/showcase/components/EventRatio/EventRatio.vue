<template>
  <!-- 事件柱状图 -->
  <div id="event-zzt"></div>
</template>

<script>
export default {
  props: ['refreshInfo'],
  data () {
    return {
      userInfo: {},
      eventRatioec: null,
      chartChereDataList: {}
    }
  },
  watch: {
    refreshInfo (val, old) {
      console.log(val)
      if (val) {
        this.initEventEcharts()
        console.log('更新成功eventRatio')
      }
    }
  },
  methods: {
    // 事件比例
    async initEventEcharts () {
      let userId = this.userInfo.userId
      await this.$http.get(`/pf/show/eventRateTotal/${userId}`).then((res) => {
        this.chartThereDataList = res.data.data
        let eventName = []
        let total = []
        for (var i in this.chartThereDataList) {
          eventName.push(this.chartThereDataList[i].eventName)
          total.push(this.chartThereDataList[i].total)
        }
        this.chartThereDataList.eventName = eventName
        this.chartThereDataList.total = total
      })
      this.eventRatioec = this.echarts.init(document.querySelector('#event-zzt'))
      let colorArray = [
        {
          top: '#33116b', // 红
          bottom: '#316799'
        }, {
          top: '#ee3b49', // 橙
          bottom: '#ff877b'
        },
        {
          top: '#fda04f', // 黄
          bottom: '#fcaa7f'
        }, {
          top: '#1ff5fc', // 蓝
          bottom: '#0094ff'
        },
        {
          top: '#43ea7e', // 绿
          bottom: '#38f8d4'
        },
        {
          top: '#e8edf4', // 灰
          bottom: '#d1dae9'
        }
      ]
      let option = {
        title: {
          text: '事件比例',
          x: 'center',
          y: '10px',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 11
          }
        },
        // backgroundColor: '#0E2A43',
        tooltip: {
          show: true,
          formatter: '{b}:{c}个'
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
          // data: ['第一事件', '第二事件', '第三事件', '第四事件']
          data: this.chartThereDataList.eventName
        }

        ],
        series: [{
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{c}',
              textStyle: {
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
              barBorderRadius: 50,
              borderWidth: 10
            }
          },
          barGap: '0%',
          barCategoryGap: '70%',
          // data: [9900, 7723, 7900, 9821, 7500, 9688]
          data: this.chartThereDataList.total
        }

        ]
      }
      this.eventRatioec.setOption(option)
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  mounted () {
    this.initEventEcharts()
    window.addEventListener('resize', () => {
      this.eventRatioec.resize()
    })
    setInterval(() => {
      this.initEventEcharts()
      // 30分钟刷新一次
    }, 1800000)
  }
}
</script>

<style lang="less" scoped>
</style>>
