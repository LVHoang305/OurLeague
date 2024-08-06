import actionTypes from './actionTypes'
import { apiGetUser } from '../../services/user'

export const getUser = () => async (dispatch) => {
    try {
        const response = await apiGetUser()
        if (response?.data.err === 0){
            dispatch({
                type: actionTypes.GET_USER,
                userData: response.data.response
            })
        }else{
            dispatch({
                type: actionTypes.GET_USER,
                msg: response.data.msg,
                userData: null
            })
            dispatch({type: actionTypes.LOGOUT})
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_USER,
            userData: null,
            msg: error
        })
        dispatch({type: actionTypes.LOGOUT})
    }
}