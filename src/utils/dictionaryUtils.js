import customAxios from '@/api/axios'

export function getDict() {
    customAxios.get('/dictionaries', {
        params: {
            dictionaryName
        }
    })
}