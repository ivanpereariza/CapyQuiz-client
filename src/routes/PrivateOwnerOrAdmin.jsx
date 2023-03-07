import { useContext, useEffect } from "react"
import { Outlet, Navigate, useParams } from "react-router-dom"
import SpinnerLoader from "../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../contexts/auth.context"

const PrivateOwnerOrAdminRoutes = () => {

    const { id } = useParams()

    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <SpinnerLoader />
    }

    if (!user) {

        return <Navigate to="/login" />

    } else if (user._id === id || user.role === "ADMIN") {

        return <Outlet />

    } else return <Navigate to="/" />
}


export default PrivateOwnerOrAdminRoutes