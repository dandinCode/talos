import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { checkAuth } from '@/services/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/Index.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/index.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register/index.vue'),
    },

    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'AddSymbol',
          name: 'AddSymbol',
          component: () => import('../views/AddSymbol/index.vue'),
        },
        {
          path: 'RunModel',
          name: 'RunModel',
          component: () => import('../views/RunModel/index.vue'),
        },
        {
          path: 'PortfolioList',
          name: 'PortfolioList',
          component: () => import('../views/PortfolioList/index.vue'),
        },
        {
          path: 'PortfolioDetails/:id',
          name: 'PortfolioDetails',
          component: () => import('../views/PortfolioDetails/index.vue'),
        },
        {
          path: 'Dashboard',
          name: 'Dashboard',
          component: () => import('../views/Dashboard/index.vue'),
        },
        {
          path: 'ProfileView',
          name: 'ProfileView',
          component: () => import('../views/ProfileView/index.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await checkAuth()

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    return next('/Dashboard')
  }

  next()
})

export default router
