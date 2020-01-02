// 导入了 vue
import Vue from 'vue'
// 导入了第三方包 vue-router
import Router from 'vue-router'
// 导入 login & Home
// import Login from '@/views/login'
import Home from '@/views/home'
// 导入 layout
import Layout from '@/views/layout'
// 导入 展示台showcase
import Showcase from '@/views/showcase'
// 导入个人信息
import Personal from '@/views/personal'
// 导入用户信息
import UserInfo from '@/views/userInfo'
// 使用路由
Vue.use(Router)

// 创建并且导出一个 Router 对象
let router = new Router({
  // 设置路由选项
  routes: [
    // 根据目录的重定向
    {
      path: '/',
      redirect: '/home'
    },
    // 布局路由
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/personal',
          name: 'personal',
          component: Personal
        },
        {
          path: '/userInfo',
          name: 'userInfo',
          component: UserInfo
        }
      ]
    },
    {
      path: '/showcase',
      component: Showcase
    }
  ]
})

export default router
