import router from '@/router';
import axios from 'axios'
import { ElMessage } from 'element-plus'

const customAxios = axios.create({
    baseURL: '/template/api',
    timeout: 10000,
    headers: {}
})

customAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
}, error => {
    return Promise.reject(error)
})

const defaultMessage = '系统错误，请联系管理员'
customAxios.interceptors.response.use(response => {
    const contentType = response.headers['content-type'];
    if (contentType && contentType.includes('application/json')) {
        if (response.data?.code === 0) {
            return response.data
        } else {
            ElMessage({
                message: response.data?.message || defaultMessage,
                type: 'error',
            })
        }
        return
    }
    return response

}, error => {
    const status = error.response.status
    let message = defaultMessage
    switch (status) {
        case 401:
            message = error.response.data?.message || '权限认证失败，请联系管理员'
            break;
        case 500:
            message = error.response.data?.message || '系统无响应，请联系管理员'
            break;
        default:
            break
    }
    ElMessage({
        message: message,
        type: 'error',
    })
    return Promise.reject(error)
})

export default customAxios