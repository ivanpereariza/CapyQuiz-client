import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authService from "../../services/auth.services"
import { ThemeContext } from "../../contexts/theme.context"


const SignupForm = () => {

    const navigate = useNavigate()
    const { themeValue } = useContext(ThemeContext)

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

    // const submitImage = e => {
    //     const data = new FormData()
    //     data.append("file", signupData.avatar)

    //     cloudinaryService
    //         .uploadFile(e.avatar)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // }

    // const handleImgChange = e => {
    //     const { files, name } = e.target
    //     submitImage({ ...signupData, [name]: files[0] })
    // }

    const handleFormSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => navigate('/login'))
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="text" value={signupData.username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="email" value={signupData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="password" value={signupData.password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar:</Form.Label>
                <Form.Control type="file" name="avatar" />
            </Form.Group>


            <div className="d-grid">
                <Button type="submit" variant="outline-light mt-4">Signup</Button>

            </div>

        </Form>)
}

export default SignupForm