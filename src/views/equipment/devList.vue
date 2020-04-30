<template>
  <div class="Main">
    <!-- <el-card class="title">全部烟感报警信息</el-card> -->
    <router-link :to="{ name: 'SmokeSensorEquip' }"
      ><el-card class="title on ">{{devType}}设备</el-card></router-link
    >
    <router-link :to="{ name: 'SmokeSensorEquipAlert' }"
      ><el-card class="title">报警信息</el-card></router-link
    >
    <router-link :to="{ name: 'SmokeSensorEquipStatistics' }"
      ><el-card class="title ">设备统计</el-card></router-link
    >
    <el-card class="box-card screen">
      <!-- 筛选信息 -->
      <el-form label-width="80px">
        <el-form-item class="sx">
          <el-input style="width:200px" clearable v-model="search_input" auto-complete="off" placeholder="请输入精确的设备ID"
          ></el-input>
        </el-form-item>
         <el-form-item>
           <el-select v-model="screen_projectType" placeholder="项目类型" @change="getproName">
            <el-option label="全部类型" value='' ></el-option>
            <el-option label="工程队" value=1 ></el-option>
            <el-option label="散户" value=0 ></el-option>
          </el-select>
        </el-form-item>
          <el-form-item v-show="screen_projectType !== ''">
          <el-select v-model="screen_project" placeholder="项目筛选" @change="getproBd">
            <el-option label="全部项目" value='' ></el-option>
            <el-option
              v-for="(item, index) in Sproject"
              :key="index"
              :label="item.proName"
              :value="item.proId"
            ></el-option>
          </el-select>
        </el-form-item >
        <el-form-item v-show="screen_project !== ''">
          <el-select v-model="screen_building" placeholder="建筑筛选" @change="getproFl">
            <el-option label="全部建筑" value='' ></el-option>
            <el-option
              v-for="(item, index) in Sbuilding"
              :key="index"
              :label="item.pbName"
              :value="item.pbId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="screen_building !== ''">
          <el-select v-model="screen_floor" placeholder="楼层筛选">
            <el-option label="全部楼层" value='' ></el-option>
            <el-option
              v-for="(item, index) in Sfloor"
              :key="index"
              :label="item.pbfName"
              :value="item.pbfId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="screen">筛选</el-button>
          <el-button @click="addDptit">添加设备</el-button>
          <el-button @click="exportExcel">导出表格</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table v-loading="loadingTable"  element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" border style="width: 100% ;margin-top: 15px" id="out-table">
      <el-table-column prop="devId" label="设备ID" width="80">
      </el-table-column>
      <el-table-column prop="proName" label="设备名称"> </el-table-column>
      <el-table-column prop="devType" label="设备类型"> </el-table-column>
      <el-table-column prop="model" label="设备型号"> </el-table-column>
      <!-- <el-table-column prop="detailAddress" label="地址" :formatter="address"> </el-table-column> -->
      <el-table-column prop="point" label="安装点"> </el-table-column>
      <el-table-column
        prop="network"
        label="网络状态"
        width="80"
        :formatter="formatterNetwork"
      >
       <template slot-scope="scope">
        <el-tag
          :type="scope.row.network === 0 ? 'warning' : 'success'" close-transition>
          {{scope.row.network === 0 ? '离线':'在线'}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        prop="state"
        label="设备状态"
        width="80"
        :formatter="formatterState"
      >
      </el-table-column>
      <el-table-column prop="bindTime" label="绑定时间" :formatter="formatter">
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click="getdetailed(scope.row)" size="mini" round>
            <i class="el-icon-tickets"></i>详细</el-button
          >
          <el-button @click="editDptit(scope.row)" size="mini" round>
            <i class="el-icon-edit"></i
          ></el-button>
          <el-button @click="deleteDp(scope.row)" size="mini" round>
            <i class="el-icon-delete"></i
          ></el-button>
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
    <el-dialog :title="dialogtit" :visible.sync="dialogDetails">
      <el-form :model="dialogfrom">
        <el-form-item label="所属项目" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.proName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属建筑" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.pbName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="住户名称" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.dpName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="住户电话" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.phone"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="危险等级" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.dangerLevel"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="绑定时间" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.bindTime"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否为个人" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.personal"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.devName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录时间" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.loginTime"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="网关" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.gateway"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="IMEI" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.imei"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备ID" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.devId"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="监控状态"
          :label-width="formLabelWidth"
          v-show="dialogfrom.listenState !== -1"
        >
          <el-input
            disabled
            v-model="dialogfrom.listenState"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电池容量" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.batteryCapacity"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="通讯方式" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.communicate"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="物联网关" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.createTime"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备型号" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.model"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="网络状态" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.network"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备状态" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.state"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="信号" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="dialogfrom.signalValue"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="开关状态"
          :label-width="formLabelWidth"
          v-show="dialogfrom.listenState !== -1"
        >
          <el-input
            disabled
            v-model="dialogfrom.switchState"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetails = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 添加与修改弹框 -->
    <el-dialog :title="dialogtit" :visible.sync="dialogAddEdit" >
      <el-form :model="dialogfromB">
        <el-form-item label="绑定设备ID" :label-width="formLabelWidth">
          <el-input v-model="dialogfromB.devId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input
            v-model="dialogfromB.devName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="危险等级" :label-width="formLabelWidth">
          <el-input
            v-model="dialogfromB.dangerLevel"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="dialogfromB.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="项目类型"
          :label-width="formLabelWidth"
          v-show="this.dialogtit === '添加设备'"
        >
          <el-radio-group v-model="dialogfromB.proType" @change="getProInfo">
            <el-radio :label="1">工程队</el-radio>
            <el-radio :label="0">散户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="绑定项目"
          :label-width="formLabelWidth"
          v-show="this.dialogtit === '添加设备'"
        >
          <el-select v-model="tkProId" placeholder="楼层筛选">
            <el-option
              v-for="(item, index) in proType"
              :key="index"
              :label="item.proName"
              :value="[item.proId, item.proName]"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装点" :label-width="formLabelWidth">
          <el-input v-model="dialogfromB.point" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否为个人" :label-width="formLabelWidth" >
          <el-radio-group v-model="dialogfromB.personal" @change="emptyPb">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="定位"
          :label-width="formLabelWidth"
        >
          <el-button @click="tkMap" :type="this.coorType">{{this.coordinateInfo}}</el-button>
        </el-form-item>
        <el-form-item
          label="所属建筑"
          :label-width="formLabelWidth"
          v-show="!dialogfromB.personal"
        >
          <el-input v-model="dialogfromB.pbName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="所属楼层"
          :label-width="formLabelWidth"
            v-show="!dialogfromB.personal"
        >
          <el-input
            v-model="dialogfromB.pbfName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddEdit = false">取 消</el-button>
        <el-button :class="[this.dialogtit === '添加设备' ? 'buttonS' : 'buttonH']" type="primary"  @click="addDp" >确定添加</el-button
        >
        <el-button
          :class="[this.dialogtit === '修改设备' ? 'buttonS' : 'buttonH']"
          type="primary"
          @click="changeDp"
          >确定修改</el-button
        >
      </div>
      <el-dialog append-to-body title="定位" :visible.sync="dialogMap" width="40%" >
        <div class="mapboxS" ref="map">
          <baidu-map v-if="dialogMap"
            :center="center"
            :zoom="zoom"
            :scroll-wheel-zoom="true"
            class="baidu-m"
            @ready="handler"
            @click="getClickInfo"
            :mapStyle="mapStyle"
          >
            <!-- 必须给容器指高度，不然地图将显示在一个高度为0的容器中，看不到 -->
            <bm-map-type
              :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
              anchor="BMAP_ANCHOR_TOP_LEFT"
            ></bm-map-type>
            <!-- 标记 -->
            <bm-marker
              :position="{ lng: this.markers.lng, lat: this.markers.lat }"
              :dragging="true"
            >
            </bm-marker>
            <bm-local-search
              :keyword="keyword"
              :location="location"
              :auto-viewport="autoViewport"
              :panel="panel"
              :select-first-result="selectFirstResult"
              @searchcomplete="searchcomplete"
            ></bm-local-search>
            <bm-control>
              <bm-auto-complete
                v-model="keyword"
                :sugStyle="{ zIndex: 999999 }"
              >
                <el-input
                  style="top:5px;left:100px"
                  v-model="mapvalue"
                  placeholder="请输入地址"
                  size="mini"
                  clearable
                ></el-input>
              </bm-auto-complete>
            </bm-control>
          </baidu-map>
        </div>
        <el-button @click="getCoordinate" type="warning" round>确定位置</el-button>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      userInfo: {},
      tableData: [],
      AllFloor: [],
      datetime: [],
      dialogfrom: {},
      dialogfromB: {
      },
      proType: {},
      tkProId: '',
      // 传递
      devType: '',
      dialogDetails: false,
      dialogAddEdit: false,
      dialogMap: false,
      dialogtit: '',
      formLabelWidth: '160px',
      search_input: '',
      screen_projectType: '',
      screen_project: '',
      Sproject: {},
      screen_building: '',
      Sbuilding: {},
      screen_floor: '',
      Sfloor: {},
      loadingTable: true,
      // 分页
      currentPage1: 1,
      totalCount: 0,
      pageIndex: 1,
      pageRow: 10,
      NewsProjectform: {},
      coordinateInfo: '获取',
      coorType: 'warning',
      // 地图
      center: {}, // 经纬度
      zoom: 10, // 地图展示级别
      mapvalue: '',
      markers: { lng: null, lat: null },
      search: { lng: null, lat: null }, // 经纬度
      panel: false,
      keyword: '',
      selectFirstResult: true,
      location: '深圳',
      autoViewport: true,
      show: true,
      // 地图颜色
      mapStyle: {
        width: '680px',
        height: '0',
        overflow: 'hidden'
      }
    }
  },

  components: {
    // BaiDuMap // 地图组件
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (this.$route.name === 'SmokeSensorEquip') {
      this.devType = '烟感'
      this.getDataList()
    } else if (this.$route.name === 'GasDeterctor') {
      this.devType = '燃气'
      this.getDataList()
    } else if (this.$route.name === 'ElectricalFireEquipment') {
      this.devType = '电器火灾'
      this.getDataList()
    } else if (this.$route.name === 'IOTGateway') {
      this.devType = '物联网关'
      this.getDataList()
    }
  },
  mounted () {
    this.getDataList()
  },
  watch: {
    '$route': function () {
      if (this.$route.name === 'SmokeSensorEquip') {
        this.devType = '烟感'
        this.pageIndex = 1
        this.getDataList()
      } else if (this.$route.name === 'GasDeterctor') {
        this.devType = '燃气'
        this.pageIndex = 1
        this.getDataList()
      } else if (this.$route.name === 'ElectricalFireEquipment') {
        this.devType = '电器火灾'
        this.pageIndex = 1
        this.getDataList()
      } else if (this.$route.name === 'IOTGateway') {
        this.devType = '物联网关'
        this.pageIndex = 1
        this.getDataList()
      }
    }
  },
  methods: {
    // 获取列表数据
    getDataList () {
      this.loadingTable = true
      const dto = {
        'userId': this.userInfo.userId,
        'devId': this.search_input,
        'devType': this.devType,
        'proId': this.screen_project,
        'pbId': this.screen_building,
        'pbfId': this.screen_floor,
        'proType': this.screen_projectType,
        'pageIndex': this.pageIndex,
        'pageRow': this.pageRow
      }
      this.$http.post('/pf/dpoint/queryList', dto).then((res) => {
        this.tableData = res.data.data.data
        this.totalCount = res.data.data.totalCount
        this.loadingTable = false
      })
    },
    getdetailed (row) {
      this.dialogDetails = true
      this.dialogtit = '设备详细信息'
      this.$http.get(`/pf/dpoint/${row.dpId}`).then((res) => {
        this.dialogfrom = res.data.data
        this.dialogfrom.personal = res.data.data.personal === false ? '否' : '是'
        this.dialogfrom.bindTime = dayjs(res.data.data.bindTime).format('YYYY-MM-DD')
        this.dialogfrom.loginTime = dayjs(res.data.data.bindTime).format('YYYY-MM-DD')
        this.dialogfrom.network = res.data.data.network === 1 ? '在线' : '离线'
        if (this.dialogfrom.state === 1) {
          return this.$set(this.dialogfrom, 'state', '报警')
        } else if (this.dialogfrom.state === 2) {
          return this.$set(this.dialogfrom, 'state', '故障')
        } else {
          return this.$set(this.dialogfrom, 'state', '正常')
        }
      })
    },
    screen () {
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
        // console.log(1)
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
    addDptit () {
      this.dialogAddEdit = true
      this.dialogtit = '添加设备'
      this.dialogfromB = {
      }
    },
    addDp () {
      const dto = {
        'devId': this.dialogfromB.devId,
        'devName': this.dialogfromB.devName,
        'dangerLevel': this.dialogfromB.dangerLevel,
        'phone': this.dialogfromB.phone,
        'proId': this.tkProId[0],
        'proName': this.tkProId[1],
        'personal': this.dialogfromB.personal,
        'point': this.dialogfromB.point,
        'pdName': this.dialogfromB.pdName,
        'pdfName': this.dialogfromB.pdfName
      }
      this.$http.post('/pf/dpoint', dto).then((res) => {
        if (res.data.code === 0) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getDataList()
          this.dialogAddEdit = false
        } else if (res.data.code === 1) {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        } else {
          this.$message({
            message: '添加失败,请您输入正确',
            type: 'error'
          })
        }
      })
    },
    // 添加设备取到项目
    getProInfo (value) {
      this.tkProId = ''
      let userId = this.userInfo.userId
      let proType = this.dialogfromB.proType
      this.$http.get(`/pf/project/query/${userId}/${proType}`).then((res) => {
        this.proType = res.data.data
      })
    },
    // 筛选相关--------------------------------------
    getproName () {
      this.screen_project = ''
      this.screen_building = ''
      let userId = this.userInfo.userId
      let proType = this.screen_projectType
      this.$http.get(`/pf/project/query/${userId}/${proType}`).then((res) => {
        this.Sproject = res.data.data
      })
    },
    getproBd () {
      this.screen_building = ''
      let proId = this.screen_project
      this.$http.get(`/pf/project/build/query/${proId}`).then((res) => {
        this.Sbuilding = res.data.data
      })
    },
    getproFl () {
      let pbId = this.screen_building
      this.$http.get(`/pf/project/build/floor/query/${pbId}`).then((res) => {
        this.Sfloor = res.data.data
      })
    },
    // 修改---------------------------------
    async editDptit (row) {
      this.dialogAddEdit = true
      let point = { lng: null, lat: null }
      this.center = point
      this.markers = point
      this.dialogtit = '修改设备'
      await this.$http.get(`/pf/dpoint/${row.dpId}`).then((res) => {
        this.dialogfromB = res.data.data
        if (this.dialogfromB.lng) {
          this.coordinateInfo = '已获取'
          this.coorType = 'success'
        } else if (!this.dialogfromB.lng) {
          this.coordinateInfo = '获取'
          this.coorType = 'warning'
        }
        let point = { lng: this.dialogfromB.lng, lat: this.dialogfromB.lat }
        this.center = point
        this.markers = point
      })
    },
    changeDp (row) {
      const dto = {
        'devId': this.dialogfromB.devId,
        'devName': this.dialogfromB.devName,
        'dangerLevel': this.dialogfromB.dangerLevel,
        'phone': this.dialogfromB.phone,
        'dpId': this.dialogfromB.dpId,
        'personal': this.dialogfromB.personal,
        'point': this.dialogfromB.point,
        'pdName': this.dialogfromB.pdName,
        'pdfName': this.dialogfromB.pdfName,
        'lng': this.markers.lng,
        'lat': this.markers.lat
      }
      this.$http.put('/pf/dpoint', dto).then((res) => {
        this.getDataList()
      })
      this.dialogAddEdit = false
    },
    // 删除
    deleteDp (row) {
      this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: `/pf/dpoint/${row.dpId}`,
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
    emptyPb () {
      if (this.dialogfromB.personal === true) {
        this.dialogfromB.pbName = ''
        this.dialogfromB.pbfName = ''
      }
    },
    // 获取定位
    tkMap (row) {
      // this.zoom = 4
      this.dialogMap = true
      if (this.dialogfromB.lng !== undefined) {
        let point = { lng: this.dialogfromB.lng, lat: this.dialogfromB.lat }
        this.center = point
        this.markers = point
      } else {
        let point = { lng: 116.416648, lat: 39.904375 }
        this.center = point
        this.markers = {}
      }
    },
    getCoordinate () {
      this.dialogMap = false
      if (this.markers.lng) {
        this.coordinateInfo = '已获取'
        this.coorType = 'success'
      }
    },
    handler ({ BMap, map }) {
      this.center.lng = this.center.lng
      this.center.lat = this.center.lat
      this.zoom = this.zoom
    },

    getClickInfo (e) {
      let point = { lng: e.point.lng, lat: e.point.lat }
      this.markers = point
    },
    locationSuccess (e) { // 百度地图定位完成后
      // console.log(e)
      this.search.lng = e.point.lng
      this.search.lat = e.point.lat
    },
    searchcomplete (e) { // 百度地图搜索框完成之后
      // console.log(e)
      if (e) {
        this.search.lng = ''
        this.search.lat = ''
      }
    },

    // 格式化表格内容
    formatter (row, column) {
      return dayjs(row.bindTime).format('YYYY-MM-DD')
    },
    formatterNetwork (row, column) {
      if (row.network === 1) {
        return '在线'
      } else {
        return '离线'
      }
    },
    formatterState (row) {
      if (row.state === 1) {
        return '报警'
      } else if (row.state === 2) {
        return '故障'
      } else {
        return '正常'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/main.less";
/deep/.distpicker-address-wrapper {
  float: left;
  margin-bottom: 10px;
  select {
    width: 131px;
    height: 40px;
    padding: 0;
    font-size: 14px;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
}
.sx {
  /deep/.el-input__inner {
    color: #fff;
  }
}
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
.el-input {
  float: left;
  width: 60%;
}
.buttonH {
  display: none !important;
}
.buttonS {
  display: inline-block !important;
}
.mapboxS {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}
.baidu-m {
  height: 500px;
  // border: 1px solid #ccc;
  .el-input {
  // float: left;
  width: 150%;
}
}
</style>
