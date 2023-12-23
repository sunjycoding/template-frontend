<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import customAxios from '@/api/axios'
import { ElMessage } from 'element-plus'

const router = useRouter()

const formData = reactive({
    username: '',
    password: ''
})

const formRef = ref(null)

const formRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
}

const submitForm = () => {
    formRef.value.validate(valid => {
        if (valid) {
            customAxios.post('/authentication/login', formData)
                .then(response => {
                    const token = response.data.token
                    localStorage.setItem('token', token)
                    customAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    ElMessage({
                        message: '登录成功',
                        type: 'success',
                    })
                    router.push('/dashboard');
                })
                .catch(error => {

                })
        }
    })
}
</script>

<template>
    <el-row justify="center" align="middle" class="wrapper">
        <el-col :span="6">
            <el-card class="card">
                <template #header>
                    <span class="title">Spring Boot Vue3 Template</span>
                </template>
                <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto">
                    <el-form-item prop="username">
                        <el-input placeholder="用户名" v-model="formData.username" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="密码" v-model="formData.password" type="password" />
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 100%" type="primary" @click="submitForm()">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>
  
<style scoped>
.wrapper {
    height: 100vh;
    background-image: url('@/assets/login.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.card {
    width: 100%;
    height: 300px;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
}
</style>