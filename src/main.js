import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载 element 组件库
import ElementUI from 'element-ui'
//  引入全局公共css
import '@/style/index.scss'
// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/router/permission'
import getConfig from '@/utils/configUrl' // 路由拦截
// 全局注册 element 组件库
Vue.use(ElementUI)
Vue.config.productionTip = false;

(async function () {
  await getConfig()
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
