// 导入了 vue
import Vue from 'vue'
// 导入了第三方包 vue-router
import Router from 'vue-router'
// 导入 nprogress
import nprogress from 'nprogress'
// 导入样式文件
import 'nprogress/nprogress.css'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
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
          component: () => import('@/views/alarm/SmokeSensorEquipAlert.vue'),
          meta: ['报警信息', '全部报警信息']
        },
        {
          // 统计
          path: '/alarm/SmokeSensorEquipStatistics',
          name: 'SmokeSensorEquipStatistics',
          component: () => import('@/views/alarm/NBSmokeSensor/SmokeSensorEquipStatistics.vue'),
          meta: ['报警信息', '烟感设备统计']
        },
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
          meta: {
            nav: ['项目管理', '新建项目']
          }
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
        // {
        //   path: '/systemSetup',
        //   name: 'systemSetup',
        //   component: () => import('@/views/systemSetup'),
        //   meta: ['系统设置']
        // },
        {
          path: '/systemSetup/comInfo',
          name: 'ComInfo',
          component: () => import('@/views/systemSetup/comInfo.vue'),
          meta: ['系统设置', '公司信息']
        },
        {
          path: '/systemSetup/personnelInfo',
          name: 'PersonnelInfo',
          component: () => import('@/views/systemSetup/personnelInfo.vue'),
          meta: ['系统设置', '人员信息']
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
// router: 路由对象
// 给路由对象添加导航守卫：全局前置导航守卫
// 当由一个路由跳转到另一个路由时执行
//  to: 要到达目标路由
//  from: 发起跳转的路由
//  next: 函数，是否执行后续代码
router.beforeEach((to, from, next) => {
  nprogress.start()
  // 排除跳转到登录页面
  setTimeout(() => {
    if (to.path !== '/login') {
      // 得到 localstorage 中的 userInfo： 如果存在  userInfo 说明登录成功，如果 userInfo 不存在，说明没有登录
      let userInfo = window.localStorage.getItem('userInfo')
      // 判断用户是否登录：
      if (!userInfo) {
        // 如果不存在说明没有登录过，应该跳转到登录页面
        router.push('/login')
      } else {
        next() // 执行后续代码
      }
    } else {
      // 如果访问的是 login 说明不需要进行登录验证
      next() // 执行后续代码
    }
  }, 1)
})
router.afterEach((to, from) => {
  nprogress.done()
})
export default router
