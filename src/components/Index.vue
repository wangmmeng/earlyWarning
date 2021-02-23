<template>
    <div class="main">
      <v-map></v-map>
      <v-header></v-header>
    </div>
</template>

<script>
import vMap from './common/Map.vue';
import vHeader from './common/Header.vue';
export default {
  components: {
	      vMap,	//地图组件
        vHeader//头部	
	    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only(添加“scoped”属性以将CSS仅限于此组件) -->
<style scoped>
    .main{
      width:100%;
      height:100%;
    }
</style>
