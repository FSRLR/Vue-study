import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      redirect: 'index',
    },
    {
      //主页
      path: '/index',
      redirect: 'DASHBOARD',
      component: resolve => require(['../components/Index.vue'], resolve),
      meta: {
        title: '主页'
      },
      children: [{
        //DASHBOARD
        path: '/DASHBOARD',
        component: resolve => require(['../components/DASHBOARD.vue'], resolve),
        meta: {
          title: '仪表板'
        }
      }]
    },
    {
      //WIDGETS
      path: '/WIDGETS',
      component: resolve => require(['../components/WIDGETS.vue'], resolve),
      meta: {
        title: '小工具'
      }
    },
    {
      //CHARTS
      path: '/CHARTS',
      component: resolve => require(['../components/CHARTS.vue'], resolve),
      meta: {
        title: '图表'
      }
    },
    {
      //UI ELEMENTS
      path: '/UI_ELEMENTS',
      component: resolve => require(['../components/UI_ELEMENTS.vue'], resolve),
      meta: {
        title: '组件'
      }
    },
    {
      // TABLES
      path: '/TABLES',
      component: resolve => require(['../components/TABLES.vue'], resolve),
      meta: {
        title: '表格'
      }
    },
    {
      //inform
      path: '/inform',
      component: resolve => require(['../components/inform.vue'], resolve),
      meta: {
        title: '通知'
      }
    },
    {
      //user
      path: '/admin',
      component: resolve => require(['../components/admin.vue'], resolve),
      meta: {
        title: '管理员'
      }
    },
    {
      //setting
      path: '/setting',
      component: resolve => require(['../components/setting.vue'], resolve),
      meta: {
        title: '设置'
      }
    }
  ]
})
