import customAxios from '@/api/axios'

export function getDict(dictType) {
    customAxios.get('/dict', {
        params: {
            dictType
        }
    })
}