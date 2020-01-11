<template>
  <div  :class="[$route.name === 'showcase' ? 'mapbox' : 'mapboxS']">
    <baidu-map
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      class="baidu-m"
      @ready="handler"
      :mapStyle="mapStyle"
    >
      <!-- 必须给容器指高度，不然地图将显示在一个高度为0的容器中，看不到 -->
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <!-- 标记 -->、
      <bm-marker v-for="(item, index) in this.infoMarkerData" :key="index"
        :position="{ lng: item.value[0], lat: item.value[1]}"
        :dragging="false"
        @click="infoWindowOpen(index)"
      >
        <bm-info-window
          :show='item.show'
          @close="infoWindowClose(index)"
          @open="infoWindowOpen(index)"
          ><p>项目名称: {{item.name}}</p>
          <p>设备数量: {{item.deviceF}}</p>
          <p>子设备数量: {{item.deviceS}}</p>
        </bm-info-window>
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
        <bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 999999 }">
          <el-input
            style="top:5px;left:100px"
            v-model="mapvalue"
            placeholder="请搜索活动地址"
            size="mini"
            clearable
          ></el-input>
        </bm-auto-complete>
      </bm-control>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 地图
      center: { lng: 0, lat: 0 }, // 经纬度
      zoom: 6, // 地图展示级别
      mapvalue: '',
      markers: [{}],
      // infoMarkers: [1, 23, 3, 5435, 6567, 45, 214],
      // marker: { lng: null, lat: null },
      search: { lng: null, lat: null }, // 经纬度
      panel: false,
      keyword: '',
      selectFirstResult: true,
      location: '深圳',
      autoViewport: true,
      show: true,
      infoMarkerData: [],
      // 地图颜色
      mapStyle: {
        styleJson: [
          {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': {
              'color': '#021019'
            }
          },
          {
            'featureType': 'highway',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'highway',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#147a92'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#0b3d51'
            }
          },
          {
            'featureType': 'local',
            'elementType': 'geometry',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'land',
            'elementType': 'all',
            'stylers': {
              'color': '#08304b'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#08304b'
            }
          },
          {
            'featureType': 'subway',
            'elementType': 'geometry',
            'stylers': {
              'lightness': -70
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#857f7f'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.stroke',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'green',
            'elementType': 'geometry',
            'stylers': {
              'color': '#062032'
            }
          },
          {
            'featureType': 'boundary',
            'elementType': 'all',
            'stylers': {
              'color': '#1e1c1c'
            }
          },
          {
            'featureType': 'manmade',
            'elementType': 'geometry',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.icon',
            'stylers': {
              'visibility': 'off'
            }
          },
          {
            'featureType': 'poilabel',
            'elementType': 'labels.text.stroke',
            'stylers': {
              'color': '#2da0c6',
              'visibility': 'on'
            }
          }
        ]
      }
    }
  },
  methods: {
    handler ({ BMap, map }) {
      // console.log(BMap, map)
      this.center.lng = 100.034564
      this.center.lat = 33.96456
      this.zoom = this.zoom
    },
    // getClickInfo (e) {
    //   console.log(e)
    //   this.markers.push({ local: { lng: e.point.lng, lat: e.point.lat }, show: false })
    // },
    /* rmInfo () {
    this.markers.splice(this.markers[this.markers.length - 1], 1)
  }, */
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
    infoWindowClose (index) {
      this.infoMarkerData[index].show = false
    },
    infoWindowOpen (index) {
      this.infoMarkerData[index].show = true
    },
    infoMarker () {
      this.$http('/js/bdm-data.json').then(res => {
        this.infoMarkerData = res.data
        console.log(this.infoMarkerData)
      }
      )
    }
  },
  mounted () {
    this.infoMarker()
  }
}
</script>

<style lang="less" scoped>
.mapbox {
  width: 100%;
  height: 100%;
  margin-top: 30/96rem;
  border: 1px solid #ccc;}
  .mapboxS {
    width: 100%;
  height: 100%;
  // margin-top: 30/96rem;
  border: 1px solid #ccc;
  }
  .baidu-m {
    height: 100%;
    //   .BMap_mask {
    //   }
  }
  .el-input__inner {
    background-color: transparent;
    color: #fff;
}
</style>
