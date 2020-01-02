<template>
  <el-row>
    <el-col :span="4">
      <div class="box">
        <TotalDevice v-show="sixShow" class="fix-ge" @totalec="tcShow"></TotalDevice>
        <DeviceReported v-show="sixShow" class="fix-ge" @reportec="tcShow"></DeviceReported>
        <News v-show="sixShow" class="fix-ge"></News>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="box">
        <DeviceDistribution></DeviceDistribution>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="box">
        <HiddenDanger v-show="sixShow" class="fix-ge" @hiddenec="tcShow"></HiddenDanger>
        <HiddenDangerLevel v-show="sixShow" class="fix-ge" @levelec="tcShow"></HiddenDangerLevel>
        <Patrol v-show="sixShow" class="fix-ge" @patrolec="tcShow"></Patrol>
      </div>
    </el-col>
    <!-- 6盒子窗口事件 -->
    <el-switch v-model="sixShow"> </el-switch>
    <!-- 对话框 -->
    <el-dialog title="这是弹出的内容" :visible.sync="tcshow" width="30%">
      <span>{{ this.name }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tcshow = false">取 消</el-button>
        <el-button type="primary" @click="tcshow = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import TotalDevice from './components/TotalDevice/TotalDevice'
import DeviceReported from './components/DeviceReported/DeviceReported'
import HiddenDanger from './components/Hidden_Danger/Hidden_Danger'
import HiddenDangerLevel from './components/HiddenDangerLevel/HiddenDangerLevel'
import News from './components/News/News'
import Patrol from './components/Patrol/Patrol'
import DeviceDistribution from './components/DeviceDistribution/DeviceDistribution'
export default {
  data () {
    return {
      sixShow: true,
      tcshow: null,
      name: ''
    }
  },
  components: {
    TotalDevice, // 设备总数
    DeviceReported, // 设备报告
    HiddenDanger, // 隐患
    HiddenDangerLevel, // 隐患级别
    News, // 事件
    Patrol, // 异常
    DeviceDistribution // 设备分布
  },
  methods: {
    tcShow (dhkshow, name) {
      this.tcshow = dhkshow
      this.name = name
      console.log(this.tcshow)
      console.log(this.name)
    }

  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.el-row {
  width: 100%;
  height: 100%;
  /deep/.el-switch {
    position: absolute;
    // top: -30/96rem;
    right: 5/96rem;
  }
  .el-col {
    height: 100%;
    .box {
      height: 96%;
      .fix-ge {
        width: 90%;
        height: 30.33%;
        margin: 9% auto 0;
        box-sizing: border-box;
        border: 1.5/96rem solid #289fe3;
        box-shadow: 0px 0px 5/96rem #1176a7 inset, 0px 0px 5/96rem #27a9eb;
      }
    }
  }
}
</style>
