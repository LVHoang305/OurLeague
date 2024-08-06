import db from '../models'

export const countteamsService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Team.count({
            raw:true,
            nest: true,
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Đọc dữ liệu giải đấu thất bại',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const counttourService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Tournament.count({
            raw:true,
            nest: true,
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Đọc dữ liệu giải đấu thất bại',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const countplayersService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Player.count({
            raw:true,
            nest: true,
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Đọc dữ liệu giải đấu thất bại',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const countmatchService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Match.count({
            raw:true,
            nest: true,
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Đọc dữ liệu giải đấu thất bại',
            response
        })

    } catch (error) {
        reject(error)
    }
})