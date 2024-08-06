import actionTypes from './actionTypes'
import { apiGetTour, apiGetTourEnded, apiGetTourLimit, apiGetTourOngoing, apiGetTourUpcoming, apiGetTourLimitAdmin } from '../../services/tour'

export const GetTours = () => async (dispatch) => {
    try {
        const response = await apiGetTour()
        //console.log(response)
        if (response?.data.err === 0){
            dispatch({
                type: actionTypes.GET_TOURS,
                tours: response.data.response
            })
        }else{
            dispatch({
                type: actionTypes.GET_TOURS,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS,
            tours: null
        })
    }
}

export const GetToursLimit = (page) => async (dispatch) => {
    try {
        const response = await apiGetTourLimit(page)
        if (response?.data.err === 0){
            dispatch({
                type: actionTypes.GET_TOURS_LIMIT,
                tours: response.data.response?.rows,
                count: response.data.response?.count
            })
        }else{
            dispatch({
                type: actionTypes.GET_TOURS_LIMIT,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS_LIMIT,
            tours: null
        })
    }
}

export const GetToursUpcoming = (page) => async (dispatch) => {
    try {
        const response = await apiGetTourUpcoming(page)
        if (response?.data.err === 0){
            dispatch({
                type: actionTypes.GET_TOURS_UPCOMING,
                tours: response.data.response?.rows,
                count: response.data.response?.count
            })
        }else{
            dispatch({
                type: actionTypes.GET_TOURS_UPCOMING,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS_UPCOMING,
            tours: null
        })
    }
}

export const GetToursOngoing = (page) => async (dispatch) => {
    try {
        const response = await apiGetTourOngoing(page)
        if (response?.data.err === 0){
            dispatch({
                type: actionTypes.GET_TOURS_ONGOING,
                tours: response.data.response?.rows,
                count: response.data.response?.count
            })
        }else{
            dispatch({
                type: actionTypes.GET_TOURS_ONGOING,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS_ONGOING,
            tours: null
        })
    }
}

export const GetToursEnded = (page) => async (dispatch) => {
    try {
        const response = await apiGetTourEnded(page)
        if (response?.data.err === 0){
            dispatch({
                type: actionTypes.GET_TOURS_ENDED,
                tours: response.data.response?.rows,
                count: response.data.response?.count
            })
        }else{
            dispatch({
                type: actionTypes.GET_TOURS_ENDED,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS_ENDED,
            tours: null
        })
    }
}

export const GetToursLimitAdmin = (staff, page) => async (dispatch) => {
    try {
        const response = await apiGetTourLimitAdmin(staff, page)
        if (response?.data.err === 0){
            dispatch({
                type: actionTypes.GET_TOURS_LIMIT_ADMIN,
                tours: response.data.response?.rows,
                count: response.data.response?.count
            })
        }else{
            dispatch({
                type: actionTypes.GET_TOURS_LIMIT_ADMIN,
                msg: response.data.msg,
                tours: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS_LIMIT_ADMIN,
            tours: null
        })
    }
}