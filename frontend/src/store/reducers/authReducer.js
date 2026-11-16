import {LOGIN_SUCCESS, LOGOUT, UPDATE_USER} from "../actions/AuthActionTypes.js";

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

        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}