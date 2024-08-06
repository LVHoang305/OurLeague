import axios from '../axiousConfig'

export const apiGetUser = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            method:'get',
            url: '/api/v1/user/get-user',
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetAllUser = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            method:'get',
            url: '/api/v1/user/get-all-user',
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apideleteuser = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            method:'delete',
            url: `/api/v1/user/delete`,
            params: {id}
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiupdateUser = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            method:'put',
            url: '/api/v1/user/update-user',
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})