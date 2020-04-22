<template>
  <div class="Main">
  <div class="head">
   <router-link :to="{name:'SmokeSensorEquip'}"><el-card class="title " >全部烟感设备</el-card></router-link>
<router-link :to="{name:'SmokeSensorEquipAlert'}"><el-card class="title ">烟感报警信息</el-card></router-link>
      <router-link :to="{name:'SmokeSensorEquipStatistics'}"><el-card class="title on" >烟感设备统计</el-card></router-link>
  </div>
  <div class="content">
      <el-card class="box-card" id="zs1"></el-card>
      <el-card class="box-card" id="zs2"></el-card>
      <el-card class="box-card last" id="zs3"></el-card>
      <el-card class="card-zxt" id="zs4"></el-card>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    Zs1Echarts () {
      // 初始化
      this.zs1ec = this.echarts.init(document.querySelector('#zs1'))
      let option = {
        // backgroundColor: '#fff',
        title: {
          text: '报警总量',
          subtext: '31242',
          x: 'center',
          y: '37%',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 14,
            color: '#999999'
          },
          subtextStyle: {
            fontSize: 22,
            color: '#1890ff'
          }
        },

        legend: {
          orient: 'horizontal',
          x: 'center',
          //   right: 'right',
          // bottom: 10,
          bottom: 'bottom',
          itemWidth: 12,
          itemHeight: 10,
          itemGap: 12,
          textStyle: {
            color: '#0094ff'
          }
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{b}：{c}个<br/>占比：({d}%)'
        },
        series: [{
          itemStyle: { // 图形样式
            normal: {
              borderColor: '#fff',
              borderWidth: 4
            }
          },
          type: 'pie',
          center: ['50%', '45%'],
          stillShowZeroSum: true,
          radius: ['50%', '74%'],
          label: {
            normal: {
              position: 'inner',
              show: false,
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 110,
            name: '信息',
            itemStyle: {
              normal: {
                color: '#4ecb73'
              }

            }
          }, {
            value: 222,
            name: '灾难',
            itemStyle: {
              normal: {
                color: '#f2637b'
              }

            }
          }, {
            value: 113,
            name: '严重',
            itemStyle: {
              normal: {
                color: '#975fe5'
              }

            }
          }, {
            value: 122,
            name: '未分类',
            itemStyle: {
              normal: {
                color: '#3aa1ff'
              }

            }
          }, {
            value: 122,
            name: '告警',
            itemStyle: {
              normal: {
                color: '#f2a363'
              }

            }
          }, {
            value: 132,
            name: '一般严重',
            itemStyle: {
              normal: {
                color: '#fbd437'
              }

            }
          }]
        }]
      }
      this.zs1ec.setOption(option)
    },
    Zs2Echarts () {
      // 初始化
      this.zs2ec = this.echarts.init(document.querySelector('#zs2'))
      let option = {
        title: {
          text: '题目未定义',
          x: 'center',
          y: '10px',
          textStyle: {
            color: '#eee',
            fontSize: 15
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} :  <br/>{d}% <br/> {c}个'
        },
        legend: {
          orient: 'horizontal',
          show: true,
          x: 'center',
          bottom: 'bottom',
          itemGap: 12,
          itemWidth: 10,
          itemHeight: 10,
          data: ['其他1', '其他2', '其他3', '其他4', '其他5', '其他6'],
          textStyle: {
            color: '#0094ff',
            fontSize: 12
          }
        },
        color: ['#fdb301', '#57e7ec', '#cf9ef1', '#8d7fec', '#5085f2', '#e75fc3'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '60%',
            center: ['50%', '55%'],
            data: [
              { value: 335, name: '其他1' },
              { value: 310, name: '其他2' },
              { value: 234, name: '其他3' },
              { value: 135, name: '其他4' },
              { value: 1548, name: '其他5' },
              { value: 135, name: '其他6' }
            ],
            label: {
              normal: {
                // formatter: '{b}\n{c}个',
                formatter: '{b}',
                textStyle: {
                  fontSize: '14'
                }
              }
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 5
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }

            }
          }
        ]
      }
      this.zs2ec.setOption(option)
    },
    Zs3Echarts () {
      // 初始化
      this.zs3ec = this.echarts.init(document.querySelector('#zs3'))
      let option = {
        title: {
          text: '设备离线比例',
          subtext: '次要',
          x: 'center',
          y: 'center',
          textStyle: {
            color: '#eee',
            fontWeight: 'normal',
            fontSize: 16
          }
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{b}: </br> {c} </br> ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: '0%',
          data: ['10-50', '50-100', '100-500', '>500'],
          textStyle: {
            color: '#0094ff'
          }
        },
        series: [{
          type: 'pie',
          selectedMode: 'single',
          radius: ['45%', '68%'],
          color: ['#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],

          label: {
            normal: {
              // position: 'inner',
              // formatter: '{d}%',

              textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 5713,
            name: '10-50'
          }, {
            value: 9938,
            name: '50-100'
          }, {
            value: 17623,
            name: '100-500'
          }, {
            value: 3299,
            name: '>500'
          }]
        }]
      }
      this.zs3ec.setOption(option)
    },
    Zs4Echarts () {
      // 初始化
      this.zs4ec = this.echarts.init(document.querySelector('#zs4'))
      let option = {
        title: {
          text: '信息登记',
          x: 'center',
          y: '30px',
          textStyle: {
            color: '#fff',
            fontSize: 20
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }

        },
        legend: {
          data: ['2017', '2018'],
          left: 'right',
          top: 10,
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        grid: {
          left: '10%',
          top: '20%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLabel: {
            interval: 0,
            show: true,
            textStyle: {
              color: '#9cdcfe'
            }
          },
          axisTick: { // 刻度值线
            show: true
          },
          splitLine: { // 网格线
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#d9faff',
              width: 2 // 粗细
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '(总数)',
          axisLabel: {
            color: '#9cdcfe'
          },
          axisTick: { // 刻度值线
            show: false
          },
          splitLine: { // 网格线
            show: true,
            lineStyle: {
              color: '#d9faff'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#d9faff',
              width: 2 // 粗细
            }
          },
          splitArea: {
            show: false,
            areaStyle: {
              // color: ["#EAEBEC", "#FFF"]
            }
          }
        },
        series: [
          {
            name: 2017,
            smooth: true, // 平滑
            symbol: 'none',
            type: 'line',
            data: [100, 33, 1, 1, 32, 31, 21, 33, 31, 21, 13, 11]
          },
          {
            name: 2018,
            smooth: true,
            symbol: 'none',
            type: 'line',
            data: [2, 42, 1, 1, 32, 1, 6, 4, 5, 100, 30, 41]
          }
        ],
        color: ['#fbd437', '#FE0404']
      }
      this.zs4ec.setOption(option)
    }
  },
  mounted () {
    this.Zs1Echarts()
    this.Zs2Echarts()
    this.Zs3Echarts()
    this.Zs4Echarts()
    window.addEventListener('resize', () => {
      this.zs1ec.resize()
      this.zs2ec.resize()
      this.zs3ec.resize()
      this.zs4ec.resize()
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/main.less';
.head {
  height: 100px;
}
.content{
  float: left;
    width: 100%;
    .box-card {
    float: left;
    width: 30%;
    height: 300px;
    margin-right: 5%;
    background-color: #113356;
  }
    .card-zxt {
        float: left;
        width: 100%;
        height: 300px;
        margin-top: 30px;
        background-color: #113356;
    }
  .last {
      margin-right: 0;
  }
}

</style>
