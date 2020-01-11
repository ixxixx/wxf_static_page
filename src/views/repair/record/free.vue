<template>
  <div>
      <div>
        <router-link :to="{name:'repair/recordFree'}"><el-card class="title on">维修记录(免费)</el-card></router-link>
      <router-link :to="{name:'repair/recordCharge'}"><el-card class="title " >维修记录(收费)</el-card></router-link>
      <router-link :to="{name:'repair/recordMyCharge'}"><el-card class="title">维修记录(我方维修)</el-card></router-link>
      </div>

    <el-card class="box-card screen">
      <el-form ref="form" :model="sxform" label-width="80px">
         <el-form-item>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="datetime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="screen_project" placeholder="按项目查看">
            <el-option label="项目一" value="xm1"></el-option>
            <el-option label="项目二" value="xm2"></el-option>
          </el-select>
        </el-form-item>
<el-form-item>
          <el-select v-model="screen_rchitecture" placeholder="全部维修单">
            <el-option label="设备" value="shanghai"></el-option>
            <el-option label="物资" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table :data="tableData" border style="width: 100%;margin-top: 15px" stripe>
      <el-table-column prop="id" label="序号" width="50"> </el-table-column>
      <el-table-column prop="code" label="维修单号" width="120"> </el-table-column>
      <el-table-column prop="time" label="下单时间" width="130"> </el-table-column>
      <el-table-column prop="name" label="项目名称" width="100"> </el-table-column>
      <el-table-column prop="customer" label="下单人" width="100"> </el-table-column>
      <el-table-column prop="address" label="位置"> </el-table-column>
      <el-table-column prop="reason" label="下单原因"> </el-table-column>
      <el-table-column prop="content" label="维修内容"> </el-table-column>
      <el-table-column prop="receiver" label="接单人" width="100"> </el-table-column>
      <el-table-column label="维修单" width="70"> <a style="color: #5cb6f7" href="javascript:;">详细</a></el-table-column>
    </el-table>
    <div class="block pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="100">
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: '1',
        code: '123456789',
        time: '2016-05-02',
        name: '米若办公室',
        address: '上海市普陀区金沙江路 1518 弄',
        customer: '米若消防',
        reason: '123456',
        content: '',
        receiver: ''
      }, {
        id: '2',
        time: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        type: '设备报警',
        code: '123456789',
        remarks: '无',
        handle: '消警'
      }, {
        id: '3',
        time: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        type: '设备报警',
        code: '123456789',
        remarks: '无',
        handle: '消警'
      }, {
        id: '4',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: '设备报警',
        code: '123456789',
        remarks: '无',
        handle: '消警'
      }, {
        id: '5',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: '设备报警',
        code: '123456789',
        remarks: '无',
        handle: '消警'
      }, {
        id: '6',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: '设备报警',
        code: '123456789',
        remarks: '无',
        handle: '消警'
      }, {
        id: '7',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: '设备报警',
        code: '123456789',
        remarks: '无',
        handle: '消警'
      }, {
        id: '8',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: '设备报警',
        code: '123456789',
        remarks: '无',
        handle: '消警'
      }, {
        id: '9',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: '设备报警',
        code: '123456789',
        remarks: '无',
        handle: '消警'
      }, {
        id: '10',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: '设备报警',
        code: '123456789',
        remarks: '无',
        handle: '消警'
      }, {
        id: '11',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: '设备报警',
        code: '123456789',
        remarks: '无',
        handle: '消警'
      }],
      sxform: {},
      datetime: '',
      screen_project: '',
      screen_rchitecture: '',
      screen_floor: '',
      screen_all: '',
      // 分页
      currentPage1: 1
    }
  },
  methods: {
    search () {
      console.log(1)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  float: left;
  width: 200/96rem;
  margin-left: 50/96rem;
  margin-bottom: 10/96rem;
  text-align: center;
  font-weight: bold;
  font-size: 14/96rem
}
.on {
  background-color: #f5faf4;

}
.screen {
  width: 100%;
.el-form-item {
  float: left;
  // display: inline;
  /deep/.el-form-item__content {
    margin-left: 10px !important;
    .el-select {
      width: 150px;
    }
    .el-button {
      margin-left: 30px;
      background-color: #5cb6f7;
    }
  }
}
}
/deep/.el-table td {
text-align: center;
}
/deep/.el-table th,
.el-table tr {
  // height: 50px !important;
  padding: 7px 0;
  text-align: center;
  background-color: rgb(218, 214, 214) !important;
}
/deep/.pagination {
  margin-top: 20px;
  margin-left: 400px;
  .el-pager li {
    background: transparent;
  }
  .btn-prev, .btn-next {
  background: transparent;
}
}
</style>
