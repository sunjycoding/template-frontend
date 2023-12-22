import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    },
    {
      component: AppLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: '/system/users',
          name: 'users',
          component: () => import('../views/user/UserManagement.vue')
        },
      ]

    }
  ]
})

export default router
