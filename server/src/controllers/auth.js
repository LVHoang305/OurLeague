import * as authService from "../service/auth"

export const register = async (reg, res) => {
    const {username, password, phone} = reg.body
    try {
        if (!username || !password || !phone) return res.status(400).json({
            err: 1,
            msg: 'Thieu du lieu'
        })
        const response = await authService.registerService(reg.body)
        return res.status(200).json(response)    

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail o register controller'+error
        })
    }
}

export const login = async (reg, res) => {
    const {username, password} = reg.body
    try {
        if (!username || !password) return res.status(400).json({
            err: 1,
            msg: 'Thieu du lieu'
        })
        const response = await authService.loginService(reg.body)
        return res.status(200).json(response)    

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail o login controller'+error
        })
    }
}