import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/login', name: 'Login', component: () => import('@/views/auth/Login.vue'), meta: { public: true } },
  { path: '/register', name: 'Register', component: () => import('@/views/auth/Register.vue'), meta: { public: true } },
  {
    path: '/home',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('@/views/home/Index.vue') }
    ]
  },
  {
    path: '/profile',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      { path: '', name: 'Profile', component: () => import('@/views/profile/Index.vue') }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/error/NotFound.vue'), meta: { public: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()
  const isPublic = Boolean(to.meta.public)

  if (!authStore.token && !isPublic) {
    next('/login')
    return
  }

  if (authStore.token && !authStore.userInfo && to.path !== '/login' && to.path !== '/register') {
    try {
      await authStore.fetchUserInfo()
    } catch {
      authStore.logoutLocal()
      next('/login')
      return
    }
  }

  if (authStore.token && (to.path === '/login' || to.path === '/register')) {
    next('/home')
    return
  }

  next()
})

export default router
