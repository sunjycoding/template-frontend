<script setup>
import { reactive, ref, computed } from 'vue'
import customAxios from '@/api/axios'

const props = defineProps(['dialogVisible', 'title', 'selectedData'])
const emit = defineEmits(['closeDialog', 'refreshTableData'])

const dialogVisibleComputed = computed({
    get: () => props.dialogVisible,
    set: (value) => value
})

const formRef = ref(null)

const formData = reactive({ ...props.selectedData })

const formRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    confirmPassword: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
    ],
}

const genderOptions = [
    {
        label: '男',
        value: 'male'
    },
    {
        label: '女',
        value: 'female'
    }
]

const handleClose = () => {
    emit('closeDialog')
    formRef.value.resetFields()
}

const handleCancel = () => {
    handleClose()
}

const handleConfirm = () => {
    formRef.value.validate(valid => {
        if (valid) {
            customAxios.post('/users', formData)
                .then(response => {
                    if (response?.code === 0) {
                        handleClose()
                        emit('refreshTableData')
                    }
                })
                .catch(error => {

                })
        }
    })
}
</script>

<template>
    <el-dialog v-model="dialogVisibleComputed" :title="props.title" width="50%" :before-close="handleClose">
        <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户名" prop="username">
                        <el-input placeholder="请输入用户名" v-model="formData.username" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name">
                        <el-input placeholder="请输入姓名" v-model="formData.name" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="密码" prop="password">
                        <el-input placeholder="请输入密码" v-model="formData.password" type="password" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input placeholder="请输入确认密码" v-model="formData.confirmPassword" type="password" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号" prop="telephone">
                        <el-input placeholder="请输入手机号" v-model="formData.telephone" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="formData.gender" placeholder="请选择性别" clearable>
                            <el-option v-for="data in genderOptions" :key="data.value" :label="data.label"
                                :value="data.value" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <span>
                <el-button class="btn-cancel" @click="handleCancel">取消</el-button>
                <el-button class="btn-confirm" @click="handleConfirm">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>