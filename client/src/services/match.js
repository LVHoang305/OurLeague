import axiosConfig from '../axiousConfig'

export const apideleteMatch = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'delete',
            url: `/api/v1/match/delete`,
            params: {id}
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetMatch = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/match/get`,
            params: query
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apicreateMatch = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'post',
            url: '/api/v1/match/create',
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiupdateMatching = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'put',
            url: `/api/v1/match/update-matching`,
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetMatching = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/match/get-matching`,
            params: query
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apicreateMatching = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'post',
            url: '/api/v1/match/create-matching',
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiupdateMatch = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'put',
            url: `/api/v1/match/update`,
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})