<template>
  <div class="Main">
    <el-card class="box-card screen">
      <!-- 筛选信息 -->
      <el-form ref="form" label-width="80px">
        <el-form-item class="sx">
          <el-input style="width:200px" clearable v-model="search_input" auto-complete="off" placeholder="按建筑名关键字查询"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">筛选</el-button>
          <el-button @click="addBd">添加建筑</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table v-loading="loadingTable"  element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" border style="width: 100% ;margin-top: 15px" id="out-table">
      <el-table-column prop="pbId" label="建筑ID" width="150">
      </el-table-column>
      <el-table-column prop="pbName" label="建筑名称"> </el-table-column>
      <el-table-column
        prop="isSingle"
        label="是否为单层建筑"
        :formatter="isSingle"
        width="150"
      >
      </el-table-column>
      <el-table-column prop="floors" label="建筑层数" width="120">
      </el-table-column>
      <el-table-column label="建筑图片" width="150">
        <template slot-scope="scope">
          <el-button @click="getImg(scope.row)" size="mini" round>
            <i class="el-icon-picture-outline"></i>图片</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="getBuildingInfo(scope.row)" size="mini" round>
            <i class="el-icon-edit"></i>详细</el-button
          >
          <el-button @click="deleteBd(scope.row)" size="mini" round>
            <i class="el-icon-delete"></i>删除</el-button
          >
          <el-button @click="deleteFloors(scope.row)" size="mini" round>
            <i
              class="el-icon-edit-outline"
            ></i
            >楼层信息</el-button
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
    <el-dialog :title="DetailedTit" :visible.sync="dialogDetailed">
      <el-form :model="dialogfrom">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :http-request="uploadImg"
          :show-file-list="false"
          v-show="this.DetailedTit === '修改信息'"
        >
          <img :src="`/pf` + imageUrl" class="avatar" />
        </el-upload>
        <el-form-item
          label="建筑ID"
          :label-width="formLabelWidth"
          v-show="this.DetailedTit === '修改信息'"
        >
          <el-input
            disabled
            v-model="dialogfrom.pbId"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="建筑名称" :label-width="formLabelWidth">
          <el-input v-model="dialogfrom.pbName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否为单层建筑" :label-width="formLabelWidth">
          <el-radio-group v-model="dialogfrom.isSingle">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="建筑层数"
          :label-width="formLabelWidth"
          v-show="dialogfrom.isSingle === false"
        >
          <el-input v-model="dialogfrom.floors" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailed = false">取 消</el-button>
        <!-- <el-button type="primary" @click="changeBd">确定修改</el-button> -->
        <el-button
          :class="[this.DetailedTit === '添加建筑' ? 'buttonS' : 'buttonH']"
          type="primary"
          @click="addNewBd"
          >确定添加</el-button
        >
        <el-button
          :class="[this.DetailedTit === '修改信息' ? 'buttonS' : 'buttonH']"
          type="primary"
          @click="changeBd"
          >确定修改</el-button
        >
      </div>
    </el-dialog>
    <el-dialog :title="floorsTit" :visible.sync="dialogFloors">
        <el-button @click="addNewFloor" type="warning">添加楼层</el-button>
      <el-table :data="FloorsData">
        <el-table-column
          property="createTime"
          label="创建时间"
          width="150"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column property="pbfId" label="楼层ID"></el-table-column>
        <el-table-column property="pbfName" label="楼层名"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="changeFloor(scope.row)" size="mini" round>
              <i class="el-icon-edit"></i
            ></el-button>
            <el-button @click="DelFloors(scope.row)" size="mini" round>
              <i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block pagination diafy">
        <el-pagination
          @current-change="handleCurrentChangeFl"
          :current-page.sync="currentPage1"
          :page-size= 5
          layout="total, prev, pager, next"
          :total="totalCountFl"
        >
        </el-pagination>
        <!-- 弹框里的弹框 -->
        <el-dialog
          width="40%"
          :title="floorTit"
          :visible.sync="innerVisible"
          append-to-body
        >
        <el-form :model="dialogFloorsFrom">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :http-request="uploadImgFl"
          :show-file-list="false"
          v-show="this.floorTit === '楼层详细信息'"
        >
          <img :src="`/pf` + imageUrl" class="avatar" />
        </el-upload>
         <el-form-item label="建筑ID" :label-width="formLabelWidth" v-show="this.floorTit === '楼层详细信息'">
          <el-input :disabled="prohibit" v-model="dialogFloorsFrom.pbfId" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="楼层名称" :label-width="formLabelWidth" >
          <el-input v-model="dialogFloorsFrom.pbfName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth"  v-show="this.floorTit === '楼层详细信息'">
          <el-input disabled v-model="dialogFloorsFrom.createTime" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
         <el-button
          :class="[this.floorTit === '添加楼层' ? 'buttonS' : 'buttonH']"
          type="primary"
          @click="addNewFl"
          >确定添加</el-button
        >
        <el-button
          :class="[this.floorTit === '楼层详细信息' ? 'buttonS' : 'buttonH']"
          type="primary"
          @click="changeFl"
          >确定修改</el-button
        >
      </div>
        </el-dialog>
      </div>
    </el-dialog>
    <el-dialog title="建筑图片" :visible.sync="dialogImg" width="30%">
      <img :src="`/pf` + img1" class="bdavatar" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogImg = false">取 消</el-button>
        <el-button type="primary" @click="dialogImg = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import '../../../styles/main.less'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import dayjs from 'dayjs'
// import moment from 'moment'
export default {
  data () {
    return {
      proId: '',
      tableData: [],
      AllFloor: [],
      datetime: [],
      dialogfrom: {},
      dialogDetailed: false,
      dialogImg: false,
      formLabelWidth: '160px',
      storageId: '',
      DetailedTit: '',
      dialogFloors: false,
      innerVisible: false,
      FloorsData: [],
      dialogFloorsFrom: {},
      floorsTit: '',
      floorTit: '',
      // 禁用
      prohibit: true,
      // 查询
      search_input: '',
      loadingTable: true,
      // 分页
      currentPage1: 1,
      // 文章的总条数
      totalCount: 0,
      totalCountFl: 0,
      // 当前页
      pageIndex: 1,
      pageIndexFl: 1,
      // 页容量
      pageRow: 10,
      img1: '',
      imageUrl: '', // 图片地址
      uploadUrl: 'http://192.168.0.2:8888/pf/file/upload/buildimg' }
  },

  created () {
    this.proId = this.$store.state.userInfo.userProId
  },
  mounted () {
    this.getBuildingList()
  },
  methods: {
    // 获取列表数据
    getBuildingList () {
      this.loadingTable = true
      // 获取该用户所有项目信息
      let dto = {
        'pageIndex': this.pageIndex,
        'pageRow': this.pageRow,
        'proId': this.proId,
        'pbName': this.search_input
      }
      this.$http.post('/pf/project/build/query', dto).then((res) => {
        this.loadingTable = false
        this.tableData = res.data.data.data
        this.totalCount = res.data.data.totalCount
      })
    },
    search () {
      this.getBuildingList()
    },
    // 定义导出Excel表格事件
    exportExcel () {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          'sheetjs.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.getBuildingList()
    },
    // 添加
    addBd () {
      this.dialogfrom = {}
      this.DetailedTit = '添加建筑'
      this.dialogDetailed = true

      //   this.$router.push({ name: 'project/new' })
    },
    addNewBd () {
      const dto = {
        'pbName': this.dialogfrom.pbName,
        'isSingle': this.dialogfrom.isSingle,
        'floors': this.dialogfrom.floors,
        'proId': this.proId,
        pageIndex: this.pageIndex,
        pageRow: this.pageRow
      }
      this.$http.post('/pf/project/build', dto).then((res) => {
        this.dialogDetailed = false
        if (res.data.code === 0) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getBuildingList()
        } else {
          this.$message({
            message: '添加失败,请您输入正确',
            type: 'error'
          })
        }
      })
    },
    // 获取建筑详细信息
    getBuildingInfo (row) {
      this.dialogDetailed = true
      this.dialogfrom = row
      this.imageUrl = this.dialogfrom.pbImg
      //   this.dialogfrom.isSingle = row.isSingle === false ? '否' : '是'
      this.DetailedTit = '修改信息'
    },
    // 修改
    changeBd () {
      const dto = {
        'pbImg': this.dialogfrom.pbImg,
        'pbName': this.dialogfrom.pbName,
        'isSingle': this.dialogfrom.isSingle,
        'floors': this.dialogfrom.floors,
        'pbId': this.dialogfrom.pbId,
        'proId': this.dialogfrom.proId,
        pageIndex: this.pageIndex,
        pageRow: this.pageRow
      }
      this.$http.put('/pf/project/build', dto).then((res) => {
        this.getBuildingList()
      })
      this.dialogDetailed = false
    },
    // 删除
    deleteBd (row) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: `/pf/project/build/${row.pbId}`,
          method: 'DELETE'
        }).then(res => {
          console.log(res, '1111111111111111111111111111111111111111111')
          this.getBuildingList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 楼层
    floorsInfo () {
      const dto = {
        'pageIndex': this.pageIndexFl,
        'pageRow': 5,
        'pbId': this.storageId
      }
      this.$http.post('/pf/project/build/floor/query', dto).then((res) => {
        this.FloorsData = res.data.data.data
        this.totalCountFl = res.data.data.totalCount
      })
    },
    deleteFloors (row) {
      this.dialogFloors = true
      this.floorsTit = '楼层信息'
      this.storageId = row.pbId
      this.floorsInfo()
    },
    handleCurrentChangeFl (val) {
      this.pageIndexFl = val
      this.floorsInfo()
    },
    addNewFloor (row) {
      this.innerVisible = true
      this.prohibit = false
      this.floorTit = '添加楼层'
      this.dialogFloorsFrom = {}
    },
    addNewFl () {
      const dto = {
        'pbfName': this.dialogFloorsFrom.pbfName,
        'pbId': this.storageId,
        pageIndex: this.pageIndex,
        pageRow: this.pageRow
      }
      this.$http.post('/pf/project/build/floor', dto).then((res) => {
        this.innerVisible = false
        if (res.data.code === 0) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.floorsInfo()
        } else {
          this.$message({
            message: '添加失败,请您输入正确',
            type: 'error'
          })
        }
      })
    },
    changeFloor (row) {
      this.innerVisible = true
      this.prohibit = true
      this.floorTit = '楼层详细信息'
      this.dialogFloorsFrom = row
      this.imageUrl = this.dialogFloorsFrom.pbfImg
    },
    changeFl () {
      const dto = {
        'pbfImg': this.dialogFloorsFrom.pbfImg,
        'pbfName': this.dialogFloorsFrom.pbfName,
        'pbfId': this.dialogFloorsFrom.pbfId,
        pageIndex: this.pageIndex,
        pageRow: this.pageRow
      }
      this.$http.put('/pf/project/build/floor', dto).then((res) => {
        this.innerVisible = false
      })
    },
    DelFloors (row) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: `/pf/project/build/floor/${row.pbfId}`,
          method: 'DELETE'
        }).then(res => {
          this.floorsInfo()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 查看图片
    getImg (row) {
      this.dialogImg = true
      this.img1 = row.pbImg
    },
    uploadImg (params) {
      const fd = new FormData()
      fd.append('img', params.file)
      this.$http.post('/pf/file/upload/buildimg', fd).then((res) => {
        this.dialogfrom.pbImg = res.data.data
        this.imageUrl = res.data.data
      })
    },
    uploadImgFl (params) {
      const fd = new FormData()
      fd.append('img', params.file)
      this.$http.post('/pf/file/upload/floorimg', fd).then((res) => {
        this.dialogFloorsFrom.pbfImg = res.data.data
        this.imageUrl = res.data.data
      })
    },
    formatter (row, column) {
      return dayjs(row.bindTime).format('YYYY-MM-DD HH:mm:ss')
    },
    isSingle (row, column, cellValue) {
      if (row.isSingle === true) {
        return '是'
      } else {
        return '否'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/main.less";
/deep/.el-dialog__header {
  border-bottom: 2px solid #eee;
  .el-dialog__title {
    font-size: 28px;
    font-weight: 700;
  }
}
.el-button + .el-button {
  margin-left: 0;
}
.sx {
  /deep/.el-input__inner {
    color: #fff;
  }
}

.el-input {
  float: left;
  width: 40%;
}
.buttonH {
  display: none !important;
}
.buttonS {
  display: inline-block !important;
}
.avatar {
  width: 170px;
  height: 150px;
  display: block;
  // margin-bottom: 20px;
  position: absolute;
  right: 120px;
  top: 100px;
  z-index: 10;
}
.bdavatar {
  width: 450px;
  height: 400px;
  display: block;
  margin-top: 20px;
  margin-left: 25px;
  z-index: 10;
}
.diafy .btn-next {
  color: #000 !important;
}
/deep/.distpicker-address-wrapper {
  float: left;
  select {
    width: 113px;
    padding: 0;
    font-size: 14px;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
}
</style>
