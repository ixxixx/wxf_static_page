<template>
  <div id="level">
    <!-- 这是用来渲染 echars -->
  </div>
</template>

<script>
export default {
  props: ['refreshInfo'],
  data () {
    return {
      userInfo: {},
      levelec: null,
      dhkshow: true,
      name: '',
      chartFiveDataList: {}
    }
  },
  watch: {
    refreshInfo (val, old) {
      console.log(val)
      if (val) {
        this.initEcharts()
        console.log('更新成功level')
      }
    }
  },
  methods: {
    async initEcharts () {
      // 初始化
      let userId = this.userInfo.userId
      await this.$http.get(`/pf/show/deviceLevelTotal/${userId}`).then((res) => {
        this.chartFiveDataList = res.data.data
        let dangerLevel = []
        let total = []
        for (var i in this.chartFiveDataList) {
          dangerLevel.push(this.chartFiveDataList[i].dangerLevel)
          total.push(this.chartFiveDataList[i].total)
        }
        this.chartFiveDataList.dangerLevel = dangerLevel
        this.chartFiveDataList.total = total
      })
      this.levelec = this.echarts.init(document.querySelector('#level'))
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
        }
      ]
      let option = {
        title: {
          text: '隐患级别统计',
          subtext: '最近30天内巡查异常数量排行',
          sublink: '', // 副标题超链接
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
          formatter: '{b}:{c}'
        },
        grid: {
          left: '10%',
          top: '30%',
          right: '10%',
          bottom: '15%'
        },

        xAxis: {
          type: 'category',
          show: true,
          position: 'bottom',
          data: ['一级隐患', '二级隐患', '三级隐患'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              fontSize: 12
              // fontSize: document.getElementsByTagName('Html')[0].style.fontSize * 20 / 960
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [{
          type: 'value',
          show: false,
          'splitLine': { // 网格线
            'show': false
          }
        }

        ],
        series: [{
          type: 'bar',
          itemStyle: {
            normal: {
              show: false,
              color: function (params) {
                let num = colorArray.length
                return {
                  type: 'linear',
                  x: 0,
                  y: 1,
                  x2: 0.4,
                  y2: 0,
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
                  }]
                  // globalCoord: false
                }
              }
            }
          },
          barCategoryGap: '25%',
          // data: [100, 80, 60]
          data: this.chartFiveDataList.total
        }

        ]
      }
      this.levelec.setOption(option)
      this.levelec.on('click', (param) => {
        this.name = param.name
        this.$emit('levelec', this.dhkshow, this.name)
      })
    }
  },
  // 页面打开时初始化 echart
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  mounted () {
    this.initEcharts()
    window.addEventListener('resize', () => {
      this.levelec.resize()
    })
    setInterval(() => {
      this.initEcharts()
      // 30分钟刷新一次
    }, 1800000)
  }
}
</script>

<style lang="less" scoped>
#level {
  background-color: transparent;
}
</style>
