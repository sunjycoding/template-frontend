<script setup>
import router from '@/router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';

const name = ref('')

onMounted(() => {
    let userName = localStorage.getItem('name')
    name.value = userName ? userName : '未知用户'
})

const handleLogout = () => {
    ElMessageBox.confirm(
        '确定要退出登录吗？',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            localStorage.clear()
            sessionStorage.clear()
            router.push('/login')
            ElMessage({
                message: '退出成功',
                type: 'success',
            })
        })
        .catch(() => {
        })
}
</script>

<template>
    <el-row class="container" justify="space-between" align="middle">
        <el-page-header>
            <template #content>
                <span></span>
            </template>
        </el-page-header>
        <div class="right">
            <span class="name">{{ name }}</span>
            <el-dropdown>
                <el-avatar :size="50" src="/template/avatar.png"></el-avatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>清除缓存</el-dropdown-item>
                        <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-row>
</template>

<style scoped>
.container {
    height: 100%;
    background-color: #FFFFFF;
    padding: 0 35px;
    box-shadow: 0px 8px 15px -5px rgba(0, 0, 0, 0.3);
}

.right {
    display: flex;
    justify-content: center;
    align-items: center;
}

.name {
    margin-right: 25px;
}

.el-avatar {
    transition: box-shadow 0.3s, transform 0.3s;
}

.el-avatar:hover {
    cursor: pointer;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
}
</style>