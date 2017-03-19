// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 初始登陆界面//
router.push('/login')

// 现在，应用已经启动了！
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('userid')) {  // 判断当前用户是否存在，实际应用中应该与后台数据进行验证，此例子只读取localstorge
      next()
    } else {
      // console.log()
      next({path: '/login'})
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router
})
