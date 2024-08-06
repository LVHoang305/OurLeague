import * as LocationService from '../service/location'

export const getLocations = async (reg,res) => {
    try {
        const response = await LocationService.getLocationsService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Thất bại ở location controler' + error
        })
    }
}