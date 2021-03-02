<template>
    <div class="wrapper">
      <v-map v-show="mapShow"></v-map>
      <v-header v-show="headerShow"></v-header>
      <el-button class="headerBtn" type="primary" @click="headerChange">显示隐藏</el-button>
      <footer>主办单位：山东省气象服务中心&nbsp;&nbsp;&nbsp;&nbsp;技术支持：杞人气象科技服务（北京）有限公司</footer>
    </div>
</template>

<script>
import vMap from './common/Map.vue';
import vHeader from './common/Header.vue';
export default {
  data(){
    return {
        mapShow:true,
        headerShow:true
    }
  },
  components: {
      vMap,	//地图组件
      vHeader//头部	
  },
  methods:{
    headerChange(){
      this.headerShow=!this.headerShow
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only(添加“scoped”属性以将CSS仅限于此组件) -->
<style scoped>
    .wrapper{
      width:100%;
      height:100%;
      background-image: url("../assets/image/bg.jpg");
      background-size:100% 100%;
    }
    .headerBtn{
      position: absolute;
      top:0;
      right:0;
      z-index:1;
    }
    footer{
      position: absolute;
      bottom:0;
      width:100%;
      z-index:1;
      background:#123160;
      color:#fff;
      text-align: center;
      font-size:12px;
      height:20px;
      line-height: 20px;
    }
</style>
