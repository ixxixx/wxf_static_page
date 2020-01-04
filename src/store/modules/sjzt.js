import axios from 'axios'
const state = {
  sjztData: []
}

const getters = {}

const actions = {
  async saveSjztData (context, sjztData) {
    await axios.get('/js/sjzt-data.json').then(res => {
      state.sjztData = res.data
    })
  }
}

const mutations = {
  saveSjztData (state, sjztData) {
    state.sjztData = sjztData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
