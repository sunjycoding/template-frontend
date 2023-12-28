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
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue')
        }
      ]
    },
    {
      component: AppLayout,
      name: 'system',
      children: [
        {
          path: '/system/users',
          name: 'user',
          component: () => import('../views/system/user/SystemUserList.vue')
        },
        {
          path: '/system/menus',
          name: 'menu',
          component: () => import('../views/system/menu/SystemMenuList.vue')
        },
        {
          path: '/system/roles',
          name: 'role',
          component: () => import('../views/system/role/SystemRoleList.vue')
        },
      ]
    }
  ]
})

export default router
