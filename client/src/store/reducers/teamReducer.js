import actionTypes from "../actions/actionTypes";

const initState ={
    teams: [],
    msg: '',
    count: 0,
    userteams: []
}

const teamReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_TOURS:
            return {
                ...state,
                teams: action.teams || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        case actionTypes.GET_TEAMS_LIMIT_ADMIN:
            return {
                ...state,
                msg: action.msg || '',
                userteams: action.teams || [],
                count: action.count || 0
            }
        default:
            return state
    }
}

export default teamReducer