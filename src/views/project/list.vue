<template>
  <div class="Main">
    <el-card class="box-card screen">
      <!-- 筛选信息 -->
      <el-form ref="form" label-width="80px">
        <el-form-item class="sx">
          <el-input style="width:200px" clearable v-model="search_input" auto-complete="off" placeholder="按项目名关键字查询"
          ></el-input>
        </el-form-item>
         <el-form-item>
           <el-select v-model="screen_projectType" placeholder="项目类型">
            <el-option label="全部类型" value='' ></el-option>
            <el-option label="工程队" value=1 ></el-option>
            <el-option label="散户" value=0 ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">筛选</el-button>
          <el-button @click="addPro">添加项目</el-button>
          <el-button @click="exportExcel">导出表格</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table v-loading="loadingTable"  element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" border style="width: 100% ;margin-top: 15px">
      <el-table-column prop="proId" label="项目ID" width="60">
      </el-table-column>
      <el-table-column prop="proName" label="项目名称"> </el-table-column>
      <el-table-column prop="people" label="项目负责人"> </el-table-column>
      <el-table-column prop="phone" label="负责人电话" width="120">
      </el-table-column>
      <el-table-column prop="proType" label="项目类型" width="80" :formatter="protype">
      </el-table-column>
      <el-table-column prop="deviceTotal" label="安装总数" width="80">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="95"
        :formatter="formatter"
      >
      </el-table-column>
      <el-table-column prop="multiBuildingAmount" label="单层建筑">
      </el-table-column>
      <el-table-column prop="singleBuildingAmount" label="多层建筑">
      </el-table-column>
      <!-- <el-table-column prop="province" label="省/市"> </el-table-column>
      <el-table-column prop="city" label="市"> </el-table-column>
      <el-table-column prop="county" label="县"> </el-table-column> -->
      <el-table-column prop="detailAddress" label="详细地址" width="300" :formatter="address"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="getProjectInfo(scope.row)" size="mini" round>
            <i class="el-icon-edit"></i>详细</el-button
          >
          <el-button @click="deleteDp(scope.row)" size="mini" round>
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
    <el-dialog title="详细信息" :visible.sync="dialogDetailed">
      <el-form :model="dialogfrom">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :http-request="uploadImg"
          :show-file-list="false"
        >
          <img :src="`/pf` + imageUrl" class="avatar" />
          <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="dialogfrom.proName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" :label-width="formLabelWidth">
          <el-input v-model="dialogfrom.people" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" :label-width="formLabelWidth">
          <el-input v-model="dialogfrom.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="省/市" :label-width="formLabelWidth">
          <el-input
            v-model="dialogfrom.province"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input v-model="dialogfrom.city" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="县" :label-width="formLabelWidth">
          <el-input v-model="dialogfrom.county" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input
            v-model="dialogfrom.detailAddress"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目类型" :label-width="formLabelWidth">
          <el-input v-model="dialogfrom.proType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="安装总数" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.deviceTotal"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.createTime"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="单层建筑"
          :label-width="formLabelWidth"
        >
          <el-input
            disabled
            v-model="dialogfrom.multiBuildingAmount"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="多层建筑"
          :label-width="formLabelWidth"
        >
          <el-input
            disabled
            v-model="dialogfrom.singleBuildingAmount"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="查看建筑"
          :label-width="formLabelWidth"
        >
        <!-- <router-link :to="{ name: 'BuildingList' }"> -->
          <el-button @click="goBuildingList" type="warning" size="mini">进入建筑列表</el-button>
        <!-- </router-link> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailed = false">取 消</el-button>
        <el-button type="primary" @click="changePro">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import dayjs from 'dayjs'
// import { EventBus } from '@/eventBus.js'
export default {
  data () {
    return {
      userInfo: {},
      userProId: '',
      tableData: [],
      AllFloor: [],
      dialogfrom: {},
      dialogDetailed: false,
      formLabelWidth: '160px',
      search_input: '',
      screen_projectType: '',
      loadingTable: true,
      // 分页
      currentPage1: 1,
      // 文章的总条数
      totalCount: 0,
      // 当前页
      pageIndex: 1,
      // 页容量
      pageRow: 10,
      imageUrl: '', // 图片地址
      uploadUrl: 'http://192.168.0.2:8888/pf/file/upload/proimg'
    }
  },

  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.getDataList()
  },
  // beforeDestroy () {
  //   EventBus.$emit('getproId', this.userProId)
  // },
  methods: {
    // 获取列表数据
    getDataList () {
      this.loadingTable = true
      // 获取该用户所有项目信息
      let dto = {
        'userId': this.userInfo.userId,
        'pageIndex': this.pageIndex,
        'pageRow': this.pageRow,
        'proName': this.search_input,
        'proType': this.screen_projectType
      }
      this.$http.post('/pf/project/query', dto).then((res) => {
        this.loadingTable = false
        this.tableData = res.data.data.data
        this.totalCount = res.data.data.totalCount
      })
    },
    search () {
      this.getDataList()
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
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 添加
    addPro () {
      this.$router.push({ name: 'project/new' })
    },
    // 获取项目信息
    getProjectInfo (row) {
      this.dialogDetailed = true
      this.$http.get(`/pf/project/${row.proId}`).then((res) => {
        this.dialogfrom = res.data.data
        this.imageUrl = res.data.data.img
        this.dialogfrom.createTime = dayjs(res.data.data.createTime).format('YYYY-MM-DD')
      })
      this.userProId = row.proId
      this.$store.commit('setProId', this.userProId)
    },

    // 修改
    changePro (row) {
      const dto = {
        'img': this.dialogfrom.img,
        'proName': this.dialogfrom.proName,
        'proId': this.dialogfrom.proId,
        'people': this.dialogfrom.people,
        'phone': this.dialogfrom.phone,
        'proType': this.dialogfrom.proType,
        'deviceTotal': this.dialogfrom.deviceTotal,
        'createTime': this.dialogfrom.createTime,
        'multiBuildingAmount': this.dialogfrom.multiBuildingAmount,
        'singleBuildingAmount': this.dialogfrom.singleBuildingAmount,
        'province': this.dialogfrom.province,
        'city': this.dialogfrom.city,
        'county': this.dialogfrom.county,
        'detailAddress': this.dialogfrom.detailAddress,
        pageIndex: this.pageIndex,
        pageRow: this.pageRow
      }
      this.$http.put('/pf/project', dto).then((res) => {
        this.getDataList()
      })
      this.dialogDetailed = false
    },
    goBuildingList () {
      this.$router.push({ name: 'BuildingList' })
    },

    // 删除
    deleteDp (row) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: `/pf/project/${row.proId}`,
          method: 'DELETE'
        }).then(res => {
          this.getDataList()
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
    uploadImg (params) {
      const fd = new FormData()
      fd.append('img', params.file)
      this.$http.post('/pf/file/upload/proimg', fd).then((res) => {
        this.dialogfrom.img = res.data.data
        this.imageUrl = res.data.data
      })
    },
    formatter (row, column) {
      return dayjs(row.createTime).format('YYYY-MM-DD')
    },
    protype (row) {
      if (row.proType === 1) {
        return '工程队'
      } else if (row.proType === 0) {
        return '散户'
      }
    },
    address (row, column, cellValue) {
      if (!row.province) {
        return '无'
      } else {
        return (row.province + row.city + row.county + row.detailAddress)
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
  right: 150px;
  top: 100px;
  z-index: 10;
}
/deep/.distpicker-address-wrapper {
      float: left;
    select {
      width: 113px;
      padding: 0 ;
      font-size: 14px;
      border-radius:2px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
    }
    }
</style>
