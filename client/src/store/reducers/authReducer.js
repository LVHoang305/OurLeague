import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedin: false,
    token: null,
    msg: '',
    update: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedin: true,
                token: action.data,
                msg: ''
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedin: true,
                token: action.data,
                msg: ''
            }
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                isLoggedin: true,
                token: action.data,
                msg: ''
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedin: false,
                msg: action.data,
                token: null,
                update: !state.update
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedin: false,
                token: null,
                msg: ''
            }
        default:
            return state;
    }
}

export default authReducer
