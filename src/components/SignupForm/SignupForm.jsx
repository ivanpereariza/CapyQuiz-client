import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authService from "../../services/auth.services"
import { ThemeContext } from "../../contexts/theme.context"
import uploadServices from "../../services/upload.services"
import FormError from "../FormError/FormError"


const SignupForm = () => {

    const navigate = useNavigate()
    const { themeValue } = useContext(ThemeContext)
    const theme = themeValue === 'light' ? 'dark' : 'light'

    const [errors, setErrors] = useState([])

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }


    const handleFormSubmit = e => {

        e.preventDefault()

        const formData = new FormData()
        formData.append('imageData', e.target.imageData.files[0])

        uploadServices
            .uploadImage(formData)
            .then(({ data }) => authService.signup({ ...signupData, avatar: data.cloudinary_url }))
            .then(() => navigate('/login'))
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    return (
        <Form onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="text" value={signupData.username} onChange={handleInputChange} name="username" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="email" value={signupData.email} onChange={handleInputChange} name="email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="password" value={signupData.password} onChange={handleInputChange} name="password" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageData">
                <Form.Label>Avatar:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="file" name="imageData" />
            </Form.Group>

            {errors.length > 0 && <FormError>{errors.map((elm, idx) => <p key={idx}>{elm}</p>)}</FormError>}

            <div className="d-grid">
                <Button type="submit" variant={`outline-${theme} mt-4`}>Sign Up</Button>

            </div>

        </Form>
    )
}

export default SignupForm