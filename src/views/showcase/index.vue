<template>
  <div id="app"  v-loading="loading2" element-loading-text="加载中" element-loading-background="rgba(0, 0, 0, 0.8)">
    <header>
      <el-row>
        <el-col :span="6">
          <div class="left-top">
            <div class="menuNav">
              <el-tooltip placement="top">
                <div slot="content">返回后台首页</div>
                <i class="el-icon-menu" @click="getMenuS"></i>
              </el-tooltip>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">
            智慧消防云服务平台
          </div>
        </el-col>
        <el-col :span="6">
          <div class="box">
            <p class="time">{{ nowTime | datefilter }}</p>
          </div>
        </el-col>
      </el-row>
    </header>
    <main>
      <PAMain></PAMain>
    </main>
  </div>
</template>
<script>
import PAMain from './PA_Main'
import moment from 'moment'
export default {
  data () {
    return {
      nowTime: new Date(), // 初始化时间
      Allture: true,
      loading2: true,
      menuS: false
    }
  },
  components: {
    PAMain
  },
  filters: {
    datefilter: function (value) {
      return moment(value).format('YYYY年 MM月 Do H:mm:ss dddd')
    }
  },
  methods: {
    getMenuS () {
      this.$router.push({ name: 'home' })
    }
  },
  created () {
    setTimeout(() => {
      this.loading2 = false
    }, 1000)
  },
  mounted () {
    // 定时器实时更新时间数据
    setInterval(() => {
      this.nowTime = new Date()
    }, 1000)
  }
}
</script>
<style lang="less" scoped >
/deep/.el-menu-item-group__title {
    padding: 0 !important;
  }
#app {
  background: url("../../assets/background.jpg");
  // background: -webkit-gradient(linear, 0 0, 0 100%, from(#0a2971), to(#45a1ea));
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  header {
    background-color: transparent;
    width: 100%;
    height: 10%;
    .el-row {
      width: 100%;
      height: 100%;
      .el-col {
        height: 100%;
        color: #fff;
        /deep/ .left-top {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 5;
          /deep/
          ul {
            margin-top: 30px;
          }
          .el-submenu {
            // background-color: #148bce;
            .el-submenu__title:hover {
              background-color: transparent;
            }
            .el-menu-item {
              width: 100%;
              min-width: 0;
              background-color: #2b2b2b;
              color: #fff;
              &.is-active {
                color: #0094ff;
              }
            }
            .el-submenu__icon-arrow {
              visibility: hidden;
            }
          }
          .el-menu {
            background-color: #3f4142;
            border: none;
          }
          .tabDiv {
            background-color: transparent;
            width: 100%;
            margin-top: 30px;
            background-color: #fff;
            .el-submenu__title {
              color: #fff;
              width: 100%;
            }
          }
          .el-menu--collapse {
            width: 190px !important;
          }
        }
      }
      .menuNav {
        position: relative;
        top: 20px;
        left: 25px;
        .el-icon-menu {
          width:60px;
          height: 60px;
          background: rgba(105, 102, 99, 0.5);
          border-radius: 50%;
          color: #fff;
          font-size: 40px;
          text-align: center;
          line-height: 60px;
        }
      }
      .title {
        font-size: 44px;
        height: 100%;
        text-align: center;
        line-height: 2;
      }
      .box {
        position: relative;
        width: 100%;
        height: 100%;
        .time {
          margin-top: 32px;
          text-align: center;
          font-size: 20px;
        }
      }
    }
  }
  main {
    background-color: transparent;
    width: 100%;
    height: 90%;
  }
}
</style>
