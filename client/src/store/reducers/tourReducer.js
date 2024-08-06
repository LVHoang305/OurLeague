import actionTypes from "../actions/actionTypes";

const initState ={
    tours: [],
    msg: '',
    count: 0,
    usertours: []
}

const tourReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_TOURS:
            return {
                ...state,
                tours: action.tours || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        case actionTypes.GET_TOURS_LIMIT:
        case actionTypes.GET_TOURS_ONGOING:
        case actionTypes.GET_TOURS_UPCOMING:
        case actionTypes.GET_TOURS_ENDED:
            return {
                ...state,
                tours: action.tours || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        case actionTypes.GET_TOURS_LIMIT_ADMIN:
            return {
                ...state,
                msg: action.msg || '',
                usertours: action.tours,
                count: action.count || 0
            }
        default:
            return state
    }
}

export default tourReducer