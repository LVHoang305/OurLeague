import axiosConfig from '../axiousConfig'

export const apiGetLocation = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: '/api/v1/location/all'
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})