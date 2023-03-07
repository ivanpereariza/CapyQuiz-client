import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import usersService from "../../services/users.services"

const EditUserCard = ({ user }) => {
    const navigate = useNavigate()

    const { username, email, avatar, _id } = user.data
    const [editUser, setEditUser] = useState({
        username,
        email,
        avatar
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
        <Form onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={editUser.username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={editUser.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar:</Form.Label>
                <Form.Control type="file" name="avatar" />
            </Form.Group>

            <div className="d-grid">
                <Button type="submit" variant="outline-light mt-4">Edit profile</Button>

            </div>

        </Form>
    )
}

export default EditUserCard