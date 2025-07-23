import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/auth/LoginForm.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/Layout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('@/components/Dashboard.vue')
        },
        {
          path: '/asesoria',
          name: 'AsesoriaLegal',
          component: () => import('@/components/modules/AsesoriaLegal.vue')
        },
        {
          path: '/contratos',
          name: 'GestionContratos',
          component: () => import('@/components/modules/GestionContratos.vue')
        },
        {
          path: '/actualidad',
          name: 'ActualidadJuridica',
          component: () => import('@/components/modules/ActualidadJuridica.vue')
        },
        {
          path: '/reportes',
          name: 'Reportes',
          component: () => import('@/views/Reportes.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check auth status
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router