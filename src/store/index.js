
import Vue from 'vue'
import Vuex from 'vuex'
import ChinaMap from './modules/ChinaMap'
import sjzt from './modules/sjzt'
import Login from './modules/Login'
// import Socket from './modules/Socket'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // 地图数据
    a: ChinaMap,
    // 事件状态
    sjzt,
    // 登录
    c: Login
    // socket
    // d: Socket
  }
})
