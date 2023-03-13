import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import SpinnerLoader from "../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../contexts/auth.context"
import { MessageContext } from "../contexts/message.context"

const PrivateRoutes = () => {

    const { user, isLoading } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)

    if (isLoading) {
        return <SpinnerLoader />
    }

    if (!user) {
        emitMessage('Must be logged in to access to this page')
        return <Navigate to="/login" />
    }

    return <Outlet />
}


export default PrivateRoutes