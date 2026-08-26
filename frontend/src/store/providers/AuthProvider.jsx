import { useReducer } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { authReducer } from "../reducers/authReducer.js";
import { LOGIN_SUCCESS, LOGOUT } from "../actions/AuthActionTypes.js";

const initialAuthState = {
    token: sessionStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") || "null"),
    isAuthenticated: !!sessionStorage.getItem("token")
};

const AuthProvider = ({ children }) => {
    console.count("AuthProvider");

    const [authState, dispatch] = useReducer(
        authReducer,
        initialAuthState
    );

    const loginSuccess = (token, user) => {
        sessionStorage.setItem("token", token);
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                token,
                user
            }
        });
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        localStorage.removeItem("user");
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