<template>
  <div id="patrol">
    <!-- 这是用来渲染 echars -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      patrolec: null,
      dhkshow: true,
      name: ''
    }
  },
  methods: {
    initEcharts () {
      // 初始化
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
          text: '查询项目异常数量',
          subtext: '最近30天内巡查异常数量排行',
          sublink: 'http://www.baidu.com', // 副标题超链接
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
          formatter: '{c}'
        },
        grid: {
          left: '5%',
          top: '20%',
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
          data: ['烟雾报警有无缺失', '烟雾报警有无缺失', '九小场所有无缺失', '灭火器是否有效内']
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
              barBorderRadius: 70,
              borderWidth: 0,
              borderColor: '#333'
            }
          },
          barGap: '0%',
          barCategoryGap: '65%',
          data: [9900, 7723, 7900, 9821]
        }

        ]
      }
      this.patrolec.setOption(option)
      this.patrolec.on('click', (param) => {
        this.name = param.name
        this.$emit('patrolec', this.dhkshow, this.name)
      })
    }
  },
  // 页面打开时初始化 echart
  mounted () {
    this.initEcharts()
    window.addEventListener('resize', () => {
      this.patrolec.resize()
    })
  }
  // vue 的生命周期的问题；
  //  created: 没有生成 dom 初始化了 data & method
  //  mounted: 可以获取到 dom
}
</script>

<style lang="less" scoped>
#patrol {
  background-color: transparent;
}
</style>
