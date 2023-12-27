<script setup>
import AppAside from './AppAside.vue';
import AppHeader from './AppHeader.vue';
</script>

<template>
    <el-container style="height: 100vh;">
        <el-aside width="200px">
            <AppAside />
        </el-aside>
        <el-container>
            <el-header height="80px">
                <AppHeader />
            </el-header>
            <el-main>
                <RouterView v-slot="{ Component }">
                    <Transition name="slide">
                        <component :is="Component" />
                    </Transition>
                </RouterView>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.el-header {
    padding: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}

.slide-leave-from,
.slide-enter-to {
    transform: translateX(0);
}
</style>