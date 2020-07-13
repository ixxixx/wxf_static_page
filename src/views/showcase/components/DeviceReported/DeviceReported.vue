<template>
  <div id="report">
    <!-- 这是用来渲染 echars -->
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: ['refreshInfo'],
  data () {
    return {
      userInfo: {},
      reportec: null,
      chartTwoDataList: {},
      timer: ''
    }
  },
  watch: {
    refreshInfo (val, old) {
      if (val) {
        this.initEcharts()
      }
    }
  },
  methods: {
    async initEcharts () {
      // 初始化
      let userId = this.userInfo.userId
      await this.$http.get(`/pf/show/warnMsgTotal/${userId}`).then((res) => {
        this.chartTwoDataList = res.data.data
        let intraday = []
        let faultTotal = []
        let warnTotal = []
        for (var i in this.chartTwoDataList) {
          this.chartTwoDataList[i].intraday = (dayjs(this.chartTwoDataList[i].intraday).format('MM-DD'))
          intraday.push(this.chartTwoDataList[i].intraday)
          faultTotal.push(this.chartTwoDataList[i].faultTotal)
          warnTotal.push(this.chartTwoDataList[i].warnTotal)
        }
        this.chartTwoDataList.intraday = intraday
        this.chartTwoDataList.faultTotal = faultTotal
        this.chartTwoDataList.warnTotal = warnTotal
      })
      this.reportec = this.echarts.init(document.querySelector('#report'))
      let option = {
        title: {
          text: '设备上报监控信息统计',
          x: 'center',
          y: '10px',
          textStyle: {
            color: '#fff',
            fontSize: 15
          }
        },
        legend: {
          textStyle: {
            color: '#fff'
          },
          data: ['报警', '故障'],
          itemHeight: 5,
          top: 30,
          right: 'right'
        },
        grid: {
          top: 60,
          x: 40,
          x2: 40,
          y2: 40
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['烟感', '燃气', '电气', '网关', 'NB', 'GBRS'],
          data: this.chartTwoDataList.intraday,
          axisLine: {
            lineStyle: {
              color: '#289fe3', // 更改坐标轴颜色,
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 10
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          minInterval: 1,
          type: 'value',
          // data: ['烟感', '燃气', '电气', '网关', 'NB', 'GBRS'],
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 12
            }
            // formatter: '{value}%'
          },
          axisLine: {
            lineStyle: {
              color: '#289fe3', // 更改坐标轴颜色,
              width: 2
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '报警',
            // data: [10, 30, 80, 30, 60, 30],
            data: this.chartTwoDataList.warnTotal,
            type: 'line',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: '#0e5778' // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: '#23709d' // 30% 处的颜色
                  },
                  {
                    offset: 0,
                    color: '#3c9bd5' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            itemStyle: {
              normal: {
                color: '#3c9bd5',
                borderWidth: 1
              }
            }
          },
          {
            name: '故障',
            // data: [20, 60, 70, 40, 40, 10],
            data: this.chartTwoDataList.faultTotal,
            type: 'line',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: '#0e5778' // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: '#23709a' // 30% 处的颜色
                  },
                  {
                    offset: 0,
                    color: '#525df1' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            //
            itemStyle: {
              normal: {
                color: '#3945f5',
                borderWidth: 1
              }
            }
          }
        ],
        tooltip: {
          trigger: 'axis'
        }
      }
      this.reportec.setOption(option)
    }
  },
  // 页面打开时初始化 echart
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  mounted () {
    this.initEcharts()
    window.addEventListener('resize', () => {
      this.reportec.resize()
    })
    this.timer = setInterval(() => {
      this.initEcharts()
      // 30分钟刷新一次
    }, 1800000)
  },
  beforeDestroy () {
    // 清除定时器
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less" scoped>
#report {
  background-color: transparent;
  // background: #ff101c;
}
</style>
