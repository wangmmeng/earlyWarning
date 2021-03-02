<!--地图组件：包括对地图区域边界的设置、地图类型的切换-->
<template>
    <div class="wrapper">
        <div id="setting" v-show="mapSetShow">
            地图设置
        </div>
        <div id="station">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="站点选择" name="1">
                   <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="站点类型">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="国家站" name="type"></el-checkbox>
                                <el-checkbox label="区域站" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="节点层级">
                            <el-radio-group v-model="form.region">
                                <el-radio label="市"></el-radio>
                                <el-radio label="县"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="选择方式">
                            <el-radio-group v-model="form.way">
                                <el-radio label="多选"></el-radio>
                                <el-radio label="单选"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="站点查询">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-input v-model="form.name" placeholder="请输入站点名称"></el-input>
                                </el-col>
                                <el-col :span="8">
                                    <el-button type="primary" @click="onSubmit">查询</el-button>
                                </el-col>     
                            </el-row>                                          
                        </el-form-item>              
                    </el-form>
                    <p>已选择站点：84/84</p>
                    <el-tree
                        :data="data"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="tree"
                        highlight-current
                        :props="defaultProps">
                    </el-tree>
                </el-collapse-item>
                <el-collapse-item title="参数设置" name="2">
                    <el-form ref="form1" :model="form" label-width="80px">
                        <el-form-item label="数据类型">
                            <el-radio-group v-model="form1.type">
                                <el-radio label="年"></el-radio>
                                <el-radio label="季"></el-radio>
                                <el-radio label="月"></el-radio>
                                <el-radio label="旬"></el-radio>
                                <el-radio label="周"></el-radio>
                                <el-radio label="日"></el-radio>
                                <el-radio label="时"></el-radio>
                            </el-radio-group>                           
                        </el-form-item>
                        <el-form-item label="时间范围">
                            <el-date-picker
                                v-model="form1.date"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="查询类型">
                            <el-radio-group v-model="form1.way">
                                <el-radio label="逐日查询"></el-radio>
                                <el-radio label="时段统计"></el-radio>
                            </el-radio-group>
                        </el-form-item>                                   
                    </el-form>
                </el-collapse-item>
                <el-collapse-item title="要素管理" name="3">
                    <el-radio-group v-model="radio">
                        <el-radio :label="3">多要素</el-radio>
                        <el-radio :label="6">单要素</el-radio>
                    </el-radio-group>
                     <el-tree
                        :data="data"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="tree"
                        highlight-current
                        :props="defaultProps">
                    </el-tree>
                </el-collapse-item>               
            </el-collapse>
        </div>
        <baidu-map id="map" center="山东省" :scroll-wheel-zoom="true" :zoom="8" @ready="handler">       
            <bm-boundary name="山东省济南市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省潍坊市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省烟台市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省青岛市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省淄博市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省枣庄市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省东营市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省济宁市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省泰安市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省威海市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省日照市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省临沂市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省聊城市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省德州市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省滨州市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
            <bm-boundary name="山东省菏泽市" :strokeWeight="2" strokeColor="#fff" fillColor=""></bm-boundary>
        </baidu-map>
  </div>
</template>

<script>
import {WeatherWind} from "./weatherwind"
export default {
   data() {
        return {
            markerPoint:{lng: 116.404, lat: 39.915},
            windTuceng:null,//风场图层

            form: {
                name: '',
                region: '市',
                way: '多选',
                type: ["国家站"]
            },
            form1: {
                type: '年',
                way: '逐日查询',
                date: ""
            },
            radio: 3,
             data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
                }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],  
        };
  },
  created() {//在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
	 this.getAllStation()
  },
  mounted() {
  
  },
  computed: {
    mapSetShow () {
      return this.$store.state.mapSetShow
    }
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

      //  map.setBounds(bounds);

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
    },
    //获取所有站点
    getAllStation(){       
        this.$axios.post('/findAllStation',{
             params: {  
                 
           //     token:this.$store.state.token,
                code:370000
            }
        }).then(response => {
            console.log(response)
            if (response.data) {
               console.log(response.data)
            }
        }).catch(err => {
            alert(err)
        })
    }
  },
}
</script>
<style scoped>
    /*地图*/
    #map{
        width:100%;
        height:100%;
    }
    /*地图设置*/
    #setting{
        position: absolute;
        top:100px;
        right:0;
        height:calc(100% - 120px);
        background:#fff;
        width:200px;
        z-index:1;
        color:#000;
    }
    /*气象站*/
    #station{
        position: absolute;
        top:100px;
        left:0;
        max-height:calc(100% - 120px);
        overflow: auto;
        z-index:1;
        padding: 0 15px;
        background: #fff;
    }
</style>