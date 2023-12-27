import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      component: AppLayout,
      name: 'system',
      children: [
        {
          path: '/system/users',
          name: 'user',
          component: () => import('../views/system/SystemUserList.vue')
        },
        {
          path: '/system/menus',
          name: 'menu',
          component: () => import('../views/system/SystemMenuList.vue')
        },
        {
          path: '/system/roles',
          name: 'role',
          component: () => import('../views/system/SystemRoleList.vue')
        },
      ]
    }
  ]
})

export default router
