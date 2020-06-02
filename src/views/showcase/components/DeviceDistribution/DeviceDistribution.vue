<template>
  <div class="eq-main">
    <div class="map">
      <el-tabs v-model="shouxuan" type="card" @tab-click="handleClick">
        <el-tab-pane label="矢量 图" name="first">
          <div
            id="china-map"
            style="height:100%"
            :class="[$route.name === 'showcase' ? 'bgshow' : 'bghide']"
          ></div>
        </el-tab-pane>
        <el-tab-pane label="百度地图" name="second">
          <BaiDuMap></BaiDuMap>
        </el-tab-pane>
          <!-- <el-tab-pane label="消防CRT" disabled> </el-tab-pane> -->
      </el-tabs>
    </div>
    <Notice v-show="$route.name === 'home'"></Notice>
    <!-- <div
      class="total-title"
      v-show="$route.name === 'showcase' && this.shouxuan === 'first'"
    >
      <ul>
        <li :class="{ Acolor: this.colorShow[0] }" @click="allGetPointData">
          全部
        </li>
        <li :class="{ Acolor: this.colorShow[1] }" @click="dqaqGetPointData">
          烟感
        </li>
        <li :class="{ Acolor: this.colorShow[2] }" @click="rqtcbjGetPointData">
          燃气
        </li>
        <li :class="{ Acolor: this.colorShow[3] }" @click="hzywbjGetPointData">
          物联网关
        </li>
        <li :class="{ Acolor: this.colorShow[4] }" @click="wlwgGetPointData">
          电器火灾
        </li>
      </ul>
    </div> -->
    <i @click="navB" v-show="!navShow" class="el-icon-circle-plus navjia"></i>
    <div
      class="nav"
      v-show="navShow && $route.name === 'showcase'"
    >
      <ul class="ul-six">
        <li>
           <router-link :to="{ name: 'SmokeSensorEquip' }">
          <i class="ulBG">
            <img src="@/assets/sSensation.png" alt="" />
            <em class="SixNumber">{{ this.circleNavData.total[0] }}</em>
          </i>
          <p>{{ this.circleNavData.devType[0] }}</p>
           </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'IOTGateway' }">
            <i class="ulBG"
              ><img src="@/assets/host.png" alt="" /><em class="SixNumber">{{
                this.circleNavData.total[1]
              }}</em></i
            >
            <p>{{ this.circleNavData.devType[1] }}</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'GasDeterctor' }">
          <i class="ulBG"
            ><img src="@/assets/gas.png" alt="" /><em class="SixNumber">{{
              this.circleNavData.total[2]
            }}</em></i
          >
          <p>{{ this.circleNavData.devType[2] }}</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ElectricalFireEquipment' }">
          <i class="ulBG"
            ><img src="@/assets/electricalFire.png" alt="" /><em class="SixNumber">{{
              this.circleNavData.total[3]
            }}</em></i
          >
          <p>{{ this.circleNavData.devType[3] }}</p>
          </router-link>
        </li>
        <li v-show="this.circleNavData.devType[4] === ''">
          <i class="ulBG"
            ><img src="@/assets/ul-six.png" alt="" /><em class="SixNumber">{{
              this.circleNavData.total[4]
            }}</em></i
          >
          <p>{{ this.circleNavData.devType[4] }}</p>
        </li>
        <li v-show="this.circleNavData.devType[5] === ''">
          <i class="ulBG"
            ><img src="@/assets/ul-six.png" alt="" /><em class="SixNumber">{{
              this.circleNavData.total[5]
            }}</em></i
          >
          <p>{{ this.circleNavData.devType[5] }}</p>
        </li>
      </ul>
      <i @click="navS" class="el-icon-error" v-show="navShow"></i>
    </div>
    <!-- 侧边栏 -->
    <i
      @click="sidebarB"
      v-show="!sidebarShow"
      class="el-icon-circle-plus sidebarjia"
    ></i>
    <div class="sidebar" v-show="sidebarShow && $route.name === 'showcase'">
      <div class="sidebar-title">
        紧急事件通知
        <i
          @click.stop="sidebarS"
          class="el-icon-error"
          v-show="sidebarShow"
        ></i>
      </div>
      <ul>
        <li @click="sidebarDialog(item)"
          v-for="(item, index) in this.sjztData.slice(0 , 10)"
          :key="index"
          class="sidebar-one notes">
          <div class="yuan">
            <p>{{item.msgType === 2 ? '报警' : '故障' }}</p>
          </div>
          <span class="time">{{ item.happenTime | dateFilter }}</span>
          <span class="devId">{{ item.devType }}</span>
          <span class="address">{{
            !(item.province + item.city + item.county + item.detailAddress) ? '地址:无' : item.province + item.city + item.county + item.detailAddress
          }}</span>
        </li>
      </ul>
    </div>
    <el-dialog class="dialogsd" title="详细信息" :visible.sync="dialogSidebar">
      <el-form>
        <el-form-item label="发生时间 :" label-width="150px">
          <P>{{ this.singleSidebarInfo.happenTime }}</P>
        </el-form-item>
        <el-form-item label="项目名称 :" label-width="150px">
          <P>{{ this.singleSidebarInfo.proName }}</P>
        </el-form-item>
        <el-form-item label="负责人电话 :" label-width="150px">
          <P>{{ this.singleSidebarInfo.phone }}</P>
        </el-form-item>
        <el-form-item label="设备类型 :" label-width="150px">
          <P>{{ this.singleSidebarInfo.devType }}</P>
        </el-form-item>
        <el-form-item label="危险等级 :" label-width="150px">
          <P>{{ this.singleSidebarInfo.dangerLevel }}</P>
        </el-form-item>
        <el-form-item label="通讯方式 :" label-width="150px">
          <P>{{ this.singleSidebarInfo.communicate }}</P>
        </el-form-item>
        <el-form-item label="是否为个人 :" label-width="150px">
          <el-radio-group disabled v-model="singleSidebarInfo.personal">
            <el-radio :label=false>否</el-radio>
            <el-radio :label=true>是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="安装位置 :" label-width="150px">
          <P>{{ this.singleSidebarInfo.point }}</P>
        </el-form-item>
        <el-form-item label="地址 :" label-width="150px">
          <P>{{ this.singleSidebarInfo.address }}</P>
        </el-form-item>
        <el-form-item label="备注 :" label-width="150px">
          <P>{{ this.singleSidebarInfo.remark }}</P>
        </el-form-item>
        <el-form-item label="处理情况 :" label-width="150px">
          <el-radio-group :disabled="this.singleSidebarInfo.msgState!== 0" v-model="singleSidebarInfo.msgState" @change="changeStateValue">
            <el-radio :label=-1>无需处理</el-radio>
            <el-radio :label=0>未处理</el-radio>
            <el-radio :label=1>已处理</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="margin-right:20px" type="primary" @click="dialogSidebar = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 底部 -->
    <Footer v-show="$route.name === 'showcase'"></Footer>
    <!-- <Urgent
      v-show="$route.name === 'showcase'"
      :title="title"
      :dialogVisible="dialogVisible"
      :neirong="neirong"
      @urgentF="urgentF"
    ></Urgent> -->

    <router-link :to="{ name: 'showcase' }"
      ><el-button v-show="$route.name === 'home'" round class="btnOn"
        >进入展示台</el-button
      ></router-link
    >
  </div>
</template>

<script>
import './china'
import Footer from './components/Footer'
import BaiDuMap from './components/BaiDuMap'
// import Urgent from './components/Urgent'
import Notice from './components/Notice'
import dayjs from 'dayjs'
export default {
  name: 'mapbox',
  data () {
    return {
      userInfo: {},
      // title: '紧急火警', // 弹窗主题
      // dialogVisible: false, // 弹窗显示
      // neirong: '这是传递给父组件的内容:大浪地区发生火警', // 弹窗显示内容
      chinaMapec: null,
      shouxuan: 'first',
      sidebarShow: true,
      navShow: true,
      circleNavData: {
        devType: [],
        total: []
      },
      allCity: [],
      dialogSidebar: false,
      allSidebar: [],
      singleSidebarInfo: {},
      sjztData: []
    }
  },
  components: {
    Footer, // 底部组件
    BaiDuMap, // 地图组件
    // Urgent, // 经济弹窗组件
    Notice // 首页信息
  },
  computed: {
  },
  methods: {
    getCircleNav () {
      let userId = this.userInfo.userId
      this.$http.get(`/pf/show/deviceTypeTotal/${userId}`).then((res) => {
        this.circleNavData = res.data.data
        let devType = []
        let total = []
        for (var i in this.circleNavData) {
          devType.push(this.circleNavData[i].devType)
          total.push(this.circleNavData[i].total)
        }
        this.circleNavData.devType = devType
        this.circleNavData.total = total
      })
    },
    // 获取事件状态信息
    getsjztData () {
      let userId = this.userInfo.userId
      this.$http.get(`/pf/show/currentWarnMsg/${userId}`).then((res) => {
        const arr = this.allSidebar
        this.sjztData = arr.concat(res.data.data)
        this.sjztData.happenTime = dayjs(this.sjztData.happenTime).format('YYYY-MM-DD HH:mm:ss')
        console.log(this.sjztData)
      })
    },
    sidebarDialog (item) {
      this.dialogSidebar = true
      this.singleSidebarInfo = item
      this.singleSidebarInfo.address = !(item.province + item.city + item.county + item.detailAddress) ? '地址:无' : item.province + item.city + item.county + item.detailAddress
      this.singleSidebarInfo.happenTime = dayjs(this.singleSidebarInfo.happenTime).format('YYYY-MM-DD HH:mm:ss')
    },
    changeStateValue () {
      let dto = {
        'reIds': [this.singleSidebarInfo.reId],
        'stateValue': this.singleSidebarInfo.msgState
      }
      this.$http.post('/pf/warn/handle', dto).then((res) => {
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 中国地图
    async initChinaMap (data) {
      this.chinaMapec = this.echarts.init(document.querySelector('#china-map'))
      await this.renderMap(data)
    },
    //  ----------------------------------------------------------------------------------------------------
    // Urgentmessage () {
    //   this.dialogVisible = true
    // },
    // urgentF (value) {
    //   this.dialogVisible = value
    // },
    //  ----------------------------------------------------------------------------------------------------
    // 侧边栏的隐藏
    sidebarS () {
      this.sidebarShow = false
    },
    sidebarB () {
      this.sidebarShow = true
    },
    // 右上的隐藏
    navS () {
      this.navShow = false
    },
    navB () {
      this.navShow = true
    },
    async renderMap (opt) {
      let userId = this.userInfo.userId
      await this.$http.get(`/pf/show/areaDeviceTotal?userId=${userId}`).then((res) => {
        let data = res.data.data
        let map = new Map()
        for (let i = 0; i < data.length; i++) {
          let value = map.get(data[i].city)
          if (value === undefined) {
            map.set(data[i].city, [{ devType: data[i].devType, total: data[i].total }])
          } else {
            value.push({ devType: data[i].devType, total: data[i].total })
          }
        }
        // console.log(map, '```````````````````````````````````````````````````````408')

        this.allCity = map
      })

      let geoCoordMap = {
        '海门市': [121.15, 31.89],
        '鄂尔多斯市': [109.781327, 39.608266],
        '招远市': [120.38, 37.35],
        '舟山市': [122.207216, 29.985295],
        '齐齐哈尔市': [123.97, 47.33],
        '盐城市': [120.13, 33.38],
        '赤峰市': [118.87, 42.28],
        '青岛市': [120.33, 36.07],
        '乳山市': [121.52, 36.89],
        '金昌市': [102.188043, 38.520089],
        '泉州市': [118.58, 24.93],
        '莱西市': [120.53, 36.86],
        '日照市': [119.46, 35.42],
        '胶南市': [119.97, 35.88],
        '南通市': [121.05, 32.08],
        '拉萨市': [91.11, 29.97],
        '云浮市': [112.02, 22.93],
        '梅州市': [116.1, 24.55],
        '文登市': [122.05, 37.2],
        '上海市': [121.48, 31.22],
        '攀枝花市': [101.718637, 26.582347],
        '威海市': [122.1, 37.5],
        '承德市': [117.93, 40.97],
        '厦门市': [118.1, 24.46],
        '汕尾市': [115.375279, 22.786211],
        '潮州市': [116.63, 23.68],
        '丹东市': [124.37, 40.13],
        '太仓市': [121.1, 31.45],
        '曲靖市': [103.79, 25.51],
        '烟台市': [121.39, 37.52],
        '福州市': [119.3, 26.08],
        '瓦房店市': [121.979603, 39.627114],
        '即墨市': [120.45, 36.38],
        '抚顺市': [123.97, 41.97],
        '玉溪市': [102.52, 24.35],
        '张家口市': [114.87, 40.82],
        '阳泉市': [113.57, 37.85],
        '莱州市': [119.942327, 37.177017],
        '湖州市': [120.1, 30.86],
        '汕头市': [116.69, 23.39],
        '昆山市': [120.95, 31.39],
        '宁波市': [121.56, 29.86],
        '湛江市': [110.359377, 21.270708],
        '揭阳市': [116.35, 23.55],
        '荣成市': [122.41, 37.16],
        '连云港市': [119.16, 34.59],
        '葫芦岛市': [120.836932, 40.711052],
        '常熟市': [120.74, 31.64],
        '东莞市': [113.75, 23.04],
        '河源市': [114.68, 23.73],
        '淮安市': [119.15, 33.5],
        '泰州市': [119.9, 32.49],
        '南宁市': [108.33, 22.84],
        '营口市': [122.18, 40.65],
        '惠州市': [114.4, 23.09],
        '江阴市': [120.26, 31.91],
        '蓬莱市': [120.75, 37.8],
        '韶关市': [113.62, 24.84],
        '嘉峪关市': [98.289152, 39.77313],
        '广州市': [113.23, 23.16],
        '延安市': [109.47, 36.6],
        '太原市': [112.53, 37.87],
        '清远市': [113.01, 23.7],
        '中山市': [113.38, 22.52],
        '昆明市': [102.73, 25.04],
        '寿光市': [118.73, 36.86],
        '盘锦市': [122.070714, 41.119997],
        '长治市': [113.08, 36.18],
        '深圳市': [114.07, 22.62],
        '珠海市': [113.52, 22.3],
        '宿迁市': [118.3, 33.96],
        '咸阳市': [108.72, 34.36],
        '铜川市': [109.11, 35.09],
        '平度市': [119.97, 36.77],
        '佛山市': [113.11, 23.05],
        '海口市': [110.35, 20.02],
        '江门市': [113.06, 22.61],
        '章丘市': [117.53, 36.72],
        '肇庆市': [112.44, 23.05],
        '大连市': [121.62, 38.92],
        '临汾市': [111.5, 36.08],
        '吴江市': [120.63, 31.16],
        '石嘴山市': [106.39, 39.04],
        '沈阳市': [123.38, 41.8],
        '苏州市': [120.62, 31.32],
        '茂名市': [110.88, 21.68],
        '嘉兴市': [120.76, 30.77],
        '长春市': [125.35, 43.88],
        '胶州市': [120.03336, 36.264622],
        '银川市': [106.27, 38.47],
        '张家港市': [120.555821, 31.875428],
        '三门峡市': [111.19, 34.76],
        '锦州市': [121.15, 41.13],
        '南昌市': [115.89, 28.68],
        '柳州市': [109.4, 24.33],
        '三亚市': [109.511909, 18.252847],
        '自贡市': [104.778442, 29.33903],
        '吉林市': [126.57, 43.87],
        '阳江市': [111.95, 21.85],
        '泸州市': [105.39, 28.91],
        '西宁市': [101.74, 36.56],
        '宜宾市': [104.56, 29.77],
        '呼和浩特市': [111.65, 40.82],
        '成都市': [104.06, 30.67],
        '大同市': [113.3, 40.12],
        '镇江市': [119.44, 32.2],
        '桂林市': [110.28, 25.29],
        '张家界市': [110.479191, 29.117096],
        '宜兴市': [119.82, 31.36],
        '北海市': [109.12, 21.49],
        '西安市': [108.95, 34.27],
        '金坛市': [119.56, 31.74],
        '东营市': [118.49, 37.46],
        '牡丹江市': [129.58, 44.6],
        '遵义市': [106.9, 27.7],
        '绍兴市': [120.58, 30.01],
        '扬州市': [119.42, 32.39],
        '常州市': [119.95, 31.79],
        '潍坊市': [119.1, 36.62],
        '重庆市': [106.54, 29.59],
        '台州市': [121.420757, 28.656386],
        '南京市': [118.78, 32.04],
        '滨州市': [118.03, 37.36],
        '贵阳市': [106.71, 26.57],
        '无锡市': [120.29, 31.59],
        '本溪市': [123.73, 41.3],
        '克拉玛依市': [84.77, 45.59],
        '渭南市': [109.5, 34.52],
        '马鞍山市': [118.48, 31.56],
        '宝鸡市': [107.15, 34.38],
        '焦作市': [113.21, 35.24],
        '句容市': [119.16, 31.95],
        '总部市': [116.46, 39.92],
        '徐州市': [117.2, 34.26],
        '衡水市': [115.72, 37.72],
        '包头市': [110, 40.58],
        '绵阳市': [104.73, 31.48],
        '乌鲁木齐市': [87.68, 43.77],
        '枣庄市': [117.57, 34.86],
        '杭州市': [120.19, 30.26],
        '淄博市': [118.05, 36.78],
        '鞍山市': [122.85, 41.12],
        '溧阳市': [119.48, 31.43],
        '库尔勒市': [86.06, 41.68],
        '安阳市': [114.35, 36.1],
        '开封市': [114.35, 34.79],
        '济南市': [117, 36.65],
        '德阳市': [104.37, 31.13],
        '温州市': [120.65, 28.01],
        '九江市': [115.97, 29.71],
        '邯郸市': [114.47, 36.6],
        '临安市': [119.72, 30.23],
        '兰州市': [103.73, 36.03],
        '沧州市': [116.83, 38.33],
        '临沂市': [118.35, 35.05],
        '南充市': [106.110698, 30.837793],
        '天津市': [117.2, 39.13],
        '富阳市': [119.95, 30.07],
        '泰安市': [117.13, 36.18],
        '诸暨市': [120.23, 29.71],
        '郑州市': [113.65, 34.76],
        '哈尔滨市': [126.63, 45.75],
        '聊城市': [115.97, 36.45],
        '芜湖市': [118.38, 31.33],
        '唐山市': [118.02, 39.63],
        '平顶山市': [113.29, 33.75],
        '邢台市': [114.48, 37.05],
        '德州市': [116.29, 37.45],
        '济宁市': [116.59, 35.38],
        '荆州市': [112.239741, 30.335165],
        '宜昌市': [111.3, 30.7],
        '义乌市': [120.06, 29.32],
        '丽水市': [119.92, 28.45],
        '洛阳市': [112.44, 34.7],
        '秦皇岛市': [119.57, 39.95],
        '株洲市': [113.16, 27.83],
        '石家庄市': [114.48, 38.03],
        '莱芜市': [117.67, 36.19],
        '常德市': [111.69, 29.05],
        '保定市': [115.48, 38.85],
        '湘潭市': [112.91, 27.87],
        '金华市': [119.64, 29.12],
        '岳阳市': [113.09, 29.37],
        '长沙市': [113, 28.21],
        '衢州市': [118.88, 28.97],
        '廊坊市': [116.7, 39.53],
        '菏泽市': [115.480656, 35.23375],
        '合肥市': [117.27, 31.86],
        '武汉市': [114.31, 30.52],
        '大庆市': [125.03, 46.58]
      }
      var data = this.allCity
      var convertData = function (data) {
        var res = []
        data.forEach((value, key) => {
          let geoCoord = geoCoordMap[key]
          if (geoCoord) {
            res.push({
              city: key,
              value: geoCoord,
              category: value
            })
          }
        })
        return res
      }
      let option = {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'transparent',
          formatter: (data, res) => {
            let tipHtml = '<div style="background:#fff;border-radius:10px;padding-top:10px;box-shadow:0 0 10px #666">'
            tipHtml += '<div style="color:#fff;height:20px;border-radius:6px;font-size:16px;line-height:20px;background-color:#5861a2;text-align:center;margin:0 2px;">' + data.data.city + '</div>' +
              '<div style="text-align:left;color:#494949;padding:8px 6px">'
            for (let j = 0; j < data.data.category.length; j++) {
              tipHtml += '<p style="font-size:12px;font-weight:bold;">' + '设备类型: ' + data.data.category[j].devType + '----数量:' + data.data.category[j].total + '个' + '</p>'
            }
            let num = (data.data.category).map(item => item.total)
            let sum = 0
            num.forEach(item => { sum += item })
            tipHtml += '<p style="font-size:12px;font-weight:bold;">' + '全部设备总数: ' + sum + '个' + '</p>'
            tipHtml += '</div>' + '</div>'
            return tipHtml
          }
        },
        geo: {
          left: 80,
          map: 'china',
          roam: true,
          zoom: 1,
          aspectScale: 0.8, // 长宽比
          scaleLimit: {
            min: 1
          },
          itemStyle: {
            normal: {
              areaColor: {
                colorStops: [{
                  offset: 0,
                  color: '#039ee1'
                }, {
                  offset: 1,
                  color: '#2e6fb1'
                }],
                borderColor: '#6ed6f7'
              }
            },
            emphasis: {
              areaColor: '#38a2d9'
            }
          },
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 13,
                color: '#fff'
              }
            }
          }
        },
        series: [{
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(data), // 动态添加数据
          symbolSize: 10,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
            color: '#fff',
            period: 8,
            scale: 3
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              color: 'red',
              shadowBlur: 10
            }
          },
          zlevel: 1
        }

        ]
      }
      this.chinaMapec.setOption(option)
    }
  },
  beforeCreate () {

  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.allSidebar = this.$store.state.Socket.sidebarInfo
    this.getsjztData()
    this.getCircleNav()
  },
  watch: {
    allSidebar (val, old) {
      if (val) {
        this.getsjztData()
        // console.log('成功更新')
      }
    }
  },
  // 页面打开时初始化 echart
  mounted () {
    this.initChinaMap()
    window.addEventListener('resize', () => {
      this.chinaMapec.resize()
    })
  }
}
</script>
<style lang="less" scoped >
@-webkit-keyframes zxdtY {
  0% {
    border: 2px dashed #f10;
    box-shadow: 0px 0px 10px #f10 inset;
  }
  50% {
    border: 2px dashed #fff;
    box-shadow: 0px 0px 10px #fff inset;
  }
  100% {
    border: 2px dashed #f10;
    box-shadow: 0px 0px 10px #f10 inset;
  }
}
@-webkit-keyframes zxdtZ {
  0% {
    color: #f10;
  }
  50% {
    color: #fff;
  }
  100% {
    color: #f10;
  }
}
.bgshow {
  background: transparent !important;
}
.bghide {
  background: url("../../../../assets/background.jpg") !important;
}
@keyframes rightEaseInAnimate {
  /*定义从右边滑入文字的动画*/
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
// .Acolor {
//   font-weight: bold !important;
//   color: #0094ff;
// }
.eq-main {
  div {
    box-sizing: border-box;
  }
  width: 100%;
  height: 100%;
  position: relative;
  .dialogsd {
    /deep/.el-dialog {
      width: 35%;
      .el-dialog__body {
        padding: 0;
        .el-form-item {
          margin-bottom: 10px;
        }
      }
    }
    p {
      margin-left: 20px;
    }
  }
  /deep/.map {
    position: absolute;
    width: 100%;
    height: 100%;
    .el-tabs {
      position: absolute;
      .el-tabs__header {
        margin-top: 15px;
        z-index: 10;
        right: 5%;
        background-color: #08304b;
        border-radius: 4px 5px 0 0;
        color: #fff;
        .el-tabs__item {
          color: #fff;
          height: 32px;
          line-height: 32px;
          &.is-active {
            color: #0094ff;
          }
        }
      }
    }
    .el-tab-pane {
      width: 100%;
      height: 100%;
      padding-bottom: 50px;
    }
    .el-tabs__header {
      position: absolute;
    }
    .el-tabs--top {
      width: 100%;
      height: 100%;
    }
    .el-tabs__content {
      width: 100%;
      height: 100%;
    }

    #china-map {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: transparent;
      // border: 1px solid rgb(44, 106, 177);
      box-shadow: 0px 0px 8px #1176a7 inset;
    }
  }
  .nav {
    position: absolute;
    animation: rightEaseInAnimate 1s ease 1; /*调用动画：动画名、时间、时间线条、播放次数*/
    animation-fill-mode: forwards; /*定义动画结束的状态*/
    top: 30px;
    right: 0;
    width: 320px;
    height: 22%;
    margin-top: 30px;
    .ul-six {
      width: 100%;
      height: 100%;
      display: flex;
      // justify-content: space-around;
      flex-wrap: wrap;
      a {
        color: #fff;
      }
      li {
        width: 33.33%;
        height: 50%;
        text-align: center;
        color: #fff;
        font-size: 12px;
        // margin: 0  auto;

        &:hover {
          cursor: pointer;
        }
        .ulBG {
          position: relative;
          display: block;
          margin: 5px auto;
          width: 60%;
          height: 65%;
          background-color: rgba(8, 31, 241, 0.267);
          // background: url(../../../../assets/ul-six.png);
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
          }
          .SixNumber {
            position: absolute;
            text-align: center;
            width: 100%;
            bottom: 15%;
            left: 0;
          }
        }
      }
    }
  }
  .sidebar {
    animation: rightEaseInAnimate 1s ease 1; /*调用动画：动画名、时间、时间线条、播放次数*/
    animation-fill-mode: forwards; /*定义动画结束的状态*/
    background-color: transparent;
    position: absolute;
    top: 35%;
    right: 8px;
    width: 300px;
    height: 243px;
    border: 1px solid rgba(229, 233, 238, 0.7);
    overflow-y: scroll;
    .sidebar-title {
      position: fixed; // 有animation效果固定定位失效
      width: 100%;
      height: 30px;
      font-size: 20px;
      color: #fff;
      // padding-left: 18/96rem;
      text-align: center;
      background-color: rgb(209, 64, 178);
    }
    ul {
      padding-top: 30px;
    }
    .notes {
      box-sizing: border-box;
      width: 100%;
      height: 71px;
      background: rgba(228, 56, 13, 0.5);
      .yuan {
        float: left;
        margin-left: 15px;
        margin-top: 8px;
        width: 55px;
        height: 55px;
        border: 2px dashed #fff;
        border-radius: 50%;
        line-height: 55px;
        p {
          margin: 0 auto;
          color: #fff;
          font-size: 17px;
          text-align: center;
        }
      }
      span {
        width: 190px;
        color: #fff;
        float: right;
        height: 33%;
        line-height: 1.5;
        margin-right: 10px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .time {
      }
      .devId {
      }
      .address {
      }
    }
    li:nth-child(1) {
      .yuan {
        -webkit-animation: zxdtY 2s infinite linear;
        p {
          -webkit-animation: zxdtZ 2s infinite linear;
        }
      }
    }
    li:nth-child(2) {
      background: rgba(241, 99, 103, 0.5);
    }
    li:nth-child(3) {
      background: rgba(66, 32, 145, 0.3);
      // .mt3 {
      //   margin-top: 4/96rem !important;
      // }
    }
    li:nth-child(n + 4) {
      border-bottom: 1px solid #fff;
      background: rgba(129, 186, 194, 0.5);
    }
  }
  // 显示按钮
  .el-icon-circle-plus {
    font-size: 20px;
    color: #ccc;
    position: absolute;
    right: 5px;
  }
  .sidebarjia {
    top: 35%;
    right: 12px;
  }
  .footerjia {
    top: 75%;
  }
  .navjia {
    top: 60px;
  }
  // 隐藏点
  .el-icon-error {
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .btnOn {
    position: absolute;
    border-radius: 5px;
    background-color: rgba(61, 168, 230, 0.678);
    color: #fff;
    font-weight: bold;
    width: 100px;
    height: 40px;
    bottom: 50px;
    right: 40px;
    padding: 0;
  }
}
</style>
