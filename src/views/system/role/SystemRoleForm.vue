<script setup>
import { computed, ref, toRefs } from 'vue'
import customAxios from '@/api/axios'
import { systemRole } from '@/api/system/systemRoleApi'

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
}

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
        customAxios.post(systemRole, formData.value)
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
        customAxios.put(systemRole, formData.value)
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
  <el-dialog v-model="dialogVisible" :title="title" width="50%" :before-close="handleClose">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto">
      <el-row justify="space-around">
        <el-col :span="8">
          <el-form-item label="角色名称" prop="name">
            <el-input placeholder="请输入角色名称" v-model="formData.name" />
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="角色描述" prop="description">
            <el-input type="textarea" placeholder="请输入角色描述" v-model="formData.description" />
          </el-form-item>
        </el-col>
      </el-row>
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