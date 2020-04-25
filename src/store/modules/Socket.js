// import axios from 'axios'
const state = {
  news: [],
  alarm: [],
  fault: [],
  sidebarInfo: []
}

const getters = {}

const actions = {
}

const mutations = {
  setReceiveInfo (state, data) {
    state.news.unshift(data)
    if (data.msgType === '2') {
      state.alarm.unshift(data)
    } else if (data.msgType === '3') {
      state.fault.unshift(data)
    }
    if (data.msgType === '2' || data.msgType === '3') {
      state.sidebarInfo.unshift(data)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
