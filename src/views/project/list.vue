<template>
  <div>
    <el-card class="box-card screen">
      <el-form ref="xmform" :model="xmform" label-width="80px">
        <el-form-item>
          <el-select v-model="screen_project" placeholder="所有项目">
            <el-option label="项目一" value="xm1"></el-option>
            <el-option label="项目二" value="xm2"></el-option>
          </el-select>
        </el-form-item>
<el-form-item>
          <el-select v-model="screen_rchitecture" placeholder="负责人">
            <el-option label="负责人一" value="shanghai"></el-option>
            <el-option label="负责人二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">筛选</el-button>
          <el-button @click="newP">新建项目</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table :data="tableData" border style="width: 100%;margin-top: 15px" stripe>
      <el-table-column prop="id" label="序号" width="50"> </el-table-column>
      <el-table-column prop="name" label="项目名称" width="120"> </el-table-column>
      <el-table-column prop="responsible" label="负责人" width="100"> </el-table-column>
      <el-table-column prop="phone" label="负责人电话" width="120"> </el-table-column>
      <el-table-column prop="buildingNum" label="项目建筑数" width="100"> </el-table-column>
      <el-table-column prop="drawingNum" label="项目图纸数" width="100"> </el-table-column>
      <el-table-column prop="address" label="项目地址"> </el-table-column>
      <el-table-column prop="time" label="创建时间" width="180"> </el-table-column>
      <el-table-column prop="remarks" label="详细" width="80"> </el-table-column>
    }
      <el-table-column prop="handle" label="处理" width="80"><el-button @click="deleteP" type="primary" size="mini" icon="el-icon-delete"></el-button></el-table-column>
    </el-table>
    <div class="block pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="tableData.length">
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
        name: '米若办公室',
        responsible: '王小虎',
        phone: '13785963247',
        buildingNum: '5',
        drawingNum: '10',
        address: '上海市普陀区金沙江路 1518 弄',
        time: '2019-03-06 10:21:59',
        remarks: '无'
      },
      {
        id: '2',
        name: '米若仓库',
        responsible: '王小虎',
        phone: '13885968569',
        buildingNum: '3',
        drawingNum: '12',
        address: '厦门市普陀区金沙江路 1518 弄',
        time: '2019-03-06 10:21:59',
        remarks: '无'
      },
      {
        id: '3',
        name: '米若会议室',
        responsible: '王小虎',
        phone: '17832563256',
        buildingNum: '6',
        drawingNum: '14',
        address: '东莞市普陀区金沙江路 1518 弄',
        time: '2019-03-06 10:21:59',
        remarks: '无'
      },
      {
        id: '4',
        name: '米若仓库',
        responsible: '王小虎',
        phone: '18832563256',
        buildingNum: '9',
        drawingNum: '15',
        address: '深圳市普陀区金沙江路 1518 弄',
        time: '2019-03-06 10:21:59',
        remarks: '无'
      },
      {
        id: '5',
        name: '米若产品室',
        responsible: '王小虎',
        phone: '18956325632',
        buildingNum: '8',
        drawingNum: '18',
        address: '广州市普陀区金沙江路 1518 弄',
        time: '2019-03-06 10:21:59',
        remarks: '无'
      }],
      xmform: {},
      screen_project: '',
      screen_rchitecture: '',
      // 分页
      currentPage1: 1
    }
  },
  methods: {
    search () {
      console.log(1)
    },
    newP () {
      this.$router.push('/project/new')
    },
    deleteP () {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          customClass: 'ggmessage',
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          customClass: 'ggmessage',
          type: 'info',
          message: '已取消删除'
        })
      })
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
      background-color: #66b1ff;
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
