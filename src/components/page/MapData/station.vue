<!-- 气象站设置 -->
<template>
	<div class="container">
		<el-collapse>
			<el-collapse-item title="站点选择" name="1">
				<el-form ref="stationForm" :model="stationForm" label-width="80px">
					<el-form-item label="站点类型">
						<el-checkbox-group v-model="stationForm.type" @change="stationShow">
							<el-checkbox label="国家站" name="type"></el-checkbox>
							<el-checkbox label="区域站" name="type"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="节点层级">
						<el-radio-group v-model="stationForm.region" @change="changeTreeData">
							<el-radio label="市"></el-radio>
							<el-radio label="县"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="选择方式">
						<el-radio-group v-model="stationForm.way" @change="selectTypeChange">
							<el-radio label="多选"></el-radio>
							<el-radio label="单选"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="站点查询">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-input v-model="stationForm.name" placeholder="请输入站点名称"></el-input>
							</el-col>
							<el-col :span="8">
								<el-button type="primary">查询</el-button>
							</el-col>     
						</el-row>                                          
					</el-form-item>              
				</el-form>
				<p>已选择站点：{{checkedNum}}/{{stationNum}}</p>
				<v-tree :treeData="treeData" :selectType="selectType"></v-tree>
			</el-collapse-item>
			<el-collapse-item title="要素管理" name="2">
				<el-form ref="form1" :model="form1" label-width="80px">
					<el-form-item label="数据类型">
						<el-radio-group v-model="form1.type">
							<el-radio label="年"></el-radio>
							<el-radio label="季"></el-radio>
							<el-radio label="月"></el-radio>
							<el-radio label="旬"></el-radio>
							<el-radio label="周"></el-radio>
							<el-radio label="日"></el-radio>
							<el-radio label="时"></el-radio>
						</el-radio-group>                           
					</el-form-item>
					<el-form-item label="时间范围">
						<el-date-picker
							v-model="form1.date"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="查询类型">
						<el-radio-group v-model="form1.way">
							<el-radio label="逐日查询"></el-radio>
							<el-radio label="时段统计"></el-radio>
						</el-radio-group>
					</el-form-item>                                   
				</el-form>
				<el-tree
					:data="data"
					show-checkbox
					default-expand-all
					node-key="id"
					ref="tree"
					highlight-current
					>
				</el-tree>
			</el-collapse-item>            
		</el-collapse>
	</div>
</template>

<script>
import vTree from '../../common/tree'
export default {
	components: {
		vTree
	},
	props:['stationData'],
	data(){
		return{
			stationForm: {
                name: '',
                region: '市',
                way: '多选',
                type: ["国家站"]
            },
			region:{},
			selectType:"checkbox",
			stationArray:[],
			stationNum:0,
			checkedNum:0,
			radioCheck:true,
			form1: {
                type: '年',
                way: '逐日查询',
                date: ""
            },
			treeData:[],
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
                }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }]
		}
	},
	watch: {
		stationData(val) {
			this.stationArray= val;
			this.organizeData();
		}
	},
	created(){
		this.getRegionInfo()
	},
	methods:{
		stationShow(){//站点类型改变
			if(this.stationForm.type.includes("国家站")){
				this.$store.state.GJstationShow=true
			}else{
				this.$store.state.GJstationShow=false
			}
			if(this.stationForm.type.includes("区域站")){
				this.$store.state.QYstationShow=true
			}else{
				this.$store.state.QYstationShow=false
			}
			this.changeTreeData()
		},
		selectTypeChange(){//选择模式
			if(this.stationForm.way=="多选"){
				this.selectType="checkbox"
			}else{
				this.selectType="radio"
				this.checkedNum=1
			}
			this.changeTreeData()
		},
		getRegionInfo(){
			this.$axios.get('/shandong/regionInfoController.do?findAll').then(response => {
				if (response.data) {
					var regionArray=response.data.o;
					regionArray.forEach(element => {
						let {province,city,county,level}=element
						if(level==1){
							if(!this.region[province]){
								this.region[province]={}
							}							
						}else if(level==2){
							if(!this.region[province]){
								this.region[province]={}								
							}
							if(!this.region[province][city]){
								this.region[province][city]={}
							}							
						}else if(level==3){
							if(!this.region[province]){
								this.region[province]={}															
							}
							if(!this.region[province][city]){
								this.region[province][city]={}
							}
							this.region[province][city][county]=[]
						}					
					});					
				}
			}).catch(err => {
				console.log(err)
			})
		},
		organizeData(){
			this.stationArray.forEach(element => {
				let {city,area}=element
				if(area==""){
					if(this.region["山东省"][city]["市"]){
						this.region["山东省"][city]["市"].push(element)
					}else{
						this.region["山东省"][city]["市"]=[]
						this.region["山东省"][city]["市"].push(element)
					}
				}else{
					if(city=="莱芜市"){
						city="济南市"
					}
					switch(area){
						case "莱城区":area="莱芜区";break
						case "即墨市":area="即墨区";break
						case "章丘市":area="章丘区";break
						case "定陶县":area="定陶区";break
						case "垦利县":area="垦利区";break
					}
					if(this.region["山东省"][city][area]){
						this.region["山东省"][city][area].push(element)
					}else{
						console.log(city,area)
					}					
				}				
			})
			this.changeTreeData()
		},
		changeTreeData(){
			this.radioCheck=true
			this.stationNum=0

			var city=true
			if(this.stationForm.region=="县"){
				city=false
			}			
			this.treeData=[];
			for(var i in this.region){
				var firstObj=this.getTreeFatherObj(i)
				this.treeData.push(firstObj)
				for(var j in this.region[i]){
					var secondObj=this.getTreeFatherObj(j)
					firstObj.children.push(secondObj)				
					for(var n in this.region[i][j]){
						if(this.region[i][j][n].length!=0){
							if(city){
								this.getTreeChildObj(secondObj.children,this.region[i][j][n])	
							}else{
								var threeObj=this.getTreeFatherObj(n)
								secondObj.children.push(threeObj)
								this.getTreeChildObj(threeObj.children,this.region[i][j][n])
							}
						}											
					}					
				}
			}
			this.checkedNum=this.stationNum
		},
		getTreeFatherObj(name){
			var obj={}
			obj.label=name
			obj.expand=true
			obj.checked=true
			obj.children=[]
			return obj
		},
		getTreeChildObj(fatherArr,arr){
			var station=0
			if(this.stationForm.type.length==2){
				station=3
			}else if(this.stationForm.type.includes("区域站")){
				station=2
			}else if(this.stationForm.type.includes("国家站")){
				station=1
			}else{
				return
			}
			for(var m=0;m<arr.length;m++){
				let {name,station_id_c:sid}=arr[m]
				if(station==1&&sid.charAt(0)!="5"){
					continue
				}
				if(station==2&&sid.charAt(0)=="5"){
					continue
				}
				var childObj={};
				childObj.label=name+"("+sid+")"
				childObj.value=sid
				if(this.stationForm.way=="单选"){
					if(this.radioCheck){
						this.radioCheck=false
						childObj.checked=true
					}else{
						childObj.checked=false
					}					
				}else{
					childObj.checked=true
				}							
				fatherArr.push(childObj)
				this.stationNum++				
			}
		}
	}
}
</script>

<style scoped>
    .container{
        position: absolute;
        top:100px;
        left:0;
        max-height:calc(100% - 120px);
        overflow: auto;
        z-index:999;
        padding: 0 15px;
        background: #fff;
    }
</style>