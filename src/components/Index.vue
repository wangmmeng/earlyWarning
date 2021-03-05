<template>
    <div class="wrapper">
      <v-header></v-header>
	  <router-view></router-view>
      <footer>主办单位：山东省气象服务中心&nbsp;&nbsp;&nbsp;&nbsp;技术支持：杞人气象科技服务（北京）有限公司</footer>
    </div>
</template>

<script>
import vHeader from './common/Header.vue';
export default {
  data(){
    return {
       
    }
  },
  components: {
      vHeader//头部	
  },
  methods:{
    
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only(添加“scoped”属性以将CSS仅限于此组件) -->
<style scoped>
    .wrapper{
      width:100%;
      height:100%;
      background-image: url("../../static/img/bg.jpg");
      background-size:100% 100%;
    }
    footer{
      position: absolute;
      bottom:0;
      width:100%;
      z-index:999;
      background:#123160;
      color:#fff;
      text-align: center;
      font-size:12px;
      height:20px;
      line-height: 20px;
    }
</style>
