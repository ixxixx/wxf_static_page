<template>
  <!-- 事件柱状图 -->
  <div id="event-zzt"></div>
</template>

<script>
export default {
  data () {
    return {
      eventRatioec: null
    }
  },
  methods: {
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
          formatter: '{b}:{c}'
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
          data: ['第一事件', '第二事件', '第三事件', '第四事件']
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
          data: [9900, 7723, 7900, 9821]
        }

        ]
      }
      this.eventRatioec.setOption(option)
    }
  },
  mounted () {
    this.initEventEcharts()
    window.addEventListener('resize', () => {
      this.eventRatioec.resize()
    })
  }
}
</script>

<style lang="less" scoped>
</style>>
