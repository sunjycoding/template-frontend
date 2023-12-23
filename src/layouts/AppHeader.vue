<script setup>
import avatar from '@/assets/login.png'
</script>

<template>
    <div class="common-header">
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar shape="square" :size="50" :src="avatar"></el-avatar>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>清除缓存</el-dropdown-item>
                    <el-dropdown-item divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
  
<style scoped>
.common-header {
    background-color: #FFFFFF;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 50px;
}
</style>