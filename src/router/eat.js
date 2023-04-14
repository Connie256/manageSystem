import Layout from '@/layout'
// 基础数据页面路由
const meta = {
  auth: true,
  title: '吃'
}
export default {
  path: '/eat/rice',
  name: 'rice',
  redirect: {
    name: 'rice',
    title: '吃'
  },
  meta,
  component: Layout,
  children: [{
    path: '/eat/rice',
    name: 'rice',
    meta: {
      auth: true,
      title: '米饭'
    },
    component: () => import('@/views/eat/rice/index.vue')
  },
    {
      path: '/eat/noddles',
      name: 'noddles',
      meta: {
        auth: true,
        title: '面食'
      },
      component: () => import('@/views/eat/noddles/index.vue')
    }

  ]
}
