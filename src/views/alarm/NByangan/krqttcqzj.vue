<template>
  <div>
      <el-card class="title">可燃气体探测器主机</el-card>

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
          <el-select v-model="screen_project" placeholder="项目筛选">
            <el-option label="项目一" value="xm1"></el-option>
            <el-option label="项目二" value="xm2"></el-option>
          </el-select>
        </el-form-item>
<el-form-item>
          <el-select v-model="screen_rchitecture" placeholder="建筑筛选">
            <el-option label="建筑一" value="shanghai"></el-option>
            <el-option label="建筑二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="screen_floor" placeholder="楼层筛选">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="screen_all" placeholder="全部">
            <el-option label="未处理" value="wcl"></el-option>
            <el-option label="消警" value="xj"></el-option>
            <el-option label="误报" value="wb"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table :data="tableData" border style="width: 100%;margin-top: 15px" stripe>
      <el-table-column prop="id" label="序号" width="50"> </el-table-column>
      <el-table-column prop="time" label="报警时间" width="180"> </el-table-column>
      <el-table-column prop="name" label="所属项目" width="120"> </el-table-column>
      <el-table-column prop="type" label="报警类型" width="100"> </el-table-column>
      <el-table-column prop="address" label="设备位置"> </el-table-column>
      <el-table-column prop="code" label="设备号编码"> </el-table-column>
      <el-table-column prop="remarks" label="备注"> </el-table-column>
      <el-table-column prop="handle" label="处理" width="80"> </el-table-column>
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
        time: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        type: '设备报警',
        code: '123456789',
        remarks: '无',
        handle: '消警'
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
      currentPage1: 5
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
  width: 200/96rem;
  margin-left: 300/96rem;
  margin-bottom: 10/96rem;
  background-color: #f5faf4;
  text-align: center;
  font-weight: bold;
  font-size: 14/96rem;
  /deep/.el-card__body {
    padding: 10px;
  }
}
.screen {
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
      color: #fff;
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
