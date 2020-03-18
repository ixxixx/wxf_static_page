<template>
  <div class="Main">
    <!-- <el-card class="title">全部烟感报警信息</el-card> -->
    <router-link :to="{ name: 'SmokeSensorEquip' }"
      ><el-card class="title on ">全部烟感设备</el-card></router-link
    >
    <router-link :to="{ name: 'SmokeSensorEquipAlert' }"
      ><el-card class="title">烟感报警信息</el-card></router-link
    >
    <router-link :to="{ name: 'SmokeSensorEquipStatistics' }"
      ><el-card class="title ">烟感设备统计</el-card></router-link
    >
    <el-card class="box-card screen">
      <!-- 筛选信息 -->
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
          <el-button @click="exportExcel">导出表格</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 15px"
      stripe
      id="out-table"
    >
      <el-table-column prop="id" label="序号" width="50"> </el-table-column>
      <el-table-column prop="time" label="绑定时间" width="180">
      </el-table-column>
      <el-table-column prop="name" label="所属项目" width="120">
      </el-table-column>
      <el-table-column prop="type" label="设备类型" width="100">
      </el-table-column>
      <el-table-column prop="address" label="设备位置"> </el-table-column>
      <el-table-column prop="code" label="设备号编码"> </el-table-column>
      <!-- <el-table-column prop="edit" label="编辑"> </el-table-column> -->
      <el-table-column prop="state" label="设备状态" width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.state === '在线' ? 'success' : 'danger'"
            close-transition
            >{{ scope.row.state }}</el-tag
          >
        </template></el-table-column
      >
      <el-table-column prop="remarks" label="编辑" width="80"
        ><i class="el-icon-edit-outline" @click="Date"></i>
      </el-table-column>
      <el-table-column prop="remarks" label="删除" width="80"
        ><i class="el-icon-delete" @click="deleteP"></i>
      </el-table-column>
    </el-table>
    <div class="block pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
// import '../../../styles/main.less'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      tableData: [{
        id: '1',
        time: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        type: 'NB烟感',
        code: '123456789',
        edit: '无',
        state: '在线'
      }, {
        id: '2',
        time: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        type: 'NB烟感',
        code: '123456789',
        edit: '无',
        state: '离线'
      }, {
        id: '3',
        time: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        type: 'NB烟感',
        code: '123456789',
        edit: '无',
        state: '异常'
      }, {
        id: '4',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'NB烟感',
        code: '123456789',
        edit: '无',
        state: '在线'
      }, {
        id: '5',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'NB烟感',
        code: '123456789',
        edit: '无',
        state: '在线'
      }, {
        id: '6',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'NB烟感',
        code: '123456789',
        edit: '无',
        state: '在线'
      }, {
        id: '7',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'NB烟感',
        code: '123456789',
        edit: '无',
        state: '在线'
      }, {
        id: '8',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'NB烟感',
        code: '123456789',
        edit: '无',
        state: '在线'
      }, {
        id: '9',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'NB烟感',
        code: '123456789',
        edit: '无',
        state: '在线'
      }, {
        id: '10',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'NB烟感',
        code: '123456789',
        edit: '无',
        state: '在线'
      }, {
        id: '11',
        time: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        type: 'NB烟感',
        code: '123456789',
        edit: '无',
        state: '消警'
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
      console.log(this.datetime)
      console.log(this.screen_project)
      console.log(this.screen_rchitecture)
      console.log(this.screen_floor)
      console.log(this.screen_all)
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
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../styles/main.less';

</style>
