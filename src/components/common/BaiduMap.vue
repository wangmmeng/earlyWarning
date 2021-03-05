<!--地图组件：包括对地图区域边界的设置、地图类型的切换-->
<template>
    <div class="wrapper">
        <v-setting v-show="mapSetShow"></v-setting>
		<v-station></v-station>
        <div id="map"></div>
  </div>
</template>

<script>
import vStation from '../page/MapData/station'
import vSetting from '../page/MapData/settings'
import {WeatherWind} from "../../api/weatherwind"
export default {
	components: {
		vStation,
		vSetting
	},
   data() {
        return {
			headerShow:true,
            map:null,
            markerPoint:{lng: 116.404, lat: 39.915},
            windTuceng:null,//风场图层
            stationArray:[],//站点数据
            stationOverlayGJ:null,
            stationOverlayQY:null,
            regionArray:[],//地级市数据
        };
  },
  created() {//在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
	
  },
  mounted() {
      this.initMap();
   //   this.getApiToken();//获取token
  },
  methods: {
    initMap(){
        let map =new BMap.Map('map'); // 创建Map实例
        this.map=map;
        map.centerAndZoom(new BMap.Point(118.72,36.47), 8);// 初始化地图,设置中心点坐标和地图级别
        map.setCurrentCity("山东");// 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

        var bdary = new BMap.Boundary();
        bdary.get("山东省", function(rs){       //获取行政区域    
            var count = rs.boundaries.length; //行政区域的点有多少个
            for(var i = 0; i < count; i++){
                var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#fff",fillColor:"",enableMassClear:false}); //建立多边形覆盖物
                map.addOverlay(ply);  //添加覆盖物               
            }        
        }); 
        
        this.getBoundary();

        map.setMapStyle({
            styleJson:
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
          },
		  {
				"featureType": "districtlabel",
				"elementType": "labels.text.stroke",
				"stylers": {
						"color": "#ffffff00",
						"visibility": "on"
				}
			},
			{
				"featureType": "districtlabel",
				"elementType": "labels.icon",
				"stylers": {
							"color": "#ffffff00",
							"visibility": "off"
				}
			}
        ]
        });
    },
    //设置地级市或县的边界数据
    getBoundary(){
        this.$axios.get('/shandong/regionInfoController.do?findAll').then(response => {
            if (response.data) {
               if(response.data.o){
                 this.regionArray=response.data.o;
                 let _this=this;
                 for(var i=0;i<this.regionArray.length;i++){
                    let {level,city}=this.regionArray[i];
                    if(level!=2){
                        continue
                    }
                    var bdary = new BMap.Boundary();
                    bdary.get("山东省"+city, function(rs){       //获取行政区域    
                        var count = rs.boundaries.length; //行政区域的点有多少个
                        for(var i = 0; i < count; i++){
                            var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 1, strokeColor: "#fff",fillColor:"",enableMassClear:false}); //建立多边形覆盖物
                            _this.map.addOverlay(ply);  //添加覆盖物                                       
                        }        
                    });   
                 }                 
               }              
            }
        }).catch(err => {
            console.log(err)
        })
    },
    // 给地图设置主题色，我设置的是黑夜主题
    handler({BMap,map}) {
    
      //  map.setMapType(BMAP_HYBRID_MAP);
        
    
        // let mapStyle={style:"midnight"}
        // map.setMapStyle(mapStyle);
      //  map.setMapType(BMAP_HYBRID_MAP);


    
       // 添加图片叠加层
        var pStart = new BMap.Point(114.65,34.25);
        var pEnd = new BMap.Point(122.80,38.55);
        var bounds = new BMap.Bounds(pStart,pEnd);

      //  map.setBounds(bounds);

        var imgOverlay = new BMap.GroundOverlay(bounds, {
            opacity: 0.6
        });

        imgOverlay.setImageURL("http://58.59.29.50:15004/sdfiles/griddata/yb/2021/02/24/temp/08/202102240800.png");
    //    imgOverlay.setImageURL(img);
    //    map.addOverlay(imgOverlay);

        return
        
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
            url: "./static/json/202102240800UV.json",// 这里填写请求数据的路径
            }).then(res => {
              WeatherWind.setData(res.data)
              WeatherWind.start()   
            }, err => {
              console.log(err);
        })
    },
    getApiToken(){
      this.$axios.get('/shandongt/commonController.do?getToken').then(response => {
            if (response.data) {
               if(response.data.o){
                 this.$store.state.apiToken=response.data.o;
                 this.getAllStation();
               }              
            }
        }).catch(err => {
            console.log(err)
        })
    },
    //获取所有站点
    getAllStation(){   
        this.$axios.get('/api/findAllStation?code=370000&token='+this.$store.state.apiToken).then(response => {
            if (response.data) {
               this.stationArray=response.data;
               this.showStation();
            }
        }).catch(err => {
            console.log(err)
        })
    },
    //地图上显示站点位置
    showStation(){
        this.map.clearOverlays();
        var pointsGJ=[];
        var pointsQY=[];
        for(let i=0;i<this.stationArray.length;i++){
            let {lat,lon,name,station_id_c:sid}=this.stationArray[i];
            let new_point = new BMap.Point(lon, lat);
            if(sid.substr(0,1)=="5"){//国家站
                pointsGJ.push(new_point)
            }else{//区域站
                pointsQY.push(new_point)
            }
        }
        var optionsGJ = {
            size: BMAP_POINT_SIZE_SMALL,
            shape: BMAP_POINT_SHAPE_CIRCLE,//点样式
            color: '#0F0'
        }
        var optionsQY = {
            size: BMAP_POINT_SIZE_SMALL,
            shape: BMAP_POINT_SHAPE_CIRCLE,//点样式
            color: '#fdfe00'
        }
        this.stationOverlayGJ = new BMap.PointCollection(pointsGJ, optionsGJ);  // 初始化PointCollection
        this.stationOverlayGJ.addEventListener('click', function (e){
            alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
        });
        this.stationOverlayQY = new BMap.PointCollection(pointsQY, optionsQY);  // 初始化PointCollection
        this.stationOverlayQY.addEventListener('click', function (e){
            alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
        });
       if(this.stationForm.type.includes("国家站")){
            this.map.addOverlay(this.stationOverlayGJ);  // 添加Overlay
        }
        if(this.stationForm.type.includes("区域站")){
            this.map.addOverlay(this.stationOverlayQY);  // 添加Overlay
        }
    }
  }
}
</script>
<style scoped>
    /*地图*/
    #map{
        width:100%;
        height:100%;
    }
</style>