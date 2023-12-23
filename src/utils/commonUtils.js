import { ElMessage, ElMessageBox } from 'element-plus'

export function confirmDeletion() {
    return ElMessageBox.confirm(
        '确定要删除吗？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
}

export function presentSelection() {
    return ElMessage({
        message: '请选择数据',
        type: 'error',
    })
}
