<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import customAxios from '@/api/axios'

const router = useRouter()
const loginLoading = ref(false)
const formData = reactive({})
const formRef = ref(null)
const formRules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ],
}

const handleLogin = () => {
    formRef.value.validate(valid => {
        if (valid) {
            loginLoading.value = true
            customAxios.post('/authentication/login', formData)
                .then(response => {
                    const name = response.data.name
                    const token = response.data.token
                    localStorage.setItem('token', token)
                    localStorage.setItem('name', name)
                    customAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    ElMessage({
                        message: '登录成功',
                        type: 'success',
                    })
                    router.push('/dashboard')
                        .then(() => {
                            formRef.value.resetFields()
                        })
                })
                .catch(error => {

                })
                .finally(() => {
                    loginLoading.value = false
                })
        }
    })
}
</script>

<template>
    <div class="container">
        <div class="login-form-container">
            <el-form class="login-form" ref="formRef" :model="formData" :rules="formRules" @keyup.enter="handleLogin">
                <span class="form-title">Template</span>
                <el-form-item prop="username">
                    <el-input prefix-icon="user" placeholder="用户名" v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" prefix-icon="lock" placeholder="密码" v-model="formData.password"></el-input>
                </el-form-item>
                <el-button type="primary" class="login-button" @click="handleLogin" :loading="loginLoading">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-form-container {
    width: 400px;
    height: 300px;
    padding: 40px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #FFFFFF;
}

.form-title {
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

.login-form {
    display: flex;
    flex-direction: column;
}

.login-button {
    width: 100%;
    margin-top: 20px;
}
</style>