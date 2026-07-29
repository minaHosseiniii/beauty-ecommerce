import { useReducer } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { authReducer } from "../reducers/authReducer.js";
import { LOGIN_SUCCESS, LOGOUT } from "../actions/AuthActionTypes.js";

const initialAuthState = {
    token: null,
    user: null,
    isAuthenticated: false
};

const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(
        authReducer,
        initialAuthState
    );

    const loginSuccess = (token, user) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token,
                user
            }
        });
    };

    const logout = () => {
        dispatch({
            type: LOGOUT
        });
    };

    return (
        <AuthContext.Provider
            value={{
                authState,
                loginSuccess,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;