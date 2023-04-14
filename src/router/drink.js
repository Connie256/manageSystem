import Layout from '@/layout'
// 基础数据页面路由
const meta = {
  auth: true,
  title: '喝'
}
export default {
  path: '/drink/alcohol',
  name: 'drink',
  redirect: {
    name: 'alcohol',
    title: '喝'
  },
  meta,
  component: Layout,
  children: [{
    path: '/drink/alcohol',
    name: 'alcohol',
    meta: {
      auth: true,
      title: '酒'
    },
    component: () => import('@/views/drink/alcohol/index.vue')
  },
    {
      path: '/drink/milk',
      name: 'milk',
      meta: {
        auth: true,
        title: '牛奶'
      },
      component: () => import('@/views/drink/milk/index.vue')
    }

  ]
}
