<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const handleOpen = () => { }
const handleClose = () => { }
const menuList = [
  {
    id: "1",
    type: "catalog",
    label: "系统管理",
    icon: "location",
    children: [
      {
        id: "2-1",
        type: "menu",
        label: "用户管理",
        icon: "document",
        path: "/system/users"
      },
      {
        id: "2-2",
        type: "role",
        label: "角色管理",
        icon: "document",
        path: "/system/roles"
      },
      {
        id: "2-3",
        type: "menu",
        label: "菜单管理",
        icon: "document",
        path: "/system/menus"
      },
    ]
  },
]
const router = useRouter()

const route = useRoute()

const activeIndex = computed(() => route.path)

const navigateTo = (path) => {
  router.push(path);
}
</script>

<template>
  <div class="common-side-bar">
    <el-menu :default-active="activeIndex" active-text-color="#E9C46A" background-color="#168aad" text-color="#FFFFFF"
      @open="handleOpen" @close="handleClose" unique-opened>
      <el-menu-item index="/dashboard" @click="navigateTo('/dashboard')">
        <el-icon>
          <document />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <template v-for=" data in menuList">
        <el-sub-menu v-if="data.type === 'catalog'" :index="data.id">
          <template #title>
            <el-icon>
              <component :is="data.icon" />
            </el-icon>
            <span>{{ data.label }}</span>
          </template>
          <template v-for="menu in data.children">
            <el-menu-item :index="menu.path" @click="navigateTo(menu.path)">
              <template #title>
                <el-icon>
                  <component :is="menu.icon" />
                </el-icon>
                <span>{{ menu.label }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>


<style scoped>
.common-side-bar {
  width: 100%;
  height: 100%;
  background-color: #168aad;
}

.el-sub-menu .el-menu-item {
  background-color: #1a759f;
}

.el-menu-item:hover {
  background-color: #336c87
}
</style>
