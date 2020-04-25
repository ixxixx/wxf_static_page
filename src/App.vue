<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import io from 'socket.io-client'
export default {
  data () {
    return {
      userInfo: '',
      userId: ''
    }
  },
  created () {
    if (localStorage.getItem('userInfo') !== null) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.userId = this.userInfo.userId
    }
  },
  mounted () {
    if (this.userId) {
      this.getSockie(this.userId)
    }
  },
  methods: {
    getSockie (userId) {
      let serverHome = 'http://192.168.0.4:3864'
      const socket = io(serverHome, {
        'force new connection': true,
        'query': 'id=' + userId
      })
      // 连接事件
      socket.on('connect', () => {
        console.log('连接中。。。')
      }).on('auth', (data) => {
        console.log('连接后验证：' + data)
      }).on('message', (data) => {
      // 后台推送的业务的数据
        console.log(data)
        data.happenTime = dayjs(data.happenTime).format('YYYY-MM-DD HH:mm:ss')
        this.msgDesc = data.msgDesc
        this.$store.commit('setReceiveInfo', data)
      }).on('disconnect', () => {
        console.log('连接已断开。。。')
      })
    }
  }
}
</script>

<style lang="less">

</style>
