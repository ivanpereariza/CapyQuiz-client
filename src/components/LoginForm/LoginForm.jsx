import { useContext, useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate } from 'react-router-dom'
import authService from "../../services/auth.services"
import { ThemeContext } from "../../contexts/theme.context"
import FormError from "../FormError/FormError"
import { MessageContext } from "../../contexts/message.context"

const LoginForm = () => {

    const navigate = useNavigate()

    const [errors, setErrors] = useState([])

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const { authenticateUser, user } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)
    const { themeValue } = useContext(ThemeContext)
    const theme = themeValue === 'light' ? 'dark' : 'light'


    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                emitMessage('Welcome to CapyQuiz!🎉')
                localStorage.setItem('authToken', data.authToken)
                authenticateUser()
                navigate('/')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }
    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="email" value={loginData.email} onChange={handleInputChange} name="email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="password" value={loginData.password} onChange={handleInputChange} name="password" required />
            </Form.Group>

            {errors?.length > 0 && <FormError>{errors.map((elm, idx) => <p key={idx}>{elm}</p>)}</FormError>}

            <div className="d-grid">
                <Button type="submit" variant={`outline-${theme} mt-4`}>Log In</Button>
            </div>

        </Form>)
}

export default LoginForm