import axiosConfig from '../axiousConfig'

export const apiGetTeam = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: '/api/v1/team/all'
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetTeamLimit = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            //url: `/api/v1/Team/limit?page=${page}`
            url: `/api/v1/team/limit`,
            params: query
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiCreateTeam = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'post',
            url: '/api/v1/team/create-new',
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetTeamLimitAdmin = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            //url: `/api/v1/Team/limit?page=${page}`
            url: `/api/v1/team/limit-admin`,
            params: query
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetTeamLimitbyAdmin = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            //url: `/api/v1/Team/limit?page=${page}`
            url: `/api/v1/team/limit-by-admin`,
            params: query
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiupdateTeam = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'put',
            url: `/api/v1/team/update`,
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apideleteTeam = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'delete',
            url: `/api/v1/team/delete`,
            params: {id}
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetPlayers = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/team/players`,
            params: query
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiCreatePlayer = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'post',
            url: '/api/v1/team/create-new-player',
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiupdatePlayer = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'put',
            url: `/api/v1/team/update-player`,
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apideletePlayer = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'delete',
            url: `/api/v1/team/delete-player`,
            params: {id}
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})