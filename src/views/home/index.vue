
<template>
  <div id="mapbox">
    <baidu-map
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      style="height:620px"
      @ready="handler"
      @click="getClickInfo"
    >
      <!-- 必须给容器指高度，不然地图将显示在一个高度为0的容器中，看不到 -->
      <!-- 右上角比例尺切换 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- <bm-marker :position="{lng: this.marker.lng, lat: this.marker.lat}" :dragging="false"></bm-marker> -->
      <bm-local-search
        :keyword="keyword"
        :location="location"
        :auto-viewport="autoViewport"
        :panel="panel"
        :select-first-result="selectFirstResult"
        @searchcomplete="searchcomplete"
      ></bm-local-search>
      <bm-control>
        <bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 999999 }">
          <el-input v-model="mapvalue" placeholder="请搜索活动地址" size="mini" clearable></el-input>
        </bm-auto-complete>
      </bm-control>
    </baidu-map>
  </div>
</template>
<script>
export default {
  name: 'mapbox',
  data () {
    return {
      center: { lng: 0, lat: 0 }, // 经纬度
      zoom: 5, // 地图展示级别
      mapvalue: '',
      marker: { lng: null, lat: null },
      search: { lng: null, lat: null },
      panel: false,
      keyword: '',
      selectFirstResult: true,
      location: '深圳',
      autoViewport: true
    }
  },
  methods: {
    handler ({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 104.034564
      this.center.lat = 36.96456
      this.zoom = this.zoom
    },
    getClickInfo (e) {
      console.log(e.point.lng)
      console.log(e.point.lat)
      this.marker.lng = e.point.lng
      this.marker.lat = e.point.lat
    },
    locationSuccess (e) { // 百度地图定位完成后
      console.log(e)
      this.search.lng = e.point.lng
      this.search.lat = e.point.lat
    },
    searchcomplete (e) { // 百度地图搜索框完成之后
      console.log(e)
      if (e) {
        this.search.lng = ''
        this.search.lat = ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
  #mapbox {
    width: 1250px;
  }
</style>
