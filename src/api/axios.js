import axios from 'axios'

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
    return response.data
}, error => {
    return Promise.reject(error)
})

export default customAxios