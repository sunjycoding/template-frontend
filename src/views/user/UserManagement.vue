<script setup>
import { reactive, ref, onMounted } from 'vue'
import customAxios from '@/api/axios'
import UserForm from './UserForm.vue';

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
    {
        prop: "createdDate",
        label: "创建时间",
    },
    {
        prop: "createdDate",
        label: "创建时间",
    },
    {
        prop: "createdDate",
        label: "创建时间",
    },
    {
        prop: "createdDate",
        label: "创建时间",
    },
    {
        prop: "createdDate",
        label: "创建时间",
    },
    {
        prop: "createdDate",
        label: "创建时间",
    },
    {
        prop: "createdDate",
        label: "创建时间",
    },
]

const currentPage = ref(1)

const pageSize = ref(10)

const dialogVisible = ref(false)

const dialogTitle = ref(null)

const selectedData = ref({})

const tableLoading = ref(false)

const tableData = ref([])

const criteriaForm = reactive({
    name: '',
})

onMounted(() => {
    listTableData()
})

const handleSizeChange = () => {

}

const handleCurrentChange = () => {

}

const listTableData = () => {
    tableLoading.value = true
    customAxios.get('/users/page', criteriaForm)
        .then(response => {
            tableData.value = response.data.content
        })
        .catch(error => {
        })
        .finally(() => {
            tableLoading.value = false;
        });
}

const handleSelectionChange = (selection) => {
    console.log(selection);
}

const queryData = () => {
    listTableData()
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

const handleDelete = () => {

}

const handleImport = () => {

}

const handleExport = () => {

}
</script>

<template>
    <UserForm :dialogVisible="dialogVisible" :title="dialogTitle" :selectedData="selectedData"
        @closeDialog="dialogVisible = $event" @refreshTableData="listTableData" />
    <div class=" criteria-wrapper">
        <el-row>
            <el-form :inline="true" :model="criteriaForm" label-width="auto">
                <el-form-item label="姓名">
                    <el-input v-model="criteriaForm.name" placeholder="姓名" clearable />
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="criteriaForm.name" placeholder="用户姓名" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button class="btn-query" @click="queryData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-button class="btn-create" @click="handleCreate">新增</el-button>
            <el-button class="btn-delete" @click="handleDelete">删除</el-button>
            <el-button class="btn-import" @click="handleImport">导入</el-button>
            <el-button class="btn-export" @click="handleExport">导出</el-button>
        </el-row>
    </div>
    <el-divider />
    <el-table v-loading="tableLoading" @selection-change="handleSelectionChange" :data="tableData" stripe>
        <el-table-column type="selection" width="55" />
        <el-table-column v-for=" data  in  tableColumnList " :prop="data.prop" :label="data.label" min-width="120"
            show-overflow-tooltip />
        <el-table-column align="center" fixed="right" label="操作" min-width="150">
            <template #default="scope">
                <el-row justify="space-around">
                    <el-col :span="6">
                        <el-link class="link-update" @click="handleUpdate(scope.row)">修改</el-link>
                    </el-col>
                    <el-col :span="6">
                        <el-link class="link-delete" @click="handleDelete(scope.row)">删除</el-link>
                    </el-col>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
        layout="sizes, prev, pager, next" :total="50" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        background />
</template>
  
<style scoped></style>