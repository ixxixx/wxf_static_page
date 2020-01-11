<template>
  <div>
      <div>
      <el-card class="title">人员设置</el-card>
      </div>
    <el-card class="box-card screen">
      <el-form ref="xmform" :model="xmform" label-width="80px">
          <el-form-item>
              <el-input v-model="xmform.name" placeholder="搜索你要查询的人员"></el-input>
          </el-form-item>
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
          <el-button @click="newP">添加人员</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table :data="tableData" border style="width: 100%;margin-top: 15px" stripe>
      <el-table-column prop="id" label="序号" width="50"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="phone" label="电话" width="120"> </el-table-column>
      <el-table-column prop="department" label="部门" width="100"> </el-table-column>
      <el-table-column prop="post" label="岗位" width="100"> </el-table-column>
      <el-table-column prop="address" label="项目地址"> </el-table-column>
      <el-table-column prop="detailed" label="详细" width="80"><a href="javascript:;">详细</a></el-table-column>
      <el-table-column prop="remarks" label="编辑" width="80"><i class="el-icon-edit-outline"></i> </el-table-column>
      <el-table-column prop="remarks" label="删除" width="80"><i class="el-icon-delete" @click="deleteP"></i> </el-table-column>
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
  <!-- 弹窗 -->
  <el-dialog class="tianjia" title="添加人员" :visible.sync="dialogFormVisible">
  <el-form :model="tjform">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="tjform.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="tjform.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: '1',
        name: '米若',
        department: '技术部',
        phone: '13785963247',
        post: '技术员',
        address: '上海市普陀区金沙江路 1518 弄',
        detailed: '无'
      },
      {
        id: '2',
        name: '米若',
        department: '技术部',
        phone: '13785963247',
        post: '技术员',
        address: '上海市普陀区金沙江路 1518 弄',
        detailed: '无'
      },
      {
        id: '3',
        name: '米若',
        department: '技术部',
        phone: '13785963247',
        post: '技术员',
        address: '上海市普陀区金沙江路 1518 弄',
        detailed: '无'
      },
      {
        id: '4',
        name: '米若',
        department: '技术部',
        phone: '13785963247',
        post: '技术员',
        address: '上海市普陀区金沙江路 1518 弄',
        detailed: '无'
      },
      {
        id: '5',
        name: '米若',
        department: '技术部',
        phone: '13785963247',
        post: '技术员',
        address: '上海市普陀区金沙江路 1518 弄',
        detailed: '无'
      }],
      xmform: {},
      screen_project: '',
      screen_rchitecture: '',
      // 分页
      currentPage1: 1,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      tjform: {
        name: '',
        region: ''
      }
    }
  },
  methods: {
    search () {
      console.log(1)
    },
    newP () {
      this.dialogFormVisible = true
    },
    deleteP () {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
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
.title {
  width: 200/96rem;
  margin-left: 280/96rem;
  margin-bottom: 10/96rem;
  background-color: #f5faf4;
  text-align: center;
  font-weight: bold;
  font-size: 14/96rem
}
.screen {
.el-form-item {
  float: left;
  /deep/.el-form-item__content {
    margin-left: 10px !important;
    .el-select {
      width: 150px;
    }
    .el-button {
      margin-left: 30px;
      background-color: #66b1ff;
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
.tianjia {
    /deep/.el-dialog__header {
        border-bottom: 3px solid #ccc;
        .el-dialog__title {
            font-weight: bold;
            color: #66b1ff;
        }
    }
}

</style>
