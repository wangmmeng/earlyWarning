<template>
	<ul class="mapTopShowType clearFloat">                			
		<li v-for="(item,i) in menuData" :key="i" :data-index="item.index" :class='[item.subs?"":"mainTopBtn"]' @click="!item.subs&&onRoutes($event)">
			<template v-if="item.title">
				<template v-if="item.subs">
					<p class="mainTopBtnListTitle">{{item.title}}</p>
					<ul class="mainTopBtnList">
						<li v-for="(subitem,j) in item.subs" :data-index="subitem.index" :key="j" :class='[subitem.subs?"mainTopBtnLi":"mainTopBtn"]' @click="!subitem.subs&&onRoutes($event)">
							<template v-if="subitem.subs">	
								<p class="mainTopBtnListInfo">{{subitem.title}}</p>										
								<ul class="mainTopBtnListLeft">
									<li v-for="(subsubitem,m) in subitem.subs" :data-index="subsubitem.index" :key="m" class="mainTopBtn mainTopBtnListInfo"  @click="onRoutes($event)">{{subsubitem.title}}</li>
								</ul>
							</template>
							<template v-else>
								{{subitem.title}}
							</template>
						</li>										
					</ul>
				</template>	
				<template v-else>
					<span>{{item.title}}</span>
				</template>							
			</template>
			<template v-else>
				<span class="line_separator"></span>
			</template>
		</li>
	</ul>
</template>

<script>
export default {
	props:['menuData'],
	methods:{
		onRoutes(e){
			if(e.target.getAttribute("data-index")){
				this.$router.replace('/'+e.target.getAttribute("data-index"))
			}			
		},
	}
}
</script>

<style scoped>
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