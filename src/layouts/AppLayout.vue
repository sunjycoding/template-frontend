<script setup>
import AppHeader from './AppHeader.vue';
import AppSideBar from './AppSideBar.vue';
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside>
                <AppSideBar />
            </el-aside>
            <el-container>
                <el-header>
                    <AppHeader />
                </el-header>
                <el-main>
                    <div class="main-wrapper">
                        <router-view />
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.common-layout {
    height: 100vh;
}

.el-header {
    height: 80px;
    background-color: #FFFFFF;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 0 20px;
    z-index: 10;
}

.el-aside {
    width: 200px !important;
}

.el-main {
    padding: 10px !important;
}

.main-wrapper {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    padding: 10px;
}
</style>