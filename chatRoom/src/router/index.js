import Vue from 'vue'
import Router from 'vue-router'
// import GroupInfo from '../components/GroupInfo'
import Login from '../components/login'
import App from '../App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: App
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
    // {
    //   path: '/groupinfo',
    //   name: 'groupinfo',
    //   component: GroupInfo
    // },
  ]
})
