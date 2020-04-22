const state = {
  userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || {},
  userProId: ''
}

const getters = {}

const actions = {
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
    // 将数据同步到 localstorage 中
    window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  },
  changeUserInfo (state, newUserInfo) {
    state.userInfo.email = newUserInfo.email
    state.userInfo.headImg = newUserInfo.headImg
    state.userInfo.sex = newUserInfo.sex
    // state.userInfo.email = newUserInfo.email
    // 将数据同步到 localstorage 中
    window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  },
  changeUserInfoImg (state, newImg) {
    state.userInfo.headImg = newImg
    // 将数据同步到 localstorage 中
    window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  },
  setProId (state, userProId) {
    state.userProId = userProId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
