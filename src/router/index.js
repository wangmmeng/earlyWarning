import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Map from '../components/common/Map'
import dashboard from '../components/page/EarlyWarning/dashboard'
import Empty from '../components/common/Empty'


Vue.use(Router)

export default new Router({
  routes: [
	{
		path: '/',
		redirect: '/dashboard'
	},
    {
      path: '/',
      component: Index,
	  meta: { title: '自述文件' },
	  children: [
		  {
			  path: '/dashboard',
			  component:dashboard,
			  meta: { title: '预警数据' }
		  },
		  {
			path: '/map',
			component:Map,
			meta: { title: '地图数据' }
		  },
		  {
			path: '/empty',
			component:Empty,
			meta: { title: '空页面' }
		  },
		]
    }
  ]
})
