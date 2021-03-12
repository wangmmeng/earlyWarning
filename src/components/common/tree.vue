<template>
	<ul>
		<li v-for="(item,index) in treeData" :key="index">			
			<div>
				<b :class="item.children?'':'emptyNode'" @click="item.children?expandChange(item.expand,item):''"><i :class="item.expand?'el-icon-minus':'el-icon-plus'"></i></b>
				<label>
					<template v-if="selectType=='checkbox'">
						<input type="checkbox" :checked="item.checked" @change="handleCheckAllChange(item.checked,item)">{{item.label}}
					</template>					
					<template v-else-if="!item.children&&selectType=='radio'">
						<input type="radio" :checked="item.checked" name="radioName">{{item.label}}
					</template>
					<template v-else>
						{{item.label}}
					</template>
				</label>
			</div>
			<template v-if="item.children">			 
				<child-tree v-show="item.expand" :treeData="item.children" :selectType="selectType" @checkedFatherNode="checkedFatherNode(index)"></child-tree>			 							
			</template>			
		</li>
	</ul>
	
</template>

<script>
export default {
	name:"ChildTree",//name在很大作用上就是用来自己调用自己
	props: ['treeData','selectType'],
	data(){
		return {
			checkAll: false,
			checkedCities: [],
			cities:[],
			isIndeterminate: true
		}
	},
	created(){
		this.treeData.forEach(element => {
			this.cities.push(element.label)
		});
	},
	methods:{
		expandChange(expand,node){
			node.expand=!expand;
		},
		handleCheckAllChange(checked,node) {
			node.checked=!checked
			this.$emit('checkedFatherNode')
			if (node.children && node.children.length > 0) {
				this.selectedChildren(node.children,node.checked)
			}
		},
		selectedChildren(node,checked) {
			node.forEach(item => {
				item.checked = checked
				if (item.children && item.children.length > 0) {
					this.selectedChildren(item.children, checked)
				}
			})
		},
		// 作为父级节点检查是否需要修改选中状态(仅用于子节点调用)
		checkedFatherNode(index) {
			var nodeData=this.treeData[index].children;
			var num=0;
			nodeData.forEach(item=>{
				if(item.checked){
					num++
				}
			})
			if(num==nodeData.length){
				this.treeData[index].checked=true
			}else{
				this.treeData[index].checked=false
			}
			this.$emit('checkedFatherNode')
		}
	}
}
</script>

<style scoped>
	ul {
		margin-left: 2em;
		white-space: nowrap;
	}

	ul input {
		margin: 0 5px 4px 0;
		vertical-align: middle;
	}

	ul label {
		margin: 0;
		border-radius: 5px;
		cursor: pointer;
	}

	/* .dataQuerySelectWindow_stationSelect label:hover,
	.dataQuerySelectWindow_elementSelect label:hover {
		background: rgb(0 0 0 / 0.3);
	} */

	ul b {
		color: #000;
		display: inline-block;
		width: 14px;
		text-align: center;
		height: 14px;
		line-height: 14px;
		border-radius: 2px;
		padding:2px;
		cursor: pointer;
		background:#dfdfdf;
	}
	ul b.emptyNode{
		visibility: hidden;
	}

	/* .dataQuerySelectWindow_stationSelect b:hover,
	.dataQuerySelectWindow_elementSelect b:hover {
		box-shadow: 0 0 5px black;
	} */

</style>