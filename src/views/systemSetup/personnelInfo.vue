<template>
  <div class="Main">
    <el-card class="box-card screen">
      <!-- 筛选信息 -->
      <el-form ref="form" :model="sxform" label-width="80px">
        <el-form-item class="sx">
          <el-input
            style="width:200px"
            clearable
            v-model="search_input"
            auto-complete="off"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">筛选</el-button>
          <el-button @click="addPersonnel">添加人员</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 15px"
      stripe
    >
      <el-table-column prop="devId" label="设备Id" width="150">
      </el-table-column>
      <el-table-column
        prop="happenTime"
        label="发生时间"
        width="280"
        :formatter="formatter"
      >
      </el-table-column>
      <el-table-column prop="msgType" label="报警类型" width="240">
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="deletePers(scope.row)" size="mini" round>
            <i class="el-icon-delete"></i>删除</el-button
          >
        </template>
      </el-table-column>
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
    <el-dialog width="40%" title="新增人员" :visible.sync="dialogPers">
      <el-form :model="dialogfrom">
        <el-form-item label="人员名称" :label-width="formLabelWidth">
          <el-input v-model="dialogfrom.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" :label-width="formLabelWidth">
          <el-input v-model="dialogfrom.people" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="人员电话" :label-width="formLabelWidth">
          <el-input v-model="dialogfrom.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPers = false">取 消</el-button>
        <el-button type="primary" @click="establishPers">确定修改</el-button>
      </div>
    </el-dialog>
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
      currentPage1: 1,
      dialogPers: false,
      formLabelWidth: '25%',
      dialogfrom: {
        name: '',
        people: '',
        phone: ''
      }
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
    // handle (row) {
    //   console.log(row)
    //   let dto = {
    //     'reIds': [row.reId],
    //     'stateValue': 1
    //   }
    //   this.$http.post('/pf/warn/handle', dto).then((res) => {
    //     console.log(res)
    //     this.getQueryWarnMsgList()
    //   })
    // },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.getQueryWarnMsgList()
    },
    // 格式化表格内容
    addPersonnel () {
      this.dialogPers = true
    },
    establishPers () {
      this.dialogPers = false
    },
    deletePers (row) {
      console.log(row)
    },
    formatter (row) {
      return dayjs(row.happenTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/main.less";
.sx {
  /deep/.el-input__inner {
    color: #fff;
  }
}
.el-input {
  float: left;
  width: 70%;
}
</style>
