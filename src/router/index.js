import Vue from 'vue'
import VueRouter from 'vue-router'
import eat from './eat'
import drink from './drink'
import play from './play'
Vue.use(VueRouter)

const routes = [
  eat,
  drink,
  play,
  { path: '*', redirect: '/eat/rice', hidden: true },

]

// 注：此方案只针对于vue3,官方vue-router@3.0及以上新版本路由默认回调返回的都是promise，原先就版本的路由回调将废弃！！！！不加报错:Navigation cancelled from "/drink/alcohol" to "/drink/milk" with a new navigation.
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
