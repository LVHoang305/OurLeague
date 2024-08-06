import db from '../models'
import { Op } from "sequelize"

export const deleteMatchService = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Match.destroy({
            where: {id: id},
        })
        resolve({
            err:  response[0] > 0 ? 0 : 1 ,
            msg: response[0] > 0 ? 'Đã xóa':'Xóa thất bại',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const getMatchService = (query) => new Promise(async(resolve, reject) => {
    try {
        const queries = { ...query }
        const response = await db.Match.findAndCountAll({
            where: queries,
            raw:true,
            nest: true,
            include: [
                {model: db.Team, as: 'TeamA'},
                {model: db.Team, as: 'TeamB'}
            ]
            //attributes: ''
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

export const createMatchService = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Match.create({
            ...body
        })
        resolve({
            err:  0 ,
            msg: 'OK',

        })

    } catch (error) {
        reject(error)
    }
})

export const updateMatchService = (id, payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Match.update(payload,{
            where: { id: id}
        })
        resolve({
            err:  response[0] > 0 ? 0 : 1 ,
            msg: response[0] > 0 ? 'Đã update':'Update thất bại',
            response

        })

    } catch (error) {
        reject(error)
    }
})


export const getMatchingService = (query) => new Promise(async(resolve, reject) => {
    try {
        const queries = { ...query }
        const response = await db.Matching.findAndCountAll({
            where: queries,
            raw:true,
            nest: true,
            include: [
                {model: db.Team, as: 'DetailTeam'},
            ]
            //attributes: ''
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

export const createMatchingService = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Matching.create({
            ...body
        })
        resolve({
            err:  0 ,
            msg: 'OK',

        })

    } catch (error) {
        reject(error)
    }
})

export const updateMatchingService = (id, payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Matching.update(payload,{
            where: { id: id}
        })
        resolve({
            err:  response[0] > 0 ? 0 : 1 ,
            msg: response[0] > 0 ? 'Đã update':'Update thất bại',
            response

        })

    } catch (error) {
        reject(error)
    }
})