// 导入了 vue
import Vue from 'vue'
// 导入了第三方包 vue-router
import Router from 'vue-router'
// 使用路由
Vue.use(Router)

// 创建并且导出一个 Router 对象
let router = new Router({
  // 设置路由选项
  routes: [
    // 根据目录的重定向
    {
      path: '/',
      redirect: '/login'
    },
    // 布局路由
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/views/layout'),
      children: [
        {
          path: '/showcase/baiduMap',
          name: '/showcase/baiduMap',
          component: () => import('@/views/showcase/components/DeviceDistribution/components/BaiDuMap')
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/showcase/components/DeviceDistribution/DeviceDistribution')
        },
        {
          path: '/userInfo',
          name: 'userInfo',
          component: () => import('@/views/userInfo')
        },
        // // 报警信息
        // {
        //   path: '/alarm',
        //   name: 'alarm',
        //   component: () => import('@/views/alarm'),
        //   meta: ['报警信息'],
        //   children: [
        {
          // 全部烟感报警信息
          path: '/alarm/SmokeSensorEquipAlert',
          name: 'SmokeSensorEquipAlert',
          component: () => import('@/views/alarm/NBSmokeSensor/SmokeSensorEquipAlert.vue'),
          meta: ['报警信息', '全部烟感报警信息']
        },
        {
          // 统计
          path: '/alarm/SmokeSensorEquipStatistics',
          name: 'SmokeSensorEquipStatistics',
          component: () => import('@/views/alarm/NBSmokeSensor/SmokeSensorEquipStatistics.vue'),
          meta: ['报警信息', '烟感设备统计']
        },
        // {
        //   path: '/alarm/SmokeSensorEquip',
        //   name: 'SmokeSensorEquip',
        //   component: () => import('@/views/alarm/NBSmokeSensor/SmokeSensorEquip.vue'),
        //   meta: ['报警信息', '全部烟感设备']
        // },
        // ]
        // },
        // 设备管理
        {
          path: '/equipment/SmokeSensorEquip',
          name: 'SmokeSensorEquip',
          component: () => import('@/views/equipment/devList.vue'),
          meta: ['设备管理', '烟感设备']
        },
        {
          path: '/equipment/gasDeterctor',
          name: 'GasDeterctor',
          component: () => import('@/views/equipment/devList.vue'),
          meta: ['设备管理', '燃气设备']
        },
        {
          path: '/equipment/electricalFireEquipment',
          name: 'ElectricalFireEquipment',
          component: () => import('@/views/equipment/devList.vue'),
          meta: ['设备管理', '电器火灾设备']
        },
        {
          path: '/equipment/IOTGateway',
          name: 'IOTGateway',
          component: () => import('@/views/equipment/devList.vue'),
          meta: ['设备管理', '物联网关设备']
        },

        // 增值服务
        {
          path: '/increment',
          name: 'increment',
          component: () => import('@/views/increment'),
          meta: ['增值服务']
        },
        // 帮助中心
        {
          path: '/helpCenter',
          name: 'helpCenter',
          component: () => import('@/views/helpCenter'),
          meta: ['帮助中心']
        },
        // 项目管理
        {
          path: '/project/new',
          name: 'project/new',
          component: () => import('@/views/project/new.vue'),
          meta: ['项目管理', '新建项目']
        },
        {
          path: '/project/list',
          name: 'project/list',
          component: () => import('@/views/project/list.vue'),
          meta: ['项目管理', '项目列表']

        },
        {
          path: '/project/list/buildingList',
          name: 'BuildingList',
          component: () => import('@/views/project/buildingList.vue'),
          meta: ['项目管理', '项目列表', '建筑列表']
        },
        // 维修
        {
          path: '/repair/recordFree',
          name: 'repair/recordFree',
          component: () => import('@/views/repair/record/free.vue'),
          meta: ['维修/维保', '维修记录(免费)']
        },
        {
          path: '/repair/recordCharge',
          name: 'repair/recordCharge',
          component: () => import('@/views/repair/record/charge.vue'),
          meta: ['维修/维保', '维修记录(收费)']
        },
        {
          path: '/repair/recordMyCharge',
          name: 'repair/recordMyCharge',
          component: () => import('@/views/repair/record/myCharge.vue'),
          meta: ['维修/维保', '维修记录(我方收费)']
        },
        {
          path: '/repair/NewOrder',
          name: 'repair/NewOrder',
          component: () => import('@/views/repair/NewOrder'),
          meta: ['维修/维保', '维修下单']
        },
        // 系统设置
        {
          path: '/systemSetup',
          name: 'systemSetup',
          component: () => import('@/views/systemSetup'),
          meta: ['系统设置']
        },
        {
          path: '/systemSetup/comInfo',
          name: 'ComInfo',
          component: () => import('@/views/systemSetup/comInfo.vue'),
          meta: ['系统设置', '公司信息']
        },
        {
          path: '/personal',
          name: 'Personal',
          component: () => import('@/views/systemSetup/personal.vue')
        }
      ]
    },
    {
      path: '/showcase',
      name: 'showcase',
      component: () => import('@/views/showcase')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    }
  ]
})

export default router
