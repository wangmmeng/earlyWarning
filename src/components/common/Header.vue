<!-- 头部组件：包括标题、菜单 -->
<template>
    <div class="header">
        <div class="left">
            <div class="menu-line menu-left-line">
                <div class="line-div"></div>
            </div>
            <div class="menu">
                <ul class="mapTopShowType clearFloat">
					<li data-type="预警数据">
						<p class="mainTopBtnListTitle" data-lang="mainMenu">预警数据</p>
						<ul class="mainTopBtnList">
							<li class="mainTopBtn mainTopBtnListInfo" data-type="预警查询" data-lang="mainMenu">预警查询</li>					
							<li class="mainTopBtnLi" data-type="预警统计">
								<p class="mainTopBtnListInfo" data-lang="mainMenu">预警统计</p>
								<ul class="mainTopBtnListLeft">
									<li class="mainTopBtn mainTopBtnListInfo" data-type="按发布数量" data-lang="mainMenu">按发布数量</li>
									<li class="mainTopBtn mainTopBtnListInfo" data-type="按发布单位" data-lang="mainMenu">按发布单位</li>
									<li class="mainTopBtn mainTopBtnListInfo" data-type="按时间类型" data-lang="mainMenu">按时间类型</li>
									<li class="mainTopBtn mainTopBtnListInfo" data-type="按预警级别" data-lang="mainMenu">按预警级别</li>
                                    <li class="mainTopBtn mainTopBtnListInfo" data-type="按影响区域" data-lang="mainMenu">按影响区域</li>
                                    <li class="mainTopBtn mainTopBtnListInfo" data-type="按发布时间" data-lang="mainMenu">按发布时间</li>
								</ul>
							</li>
						</ul>
					</li>
					<li><span class="line_separator"></span></li>
					<li data-type="气象数据">
						<p class="mainTopBtnListTitle" data-lang="mainMenu">气象数据</p>
						<ul class="mainTopBtnList">
                            <li class="mainTopBtnLi" data-type="实况数据">
								<p class="mainTopBtnListInfo" data-lang="mainMenu">实况数据</p>
								<ul class="mainTopBtnListLeft">
									<li class="mainTopBtn mainTopBtnListInfo" data-type="气象站数据" data-lang="mainMenu">气象站数据</li>
									<li class="mainTopBtn mainTopBtnListInfo" data-type="格点实况数据" data-lang="mainMenu">格点实况数据</li>
								</ul>
							</li>
                            <li class="mainTopBtnLi" data-type="预报数据">
								<p class="mainTopBtnListInfo" data-lang="mainMenu">预报数据</p>
								<ul class="mainTopBtnListLeft">
									<li class="mainTopBtn mainTopBtnListInfo" data-type="站点预报" data-lang="mainMenu">站点预报</li>
									<li class="mainTopBtn mainTopBtnListInfo" data-type="格点预报" data-lang="mainMenu">格点预报</li>
								</ul>
							</li>
							<li class="mainTopBtn mainTopBtnListInfo" data-type="雷达风场" data-lang="mainMenu">雷达风场</li>
							<li class="mainTopBtn mainTopBtnListInfo" data-type="卫星云图" data-lang="mainMenu">卫星云图</li>
							<li class="mainTopBtn mainTopBtnListInfo" data-type="台风路径" data-lang="mainMenu">台风路径</li>
							
						</ul>
					</li>
				</ul>           
            </div>
        </div>

        <div class="title">
            <h1><img src="../../assets/image/logo.png">
             山东省突发事件预警信息支持系统
            </h1>           
            <div class="title-middle clearFloat">
                <div>2021-02-25 周四</div>
                <div>
                    <i class="el-icon-user-solid"></i>Admin
                    &nbsp;&nbsp;
                    <i class="el-icon-s-tools"></i>设置
                </div>
            </div>
            <div class="line-bottom"></div>
        </div>

        <div class="right">
             <div class="menu-line menu-right-line">
                <div class="line-div"></div>
            </div>
             <div class="menu">
                 <ul class="mapTopShowType clearFloat">
					<li data-type="历史灾害">
						<p class="mainTopBtnListTitle" data-lang="mainMenu">历史灾害</p>
						<ul class="mainTopBtnList">
							<li class="mainTopBtn mainTopBtnListInfo" data-type="历史灾害数据" data-lang="mainMenu">历史灾害数据</li>
                            <li class="mainTopBtn mainTopBtnListInfo" data-type="历史灾害分析" data-lang="mainMenu">历史灾害分析</li>
                        </ul>
					</li>
					<li><span class="line_separator"></span></li>
					<li data-type="风险等级评估">
						<p class="mainTopBtnListTitle" data-lang="mainMenu">风险等级评估</p>
						<ul class="mainTopBtnList">                            
							<li class="mainTopBtn mainTopBtnListInfo" data-type="类型配置" data-lang="mainMenu">类型配置</li>
							<li class="mainTopBtn mainTopBtnListInfo" data-type="专题产品" data-lang="mainMenu">专题产品</li>
							<li class="mainTopBtn mainTopBtnListInfo" data-type="重点行业部门" data-lang="mainMenu">重点行业部门</li>
							<li class="mainTopBtn mainTopBtnListInfo" data-type="重点区域地点" data-lang="mainMenu">重点区域地点</li>
						</ul>
					</li>
				</ul>                 
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
    .clearFloat::after{
        content:"";
        display:block;
        clear: both;
    }
    .header{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100px;
        background:rgba(0,0,0,0.5);
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
    /**菜单**/
    ul.mapTopShowType {
        border: 6px solid transparent;
        border-image: url(../../assets/image/main_top_btn_bj.png) 8 0 8 0 fill;
    }
   .mapTopShowType > li {
        position: relative;
        float: left;
        padding: 0;
        background-size: contain;
        height: 20px;
        line-height: 20px;
        cursor: default;
    }
   .mapTopShowType > li .mainTopBtnListTitle {
        margin: 0;
        padding: 0 20px 20px;
    }
    .mainTopBtnListTitle.click {
        color: #fdfe00;
    }
    .mapTopShowType > li > .mainTopBtnList {
        min-width: 100%;
        height: auto;
        background: #123468;
        border: 1px solid #49c8f5;
        padding: 4px 10px;
        position: absolute;
        top: calc(100% + 5px);
        left: 50%;
        transform: translateX(-50%);
        display: none;
    }
    .mapTopShowType > li:hover .mainTopBtnList {
        display: inline-block;
    }
    .mapTopShowType li.mainTopBtn {
        white-space: nowrap;
        cursor: pointer;
    }
    .mapTopShowType .mainTopBtnList .mainTopBtn {
        padding: 5px 0;
    }
   .mapTopShowType li.mainTopBtn.click, .mapTopShowType li.mainTopBtn:hover, .mapTopShowType .mainTopBtnList:hover li.mainTopBtnListTitle, .mapTopShowType .mainTopBtnList li.mainTopBtnListTitle.click {
        color: #fdfe00;
    }
    .mapTopShowType > li > .line_separator {
        width: 1px;
        height: 100%;
        padding: 0;
        vertical-align: top;
    }
    .line_separator {
        background: #fff;
        border-radius: 10px;
        display: inline-block;
        box-sizing: content-box;
        border: 1px solid rgba(0, 39, 255, 0.7);
    } 
    li.mainTopBtnLi:hover > ul {
        display: inline-block;
    }
    li.mainTopBtnLi > ul {
        display: none;
        position: absolute;
        top: 0;
        left: 100%;
        z-index: 1;
        background: #123468;
        border: 1px solid #49c8f5;
        padding: 4px 10px;
    }
    li.mainTopBtnLi {
        position: relative;
        padding:5px 0;
    }
</style>