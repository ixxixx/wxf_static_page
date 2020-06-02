<template>
  <el-row>
    <el-col :span="this.sixShow===true?4:1">
      <div class="box">
        <TotalDevice v-show="sixShow" class="fix-ge" @totalec="tcShow" :refreshInfo="sixShow"></TotalDevice>
        <DeviceReported  v-show="sixShow" class="fix-ge middel " @reportec="tcShow" :refreshInfo="sixShow"></DeviceReported>
        <EventRatio v-show="sixShow" class="fix-ge" :refreshInfo="sixShow"></EventRatio>
      </div>
    </el-col>
    <el-col :span="this.sixShow===true?16:22">
      <div class="box">
        <DeviceDistribution></DeviceDistribution>
      </div>
    </el-col>
    <el-col :span="this.sixShow===true?4:1">
      <div class="box">
        <HiddenDanger v-show="sixShow" class="fix-ge" @hiddenec="tcShow" :refreshInfo="sixShow"></HiddenDanger>
        <HiddenDangerLevel v-show="sixShow" class="fix-ge middel" @levelec="tcShow" :refreshInfo="sixShow"></HiddenDangerLevel>
        <Patrol v-show="sixShow" class="fix-ge" @patrolec="tcShow" :refreshInfo="sixShow"></Patrol>
      </div>
    </el-col>
    <!-- 6盒子窗口事件 -->
     <el-tooltip placement="top">
                <div slot="content">隐藏并刷新</div>
    <el-switch v-model="sixShow"> </el-switch>
              </el-tooltip>
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
import HiddenDanger from './components/HiddenDanger/HiddenDanger'
import HiddenDangerLevel from './components/HiddenDangerLevel/HiddenDangerLevel'
import EventRatio from './components/EventRatio/EventRatio'
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
  created () {
  },
  components: {
    TotalDevice, // 设备总数
    DeviceReported, // 设备报告
    HiddenDanger, // 隐患
    HiddenDangerLevel, // 隐患级别
    EventRatio, // 事件
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
  padding-bottom: 20px;
  /deep/.el-switch {
    position: absolute;
    top: -30px;
    right: 15px;
  }
  .el-col {
    height: 100%;
    .box {
      height: 100%;
       display: flex;
      flex-direction: column;
      justify-content: space-between;
      .fix-ge {
        width: 90%;
        height: 30%;
        margin: 0 auto;
        box-sizing: border-box;
        border: 3px solid #289fe3;
        box-shadow: 0px 0px 10px #1176a7 inset, 0px 0px 10px #27a9eb;
      }
    }
  }
}
</style>
