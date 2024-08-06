import db from '../models'

export const getuser = (username) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: {username},
            raw:true,
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
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

export const getalluser = (username) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.User.findAndCountAll({
            raw:true,
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
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

export const deleteuserService = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.User.destroy({
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

export const updateuser = (id, payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.User.update(payload,{
            where: {id: id}
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