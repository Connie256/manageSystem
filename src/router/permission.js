import router from './index'
import {
  getToken
} from '@/utils/auth' // get token from cookie
router.beforeEach(async (to, from, next) => {
  const hasToken = process.env.NODE_ENV == 'development' ? '123' : getToken()
  if (to.meta.isAuth) {
    if (hasToken) {
      next()
    } else {
      window.open(VUE_APP_LOGIN_URL, '_self')
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '管理系统'
  }
})
