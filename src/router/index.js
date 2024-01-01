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
          path: '/system/dicts',
          name: 'dict',
          component: () => import('../views/system/dict/SystemDictList.vue')
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
        {
          path: '/system/departments',
          name: 'department',
          component: () => import('../views/system/department/SystemDepartmentList.vue')
        },
        {
          path: '/system/positions',
          name: 'position',
          component: () => import('../views/system/position/SystemPositionList.vue')
        },
        {
          path: '/system/codegen',
          name: 'codegen',
          component: () => import('../views/system/codegen/SystemCodegenList.vue')
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
