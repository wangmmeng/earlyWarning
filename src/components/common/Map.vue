<!--地图组件：包括对地图区域边界的设置、地图类型的切换-->
<template>
    <baidu-map id="map" center="山东" :scroll-wheel-zoom="true" @ready="handler"> 
        <bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
            <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
              
            </bm-info-window>
        </bm-marker> 
    </baidu-map>
</template>

<script>
export default {
   data() {
        return {
            markerPoint:{lng: 116.4, lat: 39.9},
            show:false
        };
  },
  methods: {
    // 给地图设置主题色，我设置的是黑夜主题
    handler({ BMap, map }) {
        // let mapStyle={style:"midnight"}
        // map.setMapStyle(mapStyle);
      //  map.setMapType(BMAP_HYBRID_MAP);
        // console.log(BMap, map);
        map.setMapStyle({
            styleJson:[{//道路清空
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {//行政边界改变颜色
                    "featureType": "boundary",
                    "elementType": "all",
                    "stylers": {
                        "color": "#3d85c6ff",
                        "visibility": "on"
                    }
          }
          ]
        });
    },
    infoWindowClose () {
        this.show = false
    },
    infoWindowOpen () {
        this.show = true
    }
  },
}
</script>
<style scoped>
    #map{
        width:100%;
        height:100%;
    }
</style>