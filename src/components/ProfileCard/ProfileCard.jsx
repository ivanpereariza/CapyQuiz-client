import { Button, Card, Container, Row } from 'react-bootstrap'
import './ProfileCard.css'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import { AuthContext } from '../../contexts/auth.context'
import { Link, useNavigate } from 'react-router-dom'
import usersService from '../../services/users.services'
const ProfileCard = ({ userProfile }) => {

    const navigate = useNavigate()
    const { data } = userProfile
    const { avatar, role, points, username, _id } = data

    const { themeValue } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    const deleteUser = (_id) => {
        usersService
            .deleteUserById(_id)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Card className={`ProfileCard ${themeValue} card mt-5`}>
                    <Card.Img variant="top" className='AvatarImg' src={avatar} alt={username} />
                    <Card.Body>
                        <Card.Title>{username}</Card.Title>
                        <Card.Text>
                            Points: {points}
                        </Card.Text>
                        <Card.Text className='mb-4'>
                            Role: {role}
                        </Card.Text>
                        {
                            user?.role === 'ADMIN' ?
                                <>
                                    <Link to={`/profile/edit/${_id}`} >
                                        <Button className='mx-4' type="submit" variant='warning' >Edit User</Button>
                                    </Link>
                                    <Link onClick={() => deleteUser(_id)}  >
                                        <Button className='mx-4' type="submit" variant='danger' >Delete User</Button>
                                    </Link>
                                </>
                                :
                                undefined
                        }
                    </Card.Body>
                </Card>
            </Row>
        </Container >
    )
}

export default ProfileCard
