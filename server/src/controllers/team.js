import * as teamService from '../service/team'

export const getTeams = async (reg,res) => {
    try {
        const response = await teamService.getteamsService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở team controler' + error
        })
    }
}

export const createNewTeam = async (reg,res) => {
    try {
        const {name, owner, coach, phone, email }= reg.body
        if (!name || !owner || !coach || !phone || !email) return res.status(400).json({
            err:1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await teamService.createNewTeamService(reg.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const getTeamLimitAdmin = async (req,res) => {
    const {page, owner, ...query} = req.query 
    try {
        if (!owner) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await teamService.getteamLimitAdminService(page, owner, query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở team controler' + error
        })
    }
}

export const getTeamLimitbyAdmin = async (req,res) => {
    const {page, ...query} = req.query 
    try {
        const response = await teamService.getteamLimitAdminService(page, query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở team controler' + error
        })
    }
}

export const updateteam = async (req,res) => {
    const {id ,...payload} = req.body
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await teamService.updateTeamService(id, payload)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở team controler' + error
        })
    }
}

export const deleteteam = async (req,res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await teamService.deleteTeamService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở team controler' + error
        })
    }
}


export const getplayers = async (reg,res) => {
    const {team} = reg.query 
    try {
        const response = await teamService.getplayersService(team)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const createNewPlayer = async (reg,res) => {
    try {
        const {name, team, height, weight, number, phone }= reg.body
        if (!name || !team || !height || !weight || !number || !phone) return res.status(400).json({
            err:1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await teamService.createNewPlayerService(reg.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const updateplayer = async (req,res) => {
    const {id ,...payload} = req.body
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await teamService.updatePlayerService(id, payload)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở team controler' + error
        })
    }
}

export const deleteplayer = async (req,res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await teamService.deletePlayerService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở team controler' + error
        })
    }
}