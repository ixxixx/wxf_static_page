
import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import ChinaMap from './modules/ChinaMap'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    a: ChinaMap
  }
})
