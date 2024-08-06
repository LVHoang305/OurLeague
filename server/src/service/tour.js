import db from '../models'
import { Op } from "sequelize"

export const gettoursService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Tournament.findAndCountAll({
            raw:true,
            nest: true,
            include: [
                {model: db.Location, as: 'tlocation', attributes: ['name'] },
                //{model: db.Team}
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

export const gettoursLimitService = (offset, query, {name}) => new Promise(async(resolve, reject) => {
    try {
        const queries = { ...query }
        if (name) queries.name = {[Op.like]: `%${name}%`}
        const response = await db.Tournament.findAndCountAll({
            where: queries,
            raw:true,
            nest: true,
            offset: (offset-1)*+process.env.LIMIT || 0,
            limit: +process.env.LIMIT,
            include: [
                {model: db.Location, as: 'tlocation', attributes: ['name'] },
                {model: db.User, as: 'staffdetail', attributes: ['firstName', 'lastName']}
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

export const gettoursendedService = (offset) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Tournament.findAndCountAll({
            where: {
                end: {
                    [Op.lt]: new Date()
                }
            },
            raw:true,
            nest: true,
            offset: (offset-1)*+process.env.LIMIT || 0,
            limit: +process.env.LIMIT,
            include: [
                {model: db.Location, as: 'tlocation', attributes: ['name'] }
            ]
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

export const gettoursupcomingService = (offset) => new Promise(async(resolve, reject) => {
    if (offset ===0) {offset = 1}
    try {
        const response = await db.Tournament.findAndCountAll({
            where: {
                begin: {
                    [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            },
            raw:true,
            nest: true,
            offset: (offset-1)*+process.env.LIMIT || 0,
            limit: +process.env.LIMIT,
            include: [
                {model: db.Location, as: 'tlocation', attributes: ['name'] }
            ]
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

export const gettoursongoingService = (offset) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Tournament.findAndCountAll({
            where: {
                [Op.and]: [
                    {
                        begin: {
                            [Op.lt]: new Date()
                        }
                    },
                    {
                        end: {
                            [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
                        }
                    }
            ]
            },
            raw:true,
            nest: true,
            offset: (offset-1)*+process.env.LIMIT || 0,
            limit: +process.env.LIMIT,
            include: [
                {model: db.Location, as: 'tlocation', attributes: ['name'] }
            ]
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

export const createNewTourService = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Tournament.create({
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

export const gettoursLimitAdminService = (offset, id, query) => new Promise(async(resolve, reject) => {
    try {
        const queries = { ...query, staff:id }

        const response = await db.Tournament.findAndCountAll({
            where: queries,
            raw:true,
            nest: true,
            offset: (offset-1)*+process.env.LIMIT || 0,
            limit: +process.env.LIMIT,
            include: [
                {model: db.Location, as: 'tlocation', attributes: ['name'] }
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

export const updateTourService = (id, payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Tournament.update(payload,{
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

export const deleteTourService = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Tournament.destroy({
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

export const getteamjointourService = (query) => new Promise(async(resolve, reject) => {
    try {
        const queries = { ...query }
        const response = await db.jointour.findAndCountAll({
            where: queries,
            raw:true,
            nest: true,
            include: [
                {model: db.Team, as: 'team'}
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

export const teamjointourService = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.jointour.create({
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

export const updatejointourService = (id, payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.jointour.update(payload,{
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