<!--地图组件：包括对地图区域边界的设置、地图类型的切换-->
<template>
    <baidu-map id="map" center="山东省" :scroll-wheel-zoom="true" @ready="handler"> 
        <bm-boundary name="山东省" :strokeWeight="3" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省济南市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省潍坊市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省烟台市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省青岛市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省淄博市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省枣庄市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省东营市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省济宁市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省泰安市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省威海市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省日照市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省临沂市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省聊城市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省德州市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省滨州市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
        <bm-boundary name="山东省菏泽市" :strokeWeight="2" strokeColor="#fff" fillOpacity="0"></bm-boundary>
    </baidu-map>
</template>

<script>
import {WeatherWind} from "./weatherwind"
import img from "../../assets/image/img.png"
export default {
   data() {
        return {
            markerPoint:{lng: 116.404, lat: 39.915},
            windTuceng:null,
            BMap: null
        };
  },
  mounted() {
  
  },
  methods: {
    // 给地图设置主题色，我设置的是黑夜主题
    handler({BMap,map}) {
         //地图风格
        map.setMapStyle({
            styleJson:
        //     [{//道路清空
        //             "featureType": "road",
        //             "elementType": "all",
        //             "stylers": {
        //                 "visibility": "off"
        //             }
        //         },
        //         {//行政边界改变颜色
        //             "featureType": "boundary",
        //             "elementType": "all",
        //             "stylers": {
        //                 "color": "#3d85c6ff",
        //                 "visibility": "on"
        //         }
        //     }
        //   ]
        [
            {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                              "color": "#044161ff",
                              "visibility": "on"
                    }
                    
          },
           {
                    "featureType": "land",
                    "elementType": "all",
                    "stylers": {
                              "color": "#004981ff",
                              "visibility": "on"
                    }
          },
           {
                    "featureType": "districtlabel",
                    "elementType": "labels.text.fill",
                    "stylers": {
                              "color": "#ffffffff",
                              "visibility": "on"
                    }
          },
         {
                    "featureType": "districtlabel",
                    "elementType": "labels.text.stroke",
                    "stylers": {
                              "color": "rgba(0,0,0,0)",
                              "visibility": "on"
                    }
          },
          {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
            },
            {
                    "featureType": "boundary",
                    "elementType": "all",
                    "stylers": {
                              "color": "#029fd4ff",
                              "visibility": "on"
                    }
          }
        ]
        });
      //  map.setMapType(BMAP_HYBRID_MAP);
        
    
        // let mapStyle={style:"midnight"}
        // map.setMapStyle(mapStyle);
      //  map.setMapType(BMAP_HYBRID_MAP);


    
       // 添加图片叠加层
        var pStart = new BMap.Point(114.65,34.25);
        var pEnd = new BMap.Point(122.80,38.55);
        var bounds = new BMap.Bounds(pStart,pEnd);
        var imgOverlay = new BMap.GroundOverlay(bounds, {
            opacity: 0.6
        });
        imgOverlay.setImageURL("http://58.59.29.50:15004/sdfiles/griddata/yb/2021/02/24/temp/08/202102240800.png");
    //    imgOverlay.setImageURL(img);
        console.log(imgOverlay);
        map.addOverlay(imgOverlay);
        // while(imgOverlay.Pg){
        //     imgOverlay.Pg.style.height="100%"
        //     break
        // } 

        //地图风格
        // map.setMapStyle({
        //     styleJson:[{//道路清空
        //             "featureType": "road",
        //             "elementType": "all",
        //             "stylers": {
        //                 "visibility": "off"
        //             }
        //         },
        //         {//行政边界改变颜色
        //             "featureType": "boundary",
        //             "elementType": "all",
        //             "stylers": {
        //                 "color": "#3d85c6ff",
        //                 "visibility": "on"
        //         }
        //     }
        //   ]
        // });
        
        function CanvasLayer(t) {
            this.options = t || {}, this.paneName = this.options.paneName || "labelPane", this.zIndex = this.options.zIndex || 0, this._map = t.map, this._lastDrawTime = null, this.show()
        }
        CanvasLayer.prototype = new BMap.Overlay, CanvasLayer.prototype.initialize = function(t) {
            this._map = t;
            var a = this.canvas = document.createElement("canvas"),
                e = this.ctx = this.canvas.getContext("2d");
            a.style.cssText = "position:absolute;left:0;top:0;z-index:" + this.zIndex + ";", this.adjustSize(), this.adjustRatio(e), t.getPanes()[this.paneName].appendChild(a);
            var i = this;
            t.addEventListener("resize", function() {
                i.adjustSize(), i._draw()
            }), this.canvas
        }, CanvasLayer.prototype.adjustSize = function() {
            var t = this._map.getSize(),
                a = this.canvas;
            a.width = t.width, a.height = t.height, a.style.width = a.width + "px", a.style.height = a.height + "px"
        }, CanvasLayer.prototype.adjustRatio = function(t) {
            var a = t.backingStorePixelRatio || t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1,
                e = (window.devicePixelRatio || 1) / a,
                i = t.canvas.width,
                s = t.canvas.height;
            t.canvas.width = i * e, t.canvas.height = s * e, t.canvas.style.width = i + "px", t.canvas.style.height = s + "px", t.scale(e, e)
        }, CanvasLayer.prototype.draw = function() {
            var t = this;
            clearTimeout(t.timeoutID), t.timeoutID = setTimeout(function() {
                t._draw()
            }, 15)
        }, CanvasLayer.prototype._draw = function() {
            var t = this._map,
                a = t.getSize(),
                e = t.getCenter();
            if (e) {
                var i = t.pointToOverlayPixel(e);
                this.canvas.style.left = i.x - a.width / 2 + "px", this.canvas.style.top = i.y - a.height / 2 + "px", this.dispatchEvent("draw"), this.options.update && this.options.update.call(this)
            }
        }, CanvasLayer.prototype.getContainer = function() {
            return this.canvas
        }, CanvasLayer.prototype.show = function() {
            this.canvas || this._map.addOverlay(this), this.canvas.style.display = "block"
        }, CanvasLayer.prototype.hide = function() {
            this.canvas.style.display = "none"
        }, CanvasLayer.prototype.setZIndex = function(t) {
            this.canvas.style.zIndex = t
        }, CanvasLayer.prototype.getZIndex = function() {
            return this.zIndex
        };

        //风场图层
        var n = new CanvasLayer({
            map: map
        }),
        i = n.canvas;
        
        this.windTuceng = i;
        var r = {
            particle: {
                canvas: i,
                lineWidth: .6,
                lineColor: "#fff",
                densityRatio: .4,
                speedRatio: .5,
                lineRatio: .4,
                sizeRatio: .9
            },
            project: function(e) {
                var t = map.pointToPixel(new BMap.Point(e[1], e[0]));
                return [t.x, t.y]
            },
            invert: function(e) {
                var t = map.pixelToPoint(new BMap.Pixel(e[0], e[1]));
                return [t.lng, t.lat]
            }
        };
        i.style.backgroundColor="rgba(100, 100, 100, 0)"
        WeatherWind.config(r),
        function() {
            var a = {};
            return function(e, t) {
                var n = a[e];
                n ? t && t(n) : $.getJSON(e + "?" + Math.random(), function(n) {
                    a[e] = n, t && t(n)
                })
            }
        }(),
         map.addEventListener("tilesloaded", function() {
            WeatherWind.start()
        }),
        this.$axios({
            method: "get",
            url: "static/json/202102240800UV.json",// 这里填写请求数据的路径
            }).then(res => {
              WeatherWind.setData(res.data)
              WeatherWind.start()   
            }, err => {
              console.log(err);
        })
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