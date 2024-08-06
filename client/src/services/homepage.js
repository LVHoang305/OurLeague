import axiosConfig from '../axiousConfig'

export const apicounttour = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/home/tour`
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apicountteam = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/home/team`
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apicountplayer = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/home/player`
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})

export const apicountmatch = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/home/match`
        })
        resolve(response)
        
    } catch (error) {
        reject(error)
        
    }
})