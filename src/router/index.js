import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Home from '@/views/home/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },

  ]
})


// 创建全局路由守卫
router.beforeEach((to, from, next) => {
  // 1、获取token
  const token = localStorage.getItem('token')
  // 2、判断是否需要登录权限
  if (to.meta.requiresAuth) {
    // 需要登录权限
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        // 保存了用户原本要进入的url，当用户登录后跳转到该url
        query: { redirect: to.fullPath }
      })
    }
  } else {
    // 不需要登录权限，直接进入
    next()
  }
})

export default router
