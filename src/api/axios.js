import axios from 'axios'
import { ElMessage } from 'element-plus'

const customAxios = axios.create({
    baseURL: '/template/api',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
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

customAxios.interceptors.response.use(response => {
    if (response.data?.code === 0) {
        return response.data
    } else {
        ElMessage({
            message: response.data?.message || '系统错误，请联系管理员',
            type: 'error',
        })
    }

}, error => {
    return Promise.reject(error)
})

export default customAxios