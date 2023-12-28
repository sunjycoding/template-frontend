<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import customAxios from '@/api/axios'
import { systemMenu } from '@/api/system/systemMenuApi'

const menuData = ref([])
const router = useRouter()
const route = useRoute()
const activeIndex = computed(() => route.path)

onMounted(() => {
    listMenuData()
})

const navigateTo = (path) => {
    router.push(path);
}

const listMenuData = () => {
    customAxios.get(systemMenu)
        .then(response => {
            menuData.value = response.data
        })
        .catch(error => {
        })
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
        <template v-for="data in menuData">
            <el-sub-menu v-if="data.type === 'DIRECTORY' && data.enabled" :index="data.id">
                <template #title>
                    <el-icon>
                        <component :is="data.icon" />
                    </el-icon>
                    <span>{{ data.name }}</span>
                </template>
                <template v-for="menu in data.children">
                    <el-menu-item v-if="menu.enabled" :index="menu.path" @click="navigateTo(menu.path)">
                        <template #title>
                            <el-icon>
                                <component :is="menu.icon" />
                            </el-icon>
                            <span>{{ menu.name }}</span>
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