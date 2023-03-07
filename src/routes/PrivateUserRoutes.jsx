import { useContext, useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import SpinnerLoader from "../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../contexts/auth.context"

const PrivateRoutes = () => {

    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <SpinnerLoader />
    }

    if (!user) {

        return <Navigate to="/login" />
    }

    return <Outlet />
}


export default PrivateRoutes