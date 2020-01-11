<template>
  <div id="hidden">
    <!-- 这是用来渲染 echars -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      hiddenec: null,
      dhkshow: true,
      name: ''
    }
  },
  methods: {
    initEcharts () {
      // 初始化
      this.hiddenec = this.echarts.init(document.querySelector('#hidden'))
      let option = {
        title: {
          text: '最近30天隐患数量',
          subtext: '最近30天隐患数量趋势',
          sublink: '#',
          x: '10px',
          y: '5px',
          itemGap: 10,
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 11
          }
        },
        grid: {
          top: 70,
          x: 55,
          y2: 30
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2019-12-6', '2019-12-07', '2019-12-08', '2019-12-09', '2019-12-10', '2019-12-11'],
          axisLine: {
            lineStyle: {
              color: '#289fe3', // 更改坐标轴颜色,
              width: 2
            }
          },
          axisLabel: {
            interval: 1,
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
          min: 0,
          // max: function (value) {
          //   return value.max + 50
          // },
          type: 'value',
          splitNumber: 3,
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 12
            },
            formatter: '{value} %'
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
            data: [80, 30, 100, 30, 60, 30],
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
      this.hiddenec.setOption(option)
      this.hiddenec.on('click', (param) => {
        this.name = param.name
        this.$emit('hiddenec', this.dhkshow, this.name)
      })
    }
  },
  // 页面打开时初始化 echart
  mounted () {
    this.initEcharts()
    window.addEventListener('resize', () => {
      this.hiddenec.resize()
    })
  }
  // vue 的生命周期的问题；
  //  created: 没有生成 dom 初始化了 data & method
  //  mounted: 可以获取到 dom
}
</script>

<style lang="less" scoped>
#hidden {
  background-color: transparent;
}
</style>
