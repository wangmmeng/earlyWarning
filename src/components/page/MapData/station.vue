<!-- 气象站设置 -->
<template>
	<div class="container">
		<el-collapse>
			<el-collapse-item title="站点选择" name="1">
				<el-form ref="stationForm" :model="stationForm" label-width="80px">
					<el-form-item label="站点类型">
						<el-checkbox-group v-model="stationForm.type">
							<el-checkbox label="国家站" name="type"></el-checkbox>
							<el-checkbox label="区域站" name="type"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="节点层级">
						<el-radio-group v-model="stationForm.region">
							<el-radio label="市"></el-radio>
							<el-radio label="县"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="选择方式">
						<el-radio-group v-model="stationForm.way">
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
				<p>已选择站点：84/84</p>
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
			<el-collapse-item title="参数设置" name="2">
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
			</el-collapse-item>
			<el-collapse-item title="要素管理" name="3">
				<el-radio-group v-model="radio">
					<el-radio :label="3">多要素</el-radio>
					<el-radio :label="6">单要素</el-radio>
				</el-radio-group>
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
export default {
	data(){
		return{
			stationForm: {
                name: '',
                region: '市',
                way: '多选',
                type: ["国家站"]
            },
			form1: {
                type: '年',
                way: '逐日查询',
                date: ""
            },
            radio: 3,
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