import Vue from 'vue'
import { store } from './vuex/store.js' // 引入Vuex组件
import App from './App'
import router from './router'  //引入Router路由
import ElementUI from 'element-ui' //引入element-ui
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import axios from 'axios'; //引入axios用于调用接口获取数据
import L from "leaflet" //引入leaflet
import "leaflet/dist/leaflet.css"
import 'leaflet-velocity/dist/leaflet-velocity.css'//leaflet风场
import 'leaflet-velocity/dist/leaflet-velocity'
import 'proj4/dist/proj4-src'//leaflet加载百度地图时需要
import 'proj4leaflet/src/proj4leaflet'
import 'leaflet-canvas-marker'//leaflet海量点

// 引入 leaflet.markercluster 聚合点和非聚合点
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet.markercluster"

Vue.use(ElementUI, {
	size: 'small'
});
import {DatePicker} from 'element-ui'
Vue.component(DatePicker.name, DatePicker)

Vue.prototype.$axios=axios;
axios.defaults.headers.Authorization=store.state.token;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  data: {
    eventHub: new Vue(),
    charts: []
  },
  template: '<App/>'
})
