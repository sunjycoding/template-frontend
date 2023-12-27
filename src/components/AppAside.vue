<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const menuList = [
    {
        id: "1",
        type: "catalog",
        label: "系统管理",
        icon: "setting",
        children: [
            {
                id: "2-1",
                type: "menu",
                label: "用户管理",
                icon: "user",
                path: "/system/users"
            },
            {
                id: "2-2",
                type: "menu",
                label: "菜单管理",
                icon: "menu",
                path: "/system/menus"
            },
            {
                id: "2-3",
                type: "role",
                label: "角色管理",
                icon: "coordinate",
                path: "/system/roles"
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
    <el-menu :default-active="activeIndex" unique-opened>
        <el-menu-item index="/dashboard" @click="navigateTo('/dashboard')">
            <el-icon>
                <document />
            </el-icon>
            <span>首页</span>
        </el-menu-item>
        <template v-for="data in menuList">
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
</template>

<style scoped>
.el-menu {
    height: 100%;
    position: relative;
}
</style>