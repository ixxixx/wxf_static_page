<template>
  <div class="layout">
    <el-container>
      <el-aside style="width:15%">
        <layoutasider />
      </el-aside>
      <el-container style="width:85%" class="conta">
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
  .conta {
    background-color: #0b2349;
  }
}

.el-aside {
  background-color: #304156;
  color: #333;
}
.el-header {
  height: 70px !important;
  background-color: #082449;
  color: #000;
  border: 1px solid #1176a7;
  margin-top: 5px;
  box-shadow: 0px 0px 5px #1176a7 inset, 0px 0px 5px #27a9eb;
}
/deep/.mbxNav {
  margin-top: 13px;
  margin-bottom: 13px;
  background-color: #113356;
  border: 1px solid #1176a7;
  box-shadow: 0px 0px 5px #1176a7 inset, 0px 0px 5px #27a9eb;
  height: 55px;
  .el-breadcrumb__inner.is-link, .el-breadcrumb__inner {
    color: #fff;
  }
  .el-breadcrumb {
  font-size: 16px;
    line-height: 55px;
    margin-left: 15px;
    font-weight: bold;
  }
}
.el-main {
  background-color: #103154;
  color: #333;

}
</style>
