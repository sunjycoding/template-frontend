<script setup>
import { reactive, ref, onMounted } from 'vue'
import customAxios from '@/api/axios'
import UserForm from './UserForm.vue';
import { presentSelection, confirmDeletion } from '@/utils/commonUtils'

const tableColumnList = [
    {
        prop: "username",
        label: "用户名",
    },
    {
        prop: "name",
        label: "姓名",
    },
    {
        prop: "lastModifiedBy",
        label: "修改人",
    },
    {
        prop: "lastModifiedDate",
        label: "修改时间",
    },
    {
        prop: "createdBy",
        label: "创建人",
    },
    {
        prop: "createdDate",
        label: "创建时间",
    },
]

const pageNumber = ref(1)

const pageSize = ref(10)

const totalElements = ref(0)

const tableLoading = ref(false)

const tableData = ref([])

const selectedTableData = ref([])

const criteriaForm = reactive({})

const dialogVisible = ref(false)

const dialogTitle = ref(null)

const formData = ref({})

onMounted(() => {
    listTableData()
})

const handleSizeChange = (value) => {
    pageSize.value = value
    pageNumber.value = 1
    listTableData()
}

const handleCurrentChange = (value) => {
    pageNumber.value = value
    listTableData()
}

const listTableData = () => {
    tableLoading.value = true
    customAxios.get('/users/page', {
        params: {
            pageNumber: pageNumber.value,
            pageSize: pageSize.value,
            ...criteriaForm
        }
    })
        .then(response => {
            tableData.value = response.data.content
            totalElements.value = response.data.totalElements
        })
        .catch(error => {
        })
        .finally(() => {
            tableLoading.value = false
        });
}

const handleSelectionChange = (selection) => {
    selectedTableData.value = selection
}

const queryData = () => {
    listTableData()
}

const updateDialogVisible = () => {
    dialogVisible.value = !dialogVisible.value
}

const handleCreate = () => {
    formData.value = {}
    updateDialogVisible()
    dialogTitle.value = '新增'
}

const handleUpdate = (row) => {
    formData.value = JSON.parse(JSON.stringify(row))
    updateDialogVisible()
    dialogTitle.value = '修改'
}

const handleDelete = (row) => {
    confirmDeletion().then(() => {
        customAxios.delete('users/' + row.id)
            .then(response => {
                listTableData()
            })
            .catch(error => {
            })
    })
}

const handleBatchDelete = () => {
    if (selectedTableData.value.length > 0) {
        const idList = selectedTableData.value.map(data => data.id)
        confirmDeletion().then(() => {
            customAxios.delete('users', {
                data: idList
            })
                .then(response => {
                    listTableData()
                })
                .catch(error => {
                })
        })
    } else {
        presentSelection()
    }
}

const handleImport = () => {

}

const handleExport = () => {

}
</script>

<template>
    <UserForm :dialogVisible="dialogVisible" :title="dialogTitle" :formData="formData"
        @updateDialogVisible="updateDialogVisible" @refreshTableData="listTableData" />
    <div class=" criteria-wrapper">
        <el-row>
            <el-form :inline="true" :model="criteriaForm" label-width="auto">
                <el-form-item label="姓名">
                    <el-input v-model="criteriaForm.name" placeholder="姓名" />
                </el-form-item>
                <el-form-item>
                    <el-button class="btn-query" @click="queryData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-button class="btn-create" @click="handleCreate">新增</el-button>
            <el-button class="btn-delete" @click="handleBatchDelete">删除</el-button>
            <el-button class="btn-import" @click="handleImport">导入</el-button>
            <el-button class="btn-export" @click="handleExport">导出</el-button>
        </el-row>
    </div>
    <el-divider />
    <el-table v-loading="tableLoading" @selection-change="handleSelectionChange" :data="tableData" stripe>
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="data in tableColumnList" :prop="data.prop" :label="data.label" min-width="120"
            show-overflow-tooltip />
        <el-table-column align="center" fixed="right" label="操作" min-width="150">
            <template #default="scope">
                <el-row justify="space-around">
                    <el-col :span="6">
                        <el-button class="btn-update-text" size="small" @click="handleUpdate(scope.row)" text>修改</el-button>
                    </el-col>
                    <el-col :span="6">
                        <el-button class="btn-delete-text" size="small" @click="handleDelete(scope.row)" text>删除</el-button>
                    </el-col>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNumber" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
        layout="sizes, prev, pager, next" :total="totalElements" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" background />
</template>
  
<style scoped></style>