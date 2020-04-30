<template>
  <div class="Main">
      <!-- <el-card class="title">全部烟感报警信息</el-card> -->
      <router-link :to="{name:'SmokeSensorEquip'}"><el-card class="title " >设备信息</el-card></router-link>
<router-link :to="{name:'SmokeSensorEquipAlert'}"><el-card class="title on">报警信息</el-card></router-link>
      <router-link :to="{name:'SmokeSensorEquipStatistics'}"><el-card class="title " >设备统计</el-card></router-link>
    <el-card class="box-card screen">
      <!-- 筛选信息 -->
      <el-form ref="form" :model="sxform" label-width="80px">
        <el-form-item class="sx">
          <el-input style="width:200px" clearable v-model="search_input" auto-complete="off" placeholder="请输入精确的设备ID"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table :data="tableData" border style="width: 100%;margin-top: 15px" stripe>
       <el-table-column prop="devId" label="设备Id" width="150"> </el-table-column>
      <el-table-column prop="happenTime" label="发生时间" width="280" :formatter="formatter"> </el-table-column>
      <el-table-column prop="msgState" label="处理方式" width="240" :formatter="formatterState"> </el-table-column>
      <el-table-column label="处理操作" width="240" >
      <template slot-scope="scope">
          <el-button :disabled='scope.row.msgState !== 0' @click="handle(scope.row)" size="mini" round>
            <i class="el-icon-edit"></i>设置</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="msgType" label="报警类型" width="240">
        <template slot-scope="scope">
        <el-tag
          :type="scope.row.msgType === '2' ? 'danger' : 'warning'"
          close-transition>{{scope.row.msgType === '2' ? '报警': '故障'}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
    </el-table>
    <div class="block pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="pageRow"
      layout="total, prev, pager, next"
      :total="totalCount"
      >
    </el-pagination>
  </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      userInfo: {},
      tableData: [],
      pageIndex: 1,
      pageRow: 10,
      totalCount: 0,
      sxform: {},
      search_input: '',
      value1: true,
      currentPage1: 1
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.getQueryWarnMsgList()
  },
  methods: {
    getQueryWarnMsgList () {
      let dto = {
        'userId': this.userInfo.userId,
        'devId': this.search_input,
        'pageIndex': this.pageIndex,
        'pageRow': this.pageRow
      }
      this.$http.post('/pf/warn/query', dto).then((res) => {
        this.tableData = res.data.data.data
        this.totalCount = res.data.data.totalCount
      })
      console.log(this.tableData)
    },
    search () {
      this.getQueryWarnMsgList()
    },
    handle (row) {
      console.log(row)
      let dto = {
        'reIds': [row.reId],
        'stateValue': 1
      }
      this.$http.post('/pf/warn/handle', dto).then((res) => {
        console.log(res)
        this.getQueryWarnMsgList()
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.getQueryWarnMsgList()
    },
    // 格式化表格内容
    formatter (row) {
      return dayjs(row.happenTime).format('YYYY-MM-DD HH:mm:ss')
    },
    formatterState (row) {
      if (row.msgState === -1) {
        return '无需处理'
      } else if (row.msgState === 0) {
        return '未处理'
      } else {
        return '已处理'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/main.less';
.sx {
  /deep/.el-input__inner {
    color: #fff;
  }
}
</style>
