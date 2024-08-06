import * as tourService from '../service/tour'

export const getTours = async (reg,res) => {
    try {
        const response = await tourService.gettoursService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const getToursLimit = async (reg,res) => {
    const {page,name, ...query} = reg.query 
    try {
        const response = await tourService.gettoursLimitService(page, query, {name})
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const getToursended = async (reg,res) => {
    const {page} = reg.query
    try {
        const response = await tourService.gettoursendedService(page)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const getToursupcoming = async (reg,res) => {
    const {page} = reg.query
    try {
        const response = await tourService.gettoursupcomingService(page)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const getToursongoing = async (reg,res) => {
    const {page} = reg.query
    try {
        const response = await tourService.gettoursongoingService(page)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const createNewTour = async (reg,res) => {
    try {
        const {name, location, begin, end, type,staff }= reg.body
        if (!name || !location || !begin || !end || !type || !staff) return res.status(400).json({
            err:1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await tourService.createNewTourService(reg.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const getToursLimitAdmin = async (req,res) => {
    const {page, staff, ...query} = req.query 
    try {
        if (!staff) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await tourService.gettoursLimitAdminService(page, staff, query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const updateTour = async (req,res) => {
    const {id ,...payload} = req.body
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await tourService.updateTourService(id, payload)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const deleteTour = async (req,res) => {
    const {id} = req.query
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await tourService.deleteTourService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const getteamjointour = async (reg,res) => {
    const {...query} = reg.query 
    try {
        const response = await tourService.getteamjointourService(query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const teamjointour = async (reg,res) => {
    try {
        const {tourid, teamid, state }= reg.body
        if (!tourid || !teamid ) return res.status(400).json({
            err:1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await tourService.teamjointourService(reg.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}

export const updatejointour = async (req,res) => {
    const {id ,...payload} = req.body
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Thiếu dữ liệu'
        })
        const response = await tourService.updatejointourService(id, payload)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}