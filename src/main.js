// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { store } from './vuex/store.js' // 引入Vuex组件
import App from './App'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import axios from 'axios';

Vue.prototype.$axios=axios;

axios.defaults.baseURL = '/api'  //关键代码
// axios.defaults.withCredentials = false;
axios.defaults.headers.Authorization= 'Bearer '+ store.state.token;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

Vue.use(BaiduMap,{
    ak:"BQyvUhyMQOdezKh13gdjZ3en"
})
Vue.use(ElementUI, {
  size: 'small'
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
