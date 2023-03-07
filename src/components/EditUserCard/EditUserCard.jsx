import { useState, useContext } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import usersService from "../../services/users.services"
import { ThemeContext } from "../../contexts/theme.context"
import { AuthContext } from "../../contexts/auth.context"


const EditUserCard = ({ userProfile }) => {
    const navigate = useNavigate()
    const { themeValue } = useContext(ThemeContext)
    const theme = themeValue === 'light' ? 'dark' : 'light'
    const { user } = useContext(AuthContext)

    const { username, email, avatar, _id, role } = userProfile.data
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

        usersService
            .editUserById(_id, editUser)
            .then(() => navigate(`/profile/${_id}`))
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleFormSubmit} >

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="text" value={editUser.username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="email" value={editUser.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="file" name="avatar" />
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

            < div className="d-grid" >
                <Button type="submit" variant={`outline-${theme} mt-4`}>Edit profile</Button>
            </div >

        </Form >
    )
}

export default EditUserCard