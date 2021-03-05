<template>
	<div class="wrapper">
		<v-setting v-show="this.$store.state.mapSetShow"></v-setting>
		<v-station></v-station>
		<div id="map"></div>
	</div>
</template>

<script>
import vStation from '../page/MapData/station'
import vSetting from '../page/MapData/settings'
import stationIcon from '../../assets/image/station.png'
export default {
	components: {
		vStation,
		vSetting
	},
	data(){
		return{
			map:null,
			regionArray:null,
			windData:null,
			bounds : L.latLngBounds(L.latLng(34.25, 114.65),  L.latLng(38.55, 122.8)),
			stationArray:[]			
		}
	},
	created(){
		// let _this=this;
		// this.$axios.get('./static/json/2021020210UV.json').then(response => {
		// 	_this.windData=response.data;
		// 	_this.initMap();
		// }).catch(err => {
		// 	console.log(err)
		// })
	},
	mounted(){
		this.initMap();
	},
	methods:{
		initMap() {//初始化地图
			// 百度地图crs
			var crs = new L.Proj.CRS('EPSG:3395', '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs', {
				resolutions: function () {
					let level = 19;
					var res = [];
					res[0] = Math.pow(2, 18);
					for (var i = 1; i < level; i++) {
					res[i] = Math.pow(2, (18 - i))
					}
					return res;
				}(), origin: [0, 0], bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
			});
			//风场样式引用
			var Esri_DarkGreyCanvas = L.tileLayer(
				"http://{s}.sm.mapstack.stamen.com/" +
				"(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
				"{z}/{x}/{y}.png",
			);
			// //生成风场实例
			// var velocityLayer = L.velocityLayer({
			// 		displayValues: true,
			// 		displayOptions: {
			// 			velocityType: 'GBR Wind',
			// 			displayPosition: 'bottomleft',
			// 			displayEmptyString: 'No wind data'
			// 		},
			// 		data: this.windData,//风场数据
			// 		minVelocity: 0, //Velocity：速率
			// 		maxVelocity: 10,
			// 		velocityScale: 0.005,
			// 		particleMultiplier: 1 / 1200,//粒子的数量
			// 		lineWidth: 3,                     //粒子的粗细
			// 		frameRate: 15,                      //定义每秒执行的次数
			// 		colorScale: ["rgb(47,112,47)","rgb(47,112,47)","rgb(47,112,47)","rgb(47,112,47)","rgb(47,112,47)"]
			// 	});

			this.map = L.map("map", {
				minZoom: 3,
				maxZoom: 14,
				center: [39.550339, 116.114129],
				zoom: 12,
				zoomControl: false,
				attributionControl: false,
				crs:crs
			//	crs: L.CRS.EPSG3857,//leaflet默认使用的坐标系，可以引入高德、谷歌、天地图，不需要转化，但是使用百度地图坐标系需要转化
			//	zoomSnap : 0.1
			});
			// 风场实例添加到地图上
   		//	velocityLayer.addTo(this.map)

			this.map._controlCorners.bottomright.remove(); // 去掉右下角leaflet标识

			//蓝色系百度地图
			// new L.TileLayer('http://api2.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20170803&'
    		// +'scale=1&ak=BQyvUhyMQOdezKh13gdjZ3en&styles=t%3Awater%7Ce%3Aall%7Cv%3Aon%7Cc%3A%23044161ff%2Ct%3Aland%7Ce%3Aall%7Cv%3Aon%7Cc%3A%23004981ff%2Ct%3Alabel%7Ce%3Al.t.f%7Cv%3Aon%7Cc%3A%23ffffffff%2Ct%3Alabel%7Ce%3Al.t.s%7Cv%3Aon%7Cc%3Argba(0%2C0%2C0%2C0)%2Ct%3Aroad%7Ce%3Aall%7Cv%3Aoff%2Ct%3Alabel%7Ce%3Al.t.s%7Cc%3A%23ffffff00', {
    		// 	maxZoom: 18,
    		// 	minZoom: 4,
    		// 	subdomains: [0,1,2],
    		// 	tms: true,
    		// }).addTo(this.map);
			
			//黑色系百度地图
			new L.TileLayer('http://api2.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20170803&'
    		+'scale=1&ak=BQyvUhyMQOdezKh13gdjZ3en&styles=t%3Awater%7Ce%3Aall%7Cv%3Aon%7Cc%3A%23575757ff%2Ct%3Aland%7Ce%3Aall%7Cv%3Aon%7Cc%3A%233b3b3bff%2Ct%3Alabel%7Ce%3Al.t.f%7Cv%3Aon%7Cc%3A%23ffffffff%2Ct%3Aroad%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aboundary%7Ce%3Aall%7Cv%3Aon%7Cc%3A%238f8f8fff%2Ct%3Alabel%7Ce%3Al.t.s%7Cv%3Aon%7Cc%3A%23ffffff00%2Ct%3Alabel%7Ce%3Al.i%7Cv%3Aoff%7Cc%3A%23ffffff00', {
    			maxZoom: 18,
    			minZoom: 4,
    			subdomains: [0,1,2],
    			tms: true,
    		}).addTo(this.map);

			this.map.invalidateSize();
			this.map.fitBounds(this.bounds);//将地图显示到范围位置

			this.getBoundary()//边界线
			//this.getApiToken();//获取token			
		},
		getApiToken(){
			this.$axios.get('/shandongt/commonController.do?getToken').then(response => {
				if (response.data) {
					if(response.data.o){
						this.$store.state.apiToken=response.data.o;
						this.getStation()//站点
					}              
				}
			}).catch(err => {
				console.log(err)
			})
		},
		getBoundary(){//边界线
			this.$axios.get('./static/json/map/山东省.json').then(response => {
				if (response.data) {
					if(response.data.features){
						this.regionArray=response.data.features;
						for(var i=0;i<this.regionArray.length;i++){
							let {properties,geometry}=this.regionArray[i];							
							L.geoJson(geometry, {
								color : "#409EFF",
								fillColor : "rgba(255,255,255,0.5)",
								weight : 2,
								fill : true,
								zIndex : 0,
								pane : "shadowPane"
							}).addTo(this.map)
						}                 
					}              
				}
			}).catch(err => {
				console.log(err)
			})
		},
		getStation(){
			this.$axios.get('/api/findAllStation?code=370000&token='+this.$store.state.apiToken).then(response => {
				if (response.data) {
					this.stationArray=response.data;
					this.showStation();
				}
			}).catch(err => {
				console.log(err)
			})
		},
		showStation(){
			var json = {
				"type": "FeatureCollection",
				"features": []
			};
			var valLayerMarker = L.canvasIconLayer({}).addTo(this.map);
			var markers = [];
			for(let i=0;i<this.stationArray.length;i++){
				let {lat,lon,name,station_id_c:sid}=this.stationArray[i];
				if(sid.charAt(0)=="5"){//国家站
					json.features.push({
						"type": "Feature",
						"geometry": {
							"type": "Point",
							"coordinates": [lon,lat]
						},
						"properties" : this.stationArray[i],
					});
				}else{
					var latlon=[lat,lon];
					var marker=L.marker(latlon, {
						icon : L.divIcon({
							className : "aaaa",
							iconUrl : stationIcon,
							iconSize: [20, 20],
							iconAnchor: [10, 10],
						})
					});
					markers.push(marker);
				}				
			}
			valLayerMarker.addLayers(markers);

			var station = L.markerClusterGroup();			
			station = L.geoJson(json, {pointToLayer: function(data, latlng){
				var html = "<span class='stationId'>" + data.properties.station_id_c +  "</span>" +
				"<span class='stationName'>" + data.properties.name +  "</span>" +
				"<span class='stationPoint'></span>" +
				"<span class='stationVal'></span>";
				
				return L.marker(latlng, {
					icon : L.divIcon({
						html: html,
						iconSize: [40, 40],
						iconAnchor: [20, 20],
						className : "stationIcon"
					})
				}).bindTooltip(data.properties.name, {sticky:true}).on("click", function(ev){
					// if(stationShiKuangConfig.ONOFFSTATE){
					// 	changguishujuConsole.getStationInfo(data.properties, ev);	
					// }else{
					// 	return
					// }
				})
			}})
			station.addTo(this.map)
		}
	}
}
</script>

<style scoped>
	#map{
		width:100%;
		height:100%;
		background:transparent;
	}
	div /deep/ .stationIcon {
		color: #ccc;
		white-space: nowrap;
		font-size: 12px;
	}
	div /deep/ .stationIcon .stationId {
		display: none;
		position: absolute;
		top: 25px;
		left: 50%;
		transform: translateX(-50%);
	}
	div /deep/ .stationIcon .stationName {
		display: inline-block;
		position: absolute;
		top: 25px;
		left: 50%;
		transform: translateX(-50%);
	}
	div /deep/ .stationIcon .stationPoint {
		width: 10px;
		height: 10px;
		position: relative;
		left: 15px;
		top: 15px;
		background: #fdfe00;
		display: inline-block;
		border-radius: 99px;
		border: 1px solid #000;
	}
</style>