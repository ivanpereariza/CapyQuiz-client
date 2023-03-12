import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import './ProfileCard.css'
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import { AuthContext } from '../../contexts/auth.context'
import { Link, useNavigate } from 'react-router-dom'
import usersService from '../../services/users.services'
import quizzesService from '../../services/quizzes.services'
import QuizOwnerCard from '../QuizOwnerCard/QuizOwnerCard'

const ProfileCard = ({ userProfile }) => {

    const navigate = useNavigate()
    const { data } = userProfile
    const { avatar, role, points, username, _id } = data

    const { themeValue } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    const [quizzes, setQuizzes] = useState([])

    useEffect(() => {
        getUserQuizzes()
    }, [])

    const getUserQuizzes = () => {
        quizzesService
            .getQuizByOwner(_id)
            .then(({ data }) => setQuizzes(data))
            .catch(err => console.log(err))
    }

    const deleteUser = (_id) => {
        usersService
            .deleteUserById(_id)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Card className={`ProfileCard ${themeValue} card my-5 text-center`}>
                    <Card.Img variant="top" className='AvatarImg' src={avatar} alt={username} />
                    <Card.Body>
                        <Card.Title>{username}</Card.Title>
                        <Card.Text>
                            Points: {points}
                        </Card.Text>
                        {
                            user?.role === 'ADMIN' ?
                                <>
                                    <Card.Text className='mb-4'>
                                        Role: {role}
                                    </Card.Text>
                                    <hr />
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
            {
                quizzes.length ?
                    <Row className='justify-content-center'>
                        <h2 className='text-center'>Quizzes by {username}</h2>
                        <hr />
                        {
                            quizzes.map(quiz => {
                                return (
                                    <Col md={{ span: 4 }} key={quiz._id}>
                                        <QuizOwnerCard quiz={quiz} getUserQuizzes={getUserQuizzes} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    :
                    undefined
            }

        </Container >
    )
}

export default ProfileCard
