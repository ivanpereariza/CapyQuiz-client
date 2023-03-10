import { useState, useContext, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import usersService from "../../services/users.services"
import { ThemeContext } from "../../contexts/theme.context"
import { AuthContext } from "../../contexts/auth.context"
import uploadServices from "../../services/upload.services"
import authService from "../../services/auth.services"
import FormError from "../FormError/FormError"


const EditUserCard = ({ userProfile }) => {

    const navigate = useNavigate()
    const { themeValue } = useContext(ThemeContext)
    const theme = themeValue === 'light' ? 'dark' : 'light'
    const { user, authenticateUser } = useContext(AuthContext)


    const { username, email, avatar, _id, role } = userProfile.data

    useEffect(() => {
        setEditUser({
            username,
            email,
            avatar,
            role
        })
    }, [userProfile])

    const [errors, setErrors] = useState([])

    const [editUser, setEditUser] = useState({
        username,
        email,
        avatar,
        role
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setEditUser({ ...editUser, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        const formData = new FormData()
        formData.append('imageData', e.target.imageData.files[0])

        uploadServices
            .uploadImage(formData)
            .then(({ data }) => usersService.editUserById(_id, { ...editUser, avatar: data.cloudinary_url }))
            .then(({ data }) => {
                if (user.role !== "ADMIN" || user._id === _id) {
                    localStorage.setItem('authToken', data.authToken)
                    authenticateUser()
                    navigate(`/profile/${_id}`)
                }
                navigate(`/profile/${_id}`)
            })
            .catch(err => setErrors(err.response.data.errorMessages))

    }

    return (
        <Form onSubmit={handleFormSubmit} >

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="text" value={editUser.username} onChange={handleInputChange} name="username" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="email" value={editUser.email} onChange={handleInputChange} name="email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageData">
                <Form.Label>Avatar:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="file" name="imageData" />
            </Form.Group>
            {
                user.role === 'ADMIN' ?
                    <Form.Group className="mb-3" controlId="role">
                        <Form.Label>Role: </Form.Label>
                        <Form.Select className={`${themeValue} secondary`} value={editUser.role} onChange={handleInputChange} name='role'>
                            <option value="USER">USER</option>
                            <option value="EDITOR">EDITOR</option>
                            <option value="ADMIN">ADMIN</option>
                        </Form.Select>
                    </Form.Group>

                    :
                    undefined
            }

            {errors.length > 0 && <FormError>{errors.map((elm, idx) => <p key={idx}>{elm}</p>)}</FormError>}


            < div className="d-grid" >
                <Button type="submit" variant={`outline-${theme} mt-4`}>Edit profile</Button>
            </div >

        </Form >
    )
}

export default EditUserCard