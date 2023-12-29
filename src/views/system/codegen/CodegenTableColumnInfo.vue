<script setup>
import { onMounted, ref, toRefs } from 'vue';
import { systemCodegenColumn } from '@/api/system/systemCodegenApi'
import customAxios from '@/api/axios'

const props = defineProps(['dialogVisible', 'formData'])
const emit = defineEmits(['closeDetail'])

const { dialogVisible, formData } = toRefs(props)
const tableLoading = ref(false)
const tableData = ref([])

const handleClose = () => {
    emit('closeDetail')
}

onMounted(() => {
    listColumn()
})

const listColumn = () => {
    tableLoading.value = true
    const tableName = formData.value.name
    customAxios.get(systemCodegenColumn + '/' + tableName)
        .then(response => {
            tableData.value = response.data
        })
        .catch(error => {
        })
        .finally(() => {
            tableLoading.value = false
        });
}
</script>

<template>
    <el-dialog v-model="dialogVisible" :title="'表【' + formData.name + '】详情'" width="50%" :before-close="handleClose">
        <!-- <div class="table-wrapper"> -->
        <el-table v-loading="tableLoading" :data="tableData" stripe style="height: 350px;">
            <el-table-column prop="name" label="列名" min-width="120" show-overflow-tooltip />
            <el-table-column prop="type" label="类型" min-width="120" show-overflow-tooltip />
            <el-table-column prop="nullable" label="可否为空" min-width="120" show-overflow-tooltip />
            <el-table-column prop="unique" label="是否唯一" min-width="120" show-overflow-tooltip />
            <el-table-column prop="comment" label="备注" min-width="120" show-overflow-tooltip />
        </el-table>
        <!-- </div> -->
    </el-dialog>
</template>

<style scoped></style>