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
          data: ['12-1', '12-02', '12-03', '12-04', '12-5', '12-6', '12-7'],
          axisLine: {
            lineStyle: {
              color: '#999',
              width: 2

            }
          },
          axisLabel: {
            color: '#fff',
            interval: 2
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
          data: [800, 900, 220, 130, 660, 289, 300],
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
          data: [243, 468, 111, 222, 123, 96, 200],
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
          data: [125, 568, 25, 36, 784, 56, 400],
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
