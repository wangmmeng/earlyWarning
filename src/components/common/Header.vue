<!-- 头部组件：包括标题、菜单 -->
<template>
    <div class="header">
        <div class="left">
            <div class="menu-line menu-left-line">
                <div class="line-div"></div>
            </div>
            <div class="menu">
                <el-menu
                    :default-active="activeIndex1"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#1c5d9a"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">预警数据</template>
                        <el-menu-item index="1-1">预警查询</el-menu-item>
                        <el-submenu index="1-2">
                            <template slot="title">预警统计</template>
                            <el-menu-item index="1-2-1">按发布数量</el-menu-item>
                            <el-menu-item index="1-2-2">按发布单位</el-menu-item>
                            <el-menu-item index="1-2-3">按时间类型</el-menu-item>
                            <el-menu-item index="1-2-4">按预警级别</el-menu-item>
                            <el-menu-item index="1-2-5">按影响区域</el-menu-item>
                            <el-menu-item index="1-2-6">按发布时间</el-menu-item>
                        </el-submenu>                       
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">气象数据</template>
                        <el-submenu index="2-1">
                            <template slot="title">实况数据</template>
                            <el-menu-item index="2-1-1">气象站数据</el-menu-item>
                            <el-menu-item index="2-1-2">格点实况数据</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2-2">
                            <template slot="title">预报数据</template>
                            <el-menu-item index="2-2-1">站点预报</el-menu-item>
                            <el-menu-item index="2-2-2">格点预报</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="2-3">雷达风场</el-menu-item>
                        <el-menu-item index="2-4">卫星云图</el-menu-item>
                        <el-menu-item index="2-5">台风路径</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </div>

        <div class="title">
            <img src="../../assets/image/logo.png">
            山东省预警信息展示平台
            <div class="line-bottom"></div>
        </div>

        <div class="right">
             <div class="menu-line menu-right-line">
                <div class="line-div"></div>
            </div>
             <div class="menu">
                <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#1c5d9a"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">历史灾害</template>
                        <el-menu-item index="1-1">历史灾害数据</el-menu-item>
                        <el-menu-item index="1-2">历史灾害分析</el-menu-item>                                         
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">风险等级评估</template>
                        <el-menu-item index="2-1">类型配置</el-menu-item>
                        <el-menu-item index="2-2">专题产品</el-menu-item>                       
                        <el-menu-item index="2-3">重点行业部门</el-menu-item>
                        <el-menu-item index="2-4">重点区域地点</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            activeIndex1:"1",
            activeIndex2:"1"
        }
    },
    methods:{
        handleSelect(){

        }
    }
}
</script>

<style scoped>
    .header{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:80px;
        background:rgba(0,0,0,0.5);
    }
    .left,.right{
        width:calc((100% - 400px) / 2);
        height:100%;
        position: absolute;
    }
    .left{
        left:0;
    }
    .right{
        right:0;
    }
    .title{
        position: absolute;
        text-align: center;
        color:#fff;
        padding:10px;
        width:350px;
        box-sizing: border-box;
        font-size:1.5em;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .title>img{
        width:50px;
        vertical-align: middle;
    }
    .title>.line-bottom{
        width:100%;
        border-bottom:1px solid #fff;
        box-shadow: 0 0 5px 2px rgb(19,88,151);
        margin:0 auto;
        margin-top:10px;
    }
    .left>.menu{
        position: absolute;
        bottom:0;
        right:0;
        /* bottom: 6px;
        border: 6px solid transparent;
        border-image: url(../../assets/image/main_top_btn_bj.png) 8 0 8 0 fill; */
    }
    .right>.menu{
        position: absolute;
        bottom:0;
        left:0;
    }
    
    .menu-line{
        position: absolute;
        width:100%;
        top:50%;
        transform: translateY(-50%);
        border-bottom:1px solid #fff;
        box-shadow: 0 0 5px 2px rgb(19,88,151);
    }
    .menu-left-line{
        left:0;
    }
    .menu-left-line>.line-div{
        right:-40px;
        top:15px;
        -webkit-transform: rotate(40deg);
        -moz-transform: rotate(40deg);
    }
    .menu-right-line{
        right:0;
    }
    .menu-right-line>.line-div{
        left:-40px;
        top:15px;
        -webkit-transform: rotate(-40deg);
        -moz-transform: rotate(-40deg);
    }
    .line-div{
        width: 45px;
        border-bottom: 1px solid #fff;
        box-shadow: 0 0 5px 2px rgb(19,88,151);
        position: absolute;
        text-align: center;
        -webkit-transform: rotate(25deg);
        -moz-transform: rotate(25deg);
        filter: progid:DXImageTransform.Microsoft.BasicImage(Rotation=0.45);
    }
    div /deep/ .el-menu.el-menu--horizontal{
        border-bottom:0;
    }
    div /deep/ .el-menu--horizontal>.el-submenu .el-submenu__title{
        height:40px;
        line-height: 40px;
    }
</style>