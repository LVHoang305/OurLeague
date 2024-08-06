import * as matchService from '../service/match'

export const deleteMatch = async (req,res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await matchService.deleteMatchService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở match controler ' + error
        })
    }
}

export const getMatch = async (reg,res) => {
    const {...query} = reg.query 
    try {
        const response = await matchService.getMatchService(query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở match controler ' + error
        })
    }
}

export const createMatching = async (reg,res) => {
    try {
        const {teamA, teamB}= reg.body
        if (!teamA || !teamB ) return res.status(400).json({
            err:1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await matchService.createMatchingService(reg.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler ' + error
        })
    }
}

export const updateMatching = async (req,res) => {
    const {id ,...payload} = req.body
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await matchService.updateMatchingService(id, payload)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở match controler ' + error
        })
    }
}

export const getMatching = async (reg,res) => {
    const {...query} = reg.query 
    try {
        const response = await matchService.getMatchingService(query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở match controler ' + error
        })
    }
}

export const createMatch = async (reg,res) => {
    try {
        const {teamA, teamB}= reg.body
        if (!teamA || !teamB ) return res.status(400).json({
            err:1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await matchService.createMatchService(reg.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler ' + error
        })
    }
}

export const updateMatch = async (req,res) => {
    const {id ,...payload} = req.body
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await matchService.updateMatchService(id, payload)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở match controler ' + error
        })
    }
}