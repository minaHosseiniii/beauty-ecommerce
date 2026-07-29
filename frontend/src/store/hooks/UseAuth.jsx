import {AuthContext} from "../contexts/AuthContext.js";
import {useContext} from "react";

const UseAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }

    return context;

}

export default UseAuth;