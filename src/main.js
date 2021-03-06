import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import store from './store'
// 导入 axios
import axios from 'axios'
// 导入 vue-axios
import VueAxios from 'vue-axios'
// 导入element ui框架
import ElementUI from 'element-ui'
// 导入element ui样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import '@/styles/index.less'
// 导入 echarts
import echarts from 'echarts'
// 在 src\main.js 中引入 lib-flexible
import 'lib-flexible'
// 时间
import moment from 'moment' // 导入文件
import BaiduMap from 'vue-baidu-map'
// 省级联动
import VDistpicker from 'v-distpicker'
import dayjs from 'dayjs'
// import VueSocketIO from 'vue-socket.io'
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: ''
// }))
Vue.component('v-distpicker', VDistpicker)
Vue.use(BaiduMap, {
  ak: '6EtTxRf8kxcj3x71mhxGkRYtlfVCbX1S'
})
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://xf.padssz.com:9265'
// axios.defaults.baseURL = 'http://192.168.0.2:9265'
Vue.prototype.echarts = echarts
Vue.prototype.$moment = moment
moment.locale('zh-cn') // 需要汉化
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.filter('dateFilter', function (value, farmatter = 'YYYY-MM-DD HH:mm:ss') {
  if (!value) return ''
  return dayjs(value).format(farmatter)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
