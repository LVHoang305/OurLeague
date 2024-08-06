import axiosConfig from '../axiousConfig'

export const apiGetTour = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: '/api/v1/tour/all'
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetTourLimit = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            //url: `/api/v1/tour/limit?page=${page}`
            url: `/api/v1/tour/limit`,
            params: query
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetTourEnded = (page) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/tour/ended?page=${page}`
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetTourUpcoming = (page) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/tour/upcoming?page=${page}`
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetTourOngoing = (page) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/tour/ongoing?page=${page}`
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiCreateTour = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'post',
            url: '/api/v1/tour/create-new',
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetTourLimitAdmin = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            //url: `/api/v1/tour/limit?page=${page}`
            url: `/api/v1/tour/limit-admin`,
            params: query
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiupdateTour = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'put',
            url: `/api/v1/tour/update`,
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apideleteTour = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'delete',
            url: `/api/v1/tour/delete`,
            params: {id}
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiGetTeamJoinTour = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/tour/getteam`,
            params: query
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiteamjointour = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'post',
            url: '/api/v1/tour/team-join-tour',
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apiupdatejointour = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'put',
            url: `/api/v1/tour/update-join-tour`,
            data: payload
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})