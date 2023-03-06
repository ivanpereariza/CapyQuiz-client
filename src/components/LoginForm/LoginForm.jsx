import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate } from 'react-router-dom'
import authService from "../../services/auth.services"
import { ThemeContext } from "../../contexts/theme.context"

const LoginForm = () => {

    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const { authenticateUser, user } = useContext(AuthContext)
    const { themeValue } = useContext(ThemeContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                localStorage.setItem('authToken', data.authToken)
                authenticateUser()
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="email" value={loginData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="password" value={loginData.password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <div className="d-grid">
                <Button type="submit" variant="outline-light mt-4">Login</Button>
            </div>

        </Form>)
}

export default LoginForm