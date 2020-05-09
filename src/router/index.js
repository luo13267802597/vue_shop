import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/users.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users }
      ]
    }
  ]
})

// 挂载路由守卫
router.beforeEach((to, from, next) => { // to 将要访问的路径  from 代表从哪个路径跳转而来  next是一个函数  表示放行
  if (to.path === '/login') {
    return next()
  } else {
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
      return next('/login')
    } else {
      next()
    }
  }
})
export default router
