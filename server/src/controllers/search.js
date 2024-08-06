import * as searchService from '../service/search'

export const getsearchsLimit = async (reg,res) => {
    const {page, search} = reg.body
    try {
        const response = await searchService.getsearchLimitService(page,search)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở tour controler' + error
        })
    }
}