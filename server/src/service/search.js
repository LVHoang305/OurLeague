import db from '../models'
import { Op } from "sequelize"

export const getsearchLimitService = (offset, query) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Tournament.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${query}%`
                }
            },
            raw:true,
            nest: true,
            offset: offset*1 || 0,
            limit: 1,
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