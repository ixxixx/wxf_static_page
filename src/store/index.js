
import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import Socket from './modules/Socket'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userInfo,
    Socket
    // socket
  }
})
