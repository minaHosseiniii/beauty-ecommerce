import {LOGIN_SUCCESS, LOGOUT} from "../actions/AuthActionTypes.js";

export function authReducer(state,action) {
    console.log(action.type);
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true
            };

        case LOGOUT:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false
            };
        default:
            return state;
    }
}