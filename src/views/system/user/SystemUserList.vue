<script setup>
import { ref, reactive, onMounted } from 'vue';
import SystemUserForm from './SystemUserForm.vue';
import { confirmDeletion, presentSelection } from '@/utils/commonUtils'
import customAxios from '@/api/axios'
import { systemUser, systemUserPage } from '@/api/system/systemUserApi'

const criteriaData = reactive({})
const pageNumber = ref(1)
const pageSize = ref(10)
const totalElements = ref(0)
const tableLoading = ref(false)
const tableData = ref([])
const selectedTableData = ref([])
const selectedData = ref({})
const dialogVisible = ref(false)
const dialogTitle = ref('')

onMounted(() => {
    listTableData()
})

const listTableData = () => {
    tableLoading.value = true
    customAxios.get(systemUserPage, {
        params: {
            pageNumber: pageNumber.value,
            pageSize: pageSize.value,
            ...criteriaData
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

const handleSizeChange = (value) => {
    pageSize.value = value
    pageNumber.value = 1
    listTableData()
}

const handleCurrentChange = (value) => {
    pageNumber.value = value
    listTableData()
}

const closeDialog = () => {
    dialogVisible.value = false
}

const handleCreate = () => {
    selectedData.value = {}
    dialogVisible.value = true
    dialogTitle.value = '新增'
}

const handleUpdate = (row) => {
    selectedData.value = JSON.parse(JSON.stringify(row))
    dialogVisible.value = true
    dialogTitle.value = '修改'
}

const handleDelete = (row) => {
    confirmDeletion()
        .then(() => {
            customAxios.delete(systemUser + '/' + row.id)
                .then(response => {
                    listTableData()
                })
                .catch(error => {
                })
        }).catch(() => {
        })

}

const handleBatchDelete = () => {
    if (selectedTableData.value.length) {
        const idList = selectedTableData.value.map(data => data.id)
        confirmDeletion().then(() => {
            customAxios.delete(systemUser, {
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

const handleSelectionChange = (selection) => {
    selectedTableData.value = selection
}
</script>

<template>
    <el-container class="wrapper">
        <el-aside width="auto">
            <el-row>
                <el-form :inline="true" :model="criteriaData">
                    <el-form-item>
                        <el-input prefix-icon="search" v-model="criteriaData.name" placeholder="部门" />
                    </el-form-item>
                </el-form>
            </el-row>
        </el-aside>
        <el-main>
            <SystemUserForm v-if="dialogVisible" :dialogVisible="dialogVisible" :title="dialogTitle"
                :formData="selectedData" @closeDialog="closeDialog" @refreshTableData="listTableData" />
            <div class="table-criteria">
                <el-row>
                    <el-form :inline="true" :model="criteriaData" label-width="auto">
                        <el-form-item label="姓名">
                            <el-input v-model="criteriaData.name" placeholder="姓名" />
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="listTableData">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
                <el-row>
                    <el-button @click="handleCreate">新增</el-button>
                    <el-button @click="handleBatchDelete">删除</el-button>
                </el-row>
            </div>
            <el-divider />
            <div class="table-wrapper">
                <el-table v-loading="tableLoading" @selection-change="handleSelectionChange" :data="tableData" stripe>
                    <el-table-column type="selection" fixed="left" width="55" />
                    <el-table-column prop="username" label="用户名" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="name" label="姓名" min-width="120" show-overflow-tooltip />
                    <el-table-column align="center" prop="enabled" label="启用状态" min-width="120" show-overflow-tooltip>
                        <template #default="scope">
                            <el-tag :type="scope.row.enabled ? '' : 'danger'">{{ scope.row.enabled ? '激活' : '禁用'
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gender" label="性别" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="phone" label="手机" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="department" label="部门" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="position" label="岗位" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="lastModifiedBy" label="修改人" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="lastModifiedDate" label="修改时间" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="createdBy" label="创建人" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="createdDate" label="创建时间" min-width="120" show-overflow-tooltip />
                    <el-table-column align="center" fixed="right" label="操作" min-width="150">
                        <template #default="scope">
                            <el-row justify="space-around">
                                <el-col :span="6">
                                    <el-button class="btn-update-text" size="small" @click="handleUpdate(scope.row)"
                                        text>修改</el-button>
                                </el-col>
                                <el-col :span="6">
                                    <el-button class="btn-delete-text" size="small" @click="handleDelete(scope.row)"
                                        text>删除</el-button>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination v-model:current-page="pageNumber" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
                layout="sizes, prev, pager, next" :total="totalElements" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" background />
        </el-main>
    </el-container>
</template>

<style scoped></style>