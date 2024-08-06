import * as homeService from '../service/homepage'

export const countTours = async (reg,res) => {
    try {
        const response = await homeService.counttourService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở home controler' + error
        })
    }
}

export const countTeams = async (reg,res) => {
    try {
        const response = await homeService.countteamsService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở home controler' + error
        })
    }
}

export const countPlayer = async (reg,res) => {
    try {
        const response = await homeService.countplayersService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở home controler' + error
        })
    }
}

export const countmatch = async (reg,res) => {
    try {
        const response = await homeService.countmatchService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở home controler' + error
        })
    }
}