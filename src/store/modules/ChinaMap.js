const state = {
  optData: []
}

const getters = {}

const actions = {
  saveOptData (context, optData) {
    context.commit('saveOptData', optData)
  }
}

const mutations = {
  saveOptData (state, optData) {
    state.optData = optData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
