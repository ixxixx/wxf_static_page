<template>
  <div id="totalD">
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
      chartOneDataList: {}
    }
  },
  watch: {
    refreshInfo (val, old) {
      console.log(val)
      if (val) {
        this.initEcharts()
        console.log('更新成功 totaldevice')
      }
    }
  },
  methods: {
    // 折线图
    async initEcharts () {
      // 初始化
      let userId = this.userInfo.userId
      await this.$http.get(`/pf/show/deviceDailyTotal/${userId}`).then((res) => {
        this.chartOneDataList = res.data.data
        let date = []
        let total = []
        for (var i in this.chartOneDataList) {
          this.chartOneDataList[i].date = (dayjs(this.chartOneDataList[i].date).format('MM-DD'))
          date.push(this.chartOneDataList[i].date)
          total.push(this.chartOneDataList[i].total)
        }
        this.chartOneDataList.date = date
        this.chartOneDataList.total = total
      })
      this.totalec = this.echarts.init(document.querySelector('#totalD'))
      // this.totalec.showLoading()
      let option = {
        title: {
          text: '设备总数',
          x: 'center',
          y: '10px',
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        grid: {
          top: 60,
          x: 45,
          x2: 40,
          y2: 40
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          data: this.chartOneDataList.date,
          axisLine: {
            lineStyle: {
              color: '#fff91e', // 更改坐标轴颜色,
              width: 2
            }
          },
          axisLabel: {
            interval: 2,
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          // splitNumber: 3,
          minInterval: 1,
          // min: 1000,
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff91e', // 更改坐标轴颜色,
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
            // data: [140, 150, 180, 200, 236, 300, 310, 340, 380, 420],
            data: this.chartOneDataList.total,
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
                    offset: 0.6,
                    color: '#f2fe23' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#45a2ce' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            lineStyle: {
              color: '#f2fe23'
            },
            itemStyle: {
              color: '#01a1dd'
            }
          }
        ],
        tooltip: {
          trigger: 'axis'
        }
      }
      this.totalec.setOption(option)
      // this.totalec.on('click', (param) => {
      // this.dhkshow = true
      // this.name = param.name
      // this.$emit('totalec', this.dhkshow, this.name)
      // })
    },
    // 日增累积总量
    getDeviceDailyTotal () {
    }
  },
  // 页面打开时初始化 echart
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.getDeviceDailyTotal()
  },
  mounted () {
    this.initEcharts()
    window.addEventListener('resize', () => {
      this.totalec.resize()
    })
  }
}
</script>

<style lang="less" scoped>
#totalD {
  background-color: transparent;
}
</style>
