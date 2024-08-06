import axiosConfig from '../axiousConfig'

export const apiSearchLimit = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/tour/limit`,
            params: query
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})