import {Navigate, Outlet, useLocation} from "react-router-dom";
import UseAuth from "../store/hooks/UseAuth.jsx";
import {useEffect} from "react";

const ProtectedRoute = () => {
    const {authState} = UseAuth();
    const location = useLocation();
    const isAuthenticated = authState.isAuthenticated;



    useEffect(() => {
        if (!authState.isAuthenticated && location.pathname !== "/login") {
            sessionStorage.setItem("redirectPath", location.pathname);
        }
    }, [authState.isAuthenticated, location.pathname]);

    if (isAuthenticated) {
        return <Outlet/>;
    }

    return <Navigate to="/login" replace/>
}

export default ProtectedRoute;