<script setup>
import { computed, ref, toRefs, watch } from 'vue'
import customAxios from '@/api/axios'
import { systemUser } from '@/api/system/systemUserApi'

const props = defineProps(['dialogVisible', 'title', 'formData'])
const emit = defineEmits(['closeDialog', 'refreshTableData'])

const { dialogVisible, formData } = toRefs(props)

const dialogVisibleRef = ref(props.dialogVisible)

watch(dialogVisible, (newValue) => {
    dialogVisibleRef.value = newValue
})

const operationType = computed(() => {
    if (formData.value.id) {
        return 'update'
    } else {
        return 'create'
    }
})

const confirmLoading = ref(false)
const formRef = ref(null)
const formRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    enabled: [
        { required: true, message: '请选择用户状态', trigger: 'blur' },
    ]
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
            confirmLoading.value = true
            if (operationType.value === 'create') {
                customAxios.post(systemUser, formData.value)
                    .then(response => {
                        handleClose()
                        emit('refreshTableData')
                    })
                    .catch(error => {
                    })
                    .finally(() => {
                        confirmLoading.value = false
                    })
            } else if (operationType.value === 'update') {
                customAxios.put(systemUser, formData.value)
                    .then(response => {
                        handleClose()
                        emit('refreshTableData')
                    })
                    .catch(error => {
                    })
                    .finally(() => {
                        confirmLoading.value = false
                    })
            }
        }
    })
}
</script>

<template>
    <el-dialog v-model="dialogVisibleRef" :title="props.title" width="50%" :before-close="handleClose">
        <el-form class="two-column-form" ref="formRef" :model="formData" :rules="formRules" label-width="auto">
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入用户名" v-model="formData.username" :disabled="operationType === 'update'" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input placeholder="请输入姓名" v-model="formData.name" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select v-model="formData.gender" placeholder="请选择性别" clearable>
                    <el-option v-for="data in genderOptions" :key="data.value" :label="data.label" :value="data.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="手机" prop="telephone">
                <el-input placeholder="请输入手机" v-model="formData.telephone" />
            </el-form-item>
            <el-form-item label="部门" prop="department">
                <el-select v-model="formData.department" placeholder="请选择部门" clearable>
                    <el-option v-for="data in genderOptions" :key="data.value" :label="data.label" :value="data.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="岗位" prop="department">
                <el-select v-model="formData.position" placeholder="请选择岗位" clearable>
                    <el-option v-for="data in genderOptions" :key="data.value" :label="data.label" :value="data.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="enabled">
                <el-radio-group v-model="formData.enabled">
                    <el-radio :label="true">激活</el-radio>
                    <el-radio :label="false">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <span>
                <el-button @click="handleCancel">取消</el-button>
                <el-button @click="handleConfirm" :loading="confirmLoading">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped></style>