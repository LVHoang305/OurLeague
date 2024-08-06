import db from '../models'

export const getLocationsService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Location.findAll({
            raw:true,
            attributes: ['id', 'name']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Đọc dữ liệu khu vực thất bại',
            response
        })

    } catch (error) {
        reject(error)
    }
})