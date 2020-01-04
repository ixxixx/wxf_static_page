
import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import ChinaMap from './modules/ChinaMap'
import sjzt from './modules/sjzt'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // 地图数据
    a: ChinaMap,
    // 事件状态
    b: sjzt
  }
})
