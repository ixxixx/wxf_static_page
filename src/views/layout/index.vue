<template>
  <div class="layout">
    <el-container>
      <el-aside style="width:15%">
        <layoutasider />
      </el-aside>
      <el-container style="width:85%">
        <el-header>
          <layoutheader />
        </el-header>
        <div class="mbxNav">
          <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">
    {{item}}
    </el-breadcrumb-item>
</el-breadcrumb>
        </div>
        <el-main>
          <!-- 将来请求 home, index, publish ... 路径时，优先加载 layout ，-->
          <!-- 加载完 layout 之后再用 home, index, publish 组件替换掉 layout 中的 router-view -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入两个布局组件
import layoutheader from '@/views/layout/components/layoutHeader'
import layoutasider from '@/views/layout/components/layoutAsider'

export default {
  components: {
    layoutheader,
    layoutasider
  }
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  & > .el-container {
    height: 100%;
  }
}
.el-aside {
  background-color: #304156;
  color: #333;
}
.el-header {
  height: 30/96rem !important;
  background-color: rgb(208, 235, 232);
  color: #000;
  line-height: 1;
}
.mbxNav {
  margin-top: 3/96rem;
  margin-bottom: 3/96rem;
  background-color: rgb(236, 245, 244);
  // border: 2px solid #ccc;
  height: 25/96rem;
  .el-breadcrumb {
  font-size: 9/96rem;
    line-height: 25/96rem;
    margin-left: 15/96rem;font-weight: bold;
  }
}
.el-main {
  background-color: #eee;
  color: #333;
}
</style>
