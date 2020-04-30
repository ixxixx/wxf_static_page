<template>
  <div id="hidden">
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
      hiddenec: null,
      chartFourDataList: {}
    }
  },
  watch: {
    refreshInfo (val, old) {
      console.log(val)
      if (val) {
        this.initEcharts()
        console.log('更新成功hiddendanger')
      }
    }
  },
  methods: {
    async initEcharts () {
      // 初始化
      let userId = this.userInfo.userId
      await this.$http.get(`/pf/show/dangerLevelAlarmTotal/${userId}`).then((res) => {
        this.chartFourDataList = res.data.data
        let intraday = []
        let level1 = []
        let level2 = []
        let level3 = []
        for (var i in this.chartFourDataList) {
          this.chartFourDataList[i].intraday = (dayjs(this.chartFourDataList[i].intraday).format('MM-DD'))
          intraday.push(this.chartFourDataList[i].intraday)
          level1.push(this.chartFourDataList[i].level1)
          level2.push(this.chartFourDataList[i].level2)
          level3.push(this.chartFourDataList[i].level3)
        }
        this.chartFourDataList.intraday = intraday
        this.chartFourDataList.level1 = level1
        this.chartFourDataList.level2 = level2
        this.chartFourDataList.level3 = level3
      })
      this.hiddenec = this.echarts.init(document.querySelector('#hidden'))

      let option = {
        title: {
          text: '隐患级别统计',
          x: '10px',
          y: '10px',
          itemGap: 10,
          textStyle: {
            color: '#fff',
            fontSize: 15
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff'
          },
          data: ['一级', '二级', '三级'],
          itemHeight: 5,
          right: 'right'
        // bottom: 'bottom'
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '8%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['12-1', '12-02', '12-03', '12-04', '12-5', '12-6', '12-7'],
          data: this.chartFourDataList.intraday,
          axisLine: {
            lineStyle: {
              color: '#999',
              width: 2

            }
          },
          axisLabel: {
            color: '#fff',
            interval: 1
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 10
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#999',
              width: 2
            }
          },
          nameTextStyle: {
            color: '#999'
          },
          splitArea: {
            show: false
          }
        },
        series: [{
          name: '一级',
          type: 'line',
          symbolSize: 3,
          // data: [800, 900, 220, 130, 660, 289, 300],
          data: this.chartFourDataList.level1,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          itemStyle: {
            normal: {
              color: '#ff101c'
            }
          },
          smooth: true
        },
        {
          name: '二级',
          type: 'line',
          symbolSize: 3,
          // data: [243, 468, 111, 222, 123, 96, 200],
          data: this.chartFourDataList.level2,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          itemStyle: {
            normal: {
              color: '#fdaf48',
              borderWidth: 1
            }
          },
          smooth: true
        },
        {
          name: '三级',
          type: 'line',
          symbolSize: 3,
          // data: [125, 568, 25, 36, 784, 56, 400],
          data: this.chartFourDataList.level3,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          itemStyle: {
            normal: {
              color: '#ecfc5d',
              borderWidth: 1
            }
          },
          smooth: true
        }
        ]
      }
      this.hiddenec.setOption(option)
    }
  },
  // 页面打开时初始化 echart
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  mounted () {
    this.initEcharts()
    window.addEventListener('resize', () => {
      this.hiddenec.resize()
    })
    setInterval(() => {
      this.initEcharts()
      // 30分钟刷新一次
    }, 1800000)
  }
}
</script>

<style lang="less" scoped>
#hidden {
  background-color: transparent;
}
</style>
