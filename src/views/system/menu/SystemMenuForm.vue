<script setup>
import { computed, onMounted, ref, toRefs } from 'vue'
import customAxios from '@/api/axios'
import { systemMenu } from '@/api/system/systemMenuApi'

const props = defineProps(['dialogVisible', 'title', 'formData'])
const emit = defineEmits(['closeDialog', 'refreshTableData'])

const { dialogVisible, title, formData } = toRefs(props)

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
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' },
    ],
    type: [
        { required: true, message: '请选择类型', trigger: 'blur' },
    ],
    parentId: [
        { required: true, message: '请选择上级菜单', trigger: 'blur' },
    ],
    enabled: [
        { required: true, message: '请选择启用状态', trigger: 'blur' },
    ]
}

const menuOptions = ref([])
const menuOptionsProps = {
    children: 'children',
    label: 'name',
    value: 'id'
}

onMounted(() => {
    listMenuOptions()
})

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
                customAxios.post(systemMenu, formData.value)
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
                customAxios.put(systemMenu, formData.value)
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

const listMenuOptions = () => {
    customAxios.get(systemMenu)
        .then(response => {
            menuOptions.value = response.data
        })
        .catch(error => {
        })
}
</script>

<template>
    <el-dialog v-model="dialogVisible" :title="title" width="50%" :before-close="handleClose">
        <el-form class="two-column-form" ref="formRef" :model="formData" :rules="formRules" label-width="auto">
            <el-form-item label="名称" prop="name">
                <el-input placeholder="请输入名称" v-model="formData.name" />
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-radio-group v-model="formData.type">
                    <el-radio label="DIRECTORY">目录</el-radio>
                    <el-radio label="MENU">菜单</el-radio>
                    <el-radio label="BUTTON">按钮</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="formData.type === 'MENU' || formData.type === 'BUTTON'" label="上级菜单" prop="parentId">
                <el-tree-select v-model="formData.parentId" :data="menuOptions" :props="menuOptionsProps"
                    :render-after-expand="false" check-strictly clearable />
            </el-form-item>
            <el-form-item v-if="formData.type === 'MENU'" label="菜单路由" prop="path">
                <el-input placeholder="请输入菜单路由, 以'/'开头" v-model="formData.path" />
            </el-form-item>
            <el-form-item v-if="formData.type === 'DIRECTORY' || formData.type === 'MENU'" label="图标名称" prop="icon">
                <el-input placeholder="请输入图标名称" v-model="formData.icon" />
            </el-form-item>
            <el-form-item v-if="formData.type === 'MENU' || formData.type === 'BUTTON'" label="权限标识" prop="permissionTag">
                <el-input placeholder="请输入权限标识, 例如: user:list" v-model="formData.permissionTag" />
            </el-form-item>
            <el-form-item label="排序" prop="orderNum">
                <el-input-number :min="0" :max="100" v-model="formData.orderNum" />
            </el-form-item>
            <el-form-item label="启用状态" prop="enabled">
                <el-radio-group v-model="formData.enabled">
                    <el-radio :label="true">启用</el-radio>
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