<script setup>
import { ref, reactive, onMounted } from 'vue';
import CodegenTableColumnInfo from './CodegenTableColumnInfo.vue';
import customAxios from '@/api/axios'
import { systemCodegenGenerate, systemCodegenPage } from '@/api/system/systemCodegenApi'

const criteriaData = reactive({})
const pageNumber = ref(1)
const pageSize = ref(10)
const totalElements = ref(0)
const tableLoading = ref(false)
const tableData = ref([])
const selectedTableData = ref([])
const selectedData = ref({})
const detailVisible = ref(false)

onMounted(() => {
    listTableData()
})

const listTableData = () => {
    tableLoading.value = true
    customAxios.get(systemCodegenPage, {
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

const closeDetail = () => {
    detailVisible.value = false
}

const handleSelectionChange = (selection) => {
    selectedTableData.value = selection
}

const handleDetail = (row) => {
    detailVisible.value = true
    selectedData.value = row
}

const handleGenerate = (row) => {
    customAxios.post(systemCodegenGenerate + '/' + row.name, {}, {
        responseType: 'blob'
    })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'codegen.zip');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
        })
        .finally(() => {
        })
}
</script>

<template>
    <el-container class="wrapper">
        <el-main>
            <CodegenTableColumnInfo v-if="detailVisible" :dialogVisible="detailVisible" :formData="selectedData"
                @closeDetail="closeDetail" />
            <div class="table-criteria">
                <el-row>
                    <el-form :inline="true" :model="criteriaData" label-width="auto">
                        <el-form-item label="表名">
                            <el-input v-model="criteriaData.name" placeholder="表名" />
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="listTableData">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
            <el-divider />
            <div class="table-wrapper">
                <el-table v-loading="tableLoading" @selection-change="handleSelectionChange" :data="tableData" stripe>
                    <el-table-column type="selection" fixed="left" width="55" />
                    <el-table-column prop="name" label="表名" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="comment" label="备注" min-width="120" show-overflow-tooltip />
                    <el-table-column align="center" fixed="right" label="操作" width="150">
                        <template #default="scope">
                            <el-row justify="space-around">
                                <el-col :span="6">
                                    <el-button class="btn-update-text" size="small" @click="handleDetail(scope.row)" text>
                                        详情
                                    </el-button>
                                </el-col>
                                <el-col :span="6">
                                    <el-button class="btn-update-text" size="small" @click="handleGenerate(scope.row)" text>
                                        生成
                                    </el-button>
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