<template>
  <div id="report">
    <!-- 这是用来渲染 echars -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      reportec: null,
      dhkshow: true,
      name: ''
    }
  },
  methods: {
    initEcharts () {
      // 初始化
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
        grid: {
          top: 50,
          x: 55,
          y2: 40
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['烟感', '燃气', '电气', '网关', 'NB', 'GBRS'],
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
          // max: function (value) {
          //   return value.max + 20
          // },
          splitNumber: 5,
          type: 'value',
          // data: ['烟感', '燃气', '电气', '网关', 'NB', 'GBRS'],
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 12
            },
            formatter: '{value}%'
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
            data: [10, 30, 80, 30, 60, 30],
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
            lineStyle: {
              color: '#3c9bd5'
            },
            itemStyle: {
              color: '#f8fc0d'
            }
          }
        ],
        tooltip: {
        }
      }
      this.reportec.setOption(option)
      this.reportec.on('click', (param) => {
        // this.dhkshow = true
        console.log(param)
        this.name = param.name
        this.$emit('reportec', this.dhkshow, this.name)
      })
    }
  },
  // 页面打开时初始化 echart
  mounted () {
    this.initEcharts()
    window.addEventListener('resize', () => {
      this.reportec.resize()
    })
  }
  // vue 的生命周期的问题；
  //  created: 没有生成 dom 初始化了 data & method
  //  mounted: 可以获取到 dom
}
</script>

<style lang="less" scoped>
#report {
  background-color: transparent;
}
</style>
