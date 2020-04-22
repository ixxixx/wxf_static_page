// import axios from 'axios'
const state = {
  // userInfo: 'vuex中的 userInfo'
//   token: JSON.parse(window.localStorage.getItem('token')) || {}
  userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || {}
}

const getters = {}

const actions = {
  // async saveSjztData (context, sjztData) {
  //   await axios.get('/js/sjzt-data.json').then(res => {
  //     state.sjztData = res.data
  //   })
  // }
}
// 修改 mutations 中的数据
const mutations = {
  changeUserInfo (state, newUser) {
    // 将新的值赋值给 userInfo
    state.userInfo.name = newUser.name
    state.userInfo.intro = newUser.intro
    state.userInfo.email = newUser.email
    // 将数据同步到 localstorage 中
    window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  },
  changeUserInfoImg (state, newImg) {
    state.userInfo.photo = newImg
    // 将数据同步到 localstorage 中
    window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
    // 将数据同步到 localstorage 中
    window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
