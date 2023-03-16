import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import SpinnerLoader from "../components/SpinnerLoader/SpinnerLoader"
import { MessagesConstants } from "../consts"
import { AuthContext } from "../contexts/auth.context"
import { MessageContext } from "../contexts/message.context"

const PrivateRoutes = () => {

    const { user, isLoading } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)

    if (isLoading) {
        return <SpinnerLoader />
    }

    if (!user) {
        emitMessage(MessagesConstants.MUST_LOGGED)
        return <Navigate to="/login" />
    }

    return <Outlet />
}


export default PrivateRoutes