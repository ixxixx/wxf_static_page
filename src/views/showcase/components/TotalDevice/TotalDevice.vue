<template>
  <div id="totalD">
    <!-- 这是用来渲染 echars -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      totalec: null,
      dhkshow: true,
      name: ''
    }
  },
  methods: {
    // 折线图
    initEcharts () {
      // 初始化
      this.totalec = this.echarts.init(document.querySelector('#totalD'))
      // this.totalec.showLoading()
      let option = {
        title: {
          text: '设备总数排行',
          x: 'center',
          y: '10px',
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        grid: {
          top: 50,
          x: 45,
          x2: 20,
          y2: 40
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2019', '', '', '', '', '', '', '', '', ''],
          axisLine: {
            lineStyle: {
              color: '#fff91e', // 更改坐标轴颜色,
              width: 2
            }
          },
          axisLabel: {
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
          min: 100,
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
            data: [4000, 3500, 3800, 3200, 3600, 3000, 2200, 2000, 2200, 2000],
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
        }
      }
      this.totalec.setOption(option)
      this.totalec.on('click', (param) => {
        // this.dhkshow = true
        this.name = param.name
        this.$emit('totalec', this.dhkshow, this.name)
      })
    }
  },
  // 页面打开时初始化 echart
  mounted () {
    this.initEcharts()
    window.addEventListener('resize', () => {
      this.totalec.resize()
    })
  }
  // vue 的生命周期的问题；
  //  created: 没有生成 dom 初始化了 data & method
  //  mounted: 可以获取到 dom
}
</script>

<style lang="less" scoped>
#totalD {
  background-color: transparent;
}
</style>
