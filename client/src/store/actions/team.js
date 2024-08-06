import actionTypes from './actionTypes'
import { apiGetTeamLimitAdmin} from '../../services/team'

export const GetTeamsLimitAdmin = (staff, page) => async (dispatch) => {
    try {
        const response = await apiGetTeamLimitAdmin(staff, page)
        if (response?.data.err === 0){
            dispatch({
                type: actionTypes.GET_TEAMS_LIMIT_ADMIN,
                teams: response.data.response?.rows,
                count: response.data.response?.count
            })
        }else{
            dispatch({
                type: actionTypes.GET_TEAMS_LIMIT_ADMIN,
                msg: response.data.msg,
                teams: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TEAMS_LIMIT_ADMIN,
            teams: null
        })
    }
}