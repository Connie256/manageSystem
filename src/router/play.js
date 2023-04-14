import Layout from '@/layout'
// 基础数据页面路由
const meta = {
  auth: true,
  title: '玩',
  isSole:true,//单个菜单,无子菜单为true
  icon:'el-icon-s-opportunity'
}
export default {
  path: '/play',
  redirect: {
    name: 'play',
    title: '喝'
  },
  meta,
  component: Layout,
  children: [{
    path: '/play',
    name: 'play',
    meta: {
      auth: true,
      title: '玩'
    },
    component: () => import('@/views/play/index.vue')
  }

  ]
}
