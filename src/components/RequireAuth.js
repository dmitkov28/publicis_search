
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

export default function PrivateRoute() {
    const { loggedIn, checkingStatus } = useAuthStatus()


    if (checkingStatus) {
        return
    }

    return loggedIn ? <Outlet /> : <Navigate to='/login' />

}