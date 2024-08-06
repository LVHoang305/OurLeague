import db from '../models'
import { Op } from "sequelize"

export const getteamsService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Team.findAndCountAll({
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

export const createNewTeamService = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Team.create({
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

export const getteamLimitAdminService = (offset, id, query) => new Promise(async(resolve, reject) => {
    try {
        const queries = { ...query, owner:id }

        const response = await db.Team.findAndCountAll({
            where: queries,
            raw:true,
            nest: true,
            offset: (offset-1)*+process.env.LIMIT || 0,
            limit: +process.env.LIMIT,
            include: [
                {model: db.User, as: 'ownerdetail', attributes: ['firstName','lastName'] },    
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

export const getteamLimitbyAdminService = (offset, query) => new Promise(async(resolve, reject) => {
    try {
        const queries = { ...query}

        const response = await db.Team.findAndCountAll({
            where: queries,
            raw:true,
            nest: true,
            offset: (offset-1)*+process.env.LIMIT || 0,
            limit: +process.env.LIMIT,
            include: [
                {model: db.User, as: 'ownerdetail', attributes: ['firstName','lastName'] },    
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

export const updateTeamService = (id, payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Team.update(payload,{
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

export const deleteTeamService = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Team.destroy({
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

export const getplayersService = (team) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Player.findAndCountAll({
            where: {team: team},
            raw:true
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

export const createNewPlayerService = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Player.create({
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

export const updatePlayerService = (id, payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Player.update(payload,{
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

export const deletePlayerService = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Player.destroy({
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