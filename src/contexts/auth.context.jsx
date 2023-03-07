import { createContext, useEffect, useState } from "react"
import authService from "../services/auth.services"

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const authenticateUser = () => {

        const token = localStorage.getItem('authToken')

        if (token) {
            authService
                .verify(token)
                .then(({ data }) => {
                    setUser(data)
                    setIsLoading(false)
                })
                .catch(err => logout())
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setUser(null)
        setIsLoading(false)
    }

    const checkLocalStorage = () => {
        if (!localStorage.getItem('authToken')) setIsLoading(false)
    }

    useEffect(() => {
        checkLocalStorage()
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ authenticateUser, user, logout, isLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }