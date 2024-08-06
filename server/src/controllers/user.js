import * as userService from '../service/user'

export const getUsers = async (reg,res) => {
    const {username} = reg.user
    try {
        const response = await userService.getuser(username)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở user controler' + error
        })
    }
}

export const getallUsers = async (reg,res) => {
    try {
        const response = await userService.getalluser()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở user controler' + error
        })
    }
}

export const deleteUser = async (req,res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await userService.deleteuserService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở user controler' + error
        })
    }
}

export const updateUser = async (req,res) => {
    const {id ,...payload} = req.body
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await userService.updateuser(id, payload)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}