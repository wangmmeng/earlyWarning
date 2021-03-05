<!-- 头部组件：包括标题、菜单 -->
<template>
	<div class="container">
		 <el-button class="headerBtn" :icon="headerIcon" type="primary" @click="headerChange" size="mini"></el-button>
		 <v-collapse>
			 <div class="header" v-show='headerShow'>			
				<div class="left">
					<div class="menu-line menu-left-line">
						<div class="line-div"></div>
					</div>
					<div class="menu">		
						<v-menu :menuData="leftItems"></v-menu>					
					</div>
				</div>

				<div class="title">
					<h1><img src="../../assets/image/logo.png">
					山东省突发事件预警信息支持系统
					</h1>           
					<div class="title-middle clearFloat">
						<div>{{currentTime}}</div>
						<div>
							<i class="el-icon-user-solid"></i>Admin
							&nbsp;&nbsp;
							<label @click="mapSet" style="cursor:pointer"><i class="el-icon-s-tools"></i>设置</label>
						</div>
					</div>
					<div class="line-bottom"></div>
				</div>

				<div class="right">
					<div class="menu-line menu-right-line">
						<div class="line-div"></div>
					</div>
					<div class="menu">
						<v-menu :menuData="rightItems"></v-menu>		 
					</div>
				</div>
			</div>
		 </v-collapse>		 
	</div>
</template>

<script>
import {DateGrid} from '../../api/date';
import vMenu from './Menu'
import vCollapse from './collapse';
export default {
    data(){
        return{
            currentTime:"",//当前时间
            activeIndex:"1",
			headerShow:true,
			headerIcon:"el-icon-arrow-down",
			leftItems: [
				 {
                    index: '1',
                    title: '预警数据',
					subs: [
					    {
					        index: 'dashboard',
					        title: '预警查询'
					    },
						{
						    index: '1-2',
						    title: '预警统计',
							subs:[
								{
									index: 'empty',
									title: '按发布数量'
								},
								{
									index: 'empty',
									title: '按发布单位'
								},
								{
									index: 'empty',
									title: '按时间类型'
								},
								{
									index: 'empty',
									title: '按预警级别'
								},
								{
									index: 'empty',
									title: '按影响区域'
								},
								{
									index: 'empty',
									title: '按发布时间'
								},
							]
						}
					]
                },
				{
					index: '2'
				},
				{
					index: '3',
                    title: '气象数据',
					subs:[
						{
							index: '3-1',
							title: '实况数据',
							subs:[
								{
									index: 'map',
									title: '气象站数据',
								},
								{
									index: 'map',
									title: '格点实况数据',
								}
							]
						},
						{
							index: '3-2',
							title: '预报数据',
							subs:[
								{
									index: 'map',
									title: '站点预报',
								},
								{
									index: 'map',
									title: '格点预报',
								}
							]
						},
						{
							index: 'empty',
							title: '雷达风场'							
						},
						{
							index: 'empty',
							title: '卫星云图'							
						},
						{
							index: 'empty',
							title: '台风路径'							
						}					
					]
				}
			],
			rightItems: [
				 {
                    index: '1',
                    title: '历史灾害',
					subs: [
					    {
					        index: 'empty',
					        title: '历史灾害数据'
					    },
						{
					        index: 'empty',
					        title: '历史灾害分析'
					    }						
					]
                },
				{
					index: '2'
				},
				{
					index: '3',
                    title: '风险等级评估',
					subs:[					
						{
							index: 'empty',
							title: '类型配置'							
						},
						{
							index: 'empty',
							title: '专题产品'							
						},
						{
							index: 'empty',
							title: '重点行业部门'							
						},
						{
							index: 'empty',
							title: '重点区域地点'							
						}					
					]
				}
			]
        }
    },
	components: {
		vMenu,
		vCollapse
	},
    created() {//在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
		this.currentTime=DateGrid(new Date(),"yyyy-MM-dd")+" "+DateGrid(new Date(),"ww")
    },
    mounted(){//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作

    },
    methods:{
		onRoutes(e){
			if(e.target.getAttribute("data-index")){
				this.$router.replace('/'+e.target.getAttribute("data-index"))
			}			
		},
        handleSelect(){

        },
        mapSet(){
            this.$store.state.mapSetShow=!this.$store.state.mapSetShow
        },
		headerChange(){
			this.headerShow=!this.headerShow
			if(this.headerIcon=="el-icon-arrow-down"){
				this.headerIcon="el-icon-arrow-up"
			}else{
				this.headerIcon="el-icon-arrow-down"
			}
		}
    }
}
</script>

<style scoped>
    .container{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100px;        
		z-index: 999;
    }
	.headerBtn{
      position: absolute;
      top:0;
      right:0;
      z-index:1;
	  padding: 3px 5px;
    }
	.header{
		position: relative;
		width: 100%;
    	height: 100%;
		background:rgba(0,0,0,0.5);
	}
	.hShow{
		transition :all 0.3s ease-in;
	}
	.hClose{
		height :0;
		transition:all 0.3s ease-out;
	}
    .left,.right{
        width:calc((100% - 450px) / 2);
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
        color:#fff;
        width:400px;
        height:100%;
        box-sizing: border-box;
        top:0;
        left:50%;
        padding:10px 0;
        transform: translateX(-50%);
    }
    .title>h1{
        font-size:1.5em;
        text-align: center;
        margin-bottom: 5px;
    }
    .title>h1>img{
        width:45px;
        vertical-align: middle;
    }
    .title>.line-bottom{
        width:100%;
        border-bottom:1px solid #fff;
        box-shadow: 0 0 5px 2px rgb(19,88,151);
        position: absolute;
        bottom: 20px;
    }
    .title>div.title-middle{
        font-size:12px;
    }
    .title>div.title-middle>div:first-of-type{
        float:left;
    }
    .title>div.title-middle>div:last-of-type{
        float:right;
    }
    .left>.menu{
        position: absolute;
        bottom:3px;
        right:0;
        font-size: 12px;
    }
    .right>.menu{
        position: absolute;
        bottom:3px;
        left:0;
        font-size: 12px;
    }
    
    .menu-line{
        position: absolute;
        width:100%;
        top:60%;
        transform: translateY(-50%);
        border-bottom:1px solid #fff;
        box-shadow: 0 0 5px 2px rgb(19,88,151);
    }
    .menu-left-line{
        left:0;
    }
    .menu-left-line>.line-div{
        right:-28px;
        top:10px;
        -webkit-transform: rotate(40deg);
        -moz-transform: rotate(40deg);
    }
    .menu-right-line{
        right:0;
    }
    .menu-right-line>.line-div{
        left:-28px;
        top:10px;
        -webkit-transform: rotate(-40deg);
        -moz-transform: rotate(-40deg);
    }
    .line-div{
        width: 30px;
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