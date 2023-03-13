import { useParams } from "react-router-dom"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import './ProfilePage.css'
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import { AuthContext } from '../../contexts/auth.context'
import { Link, useNavigate } from 'react-router-dom'
import usersService from '../../services/users.services'
import quizzesService from '../../services/quizzes.services'
import QuizOwnerCard from '../../components/QuizOwnerCard/QuizOwnerCard'

const ProfilePage = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const { themeValue } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    const [quizzes, setQuizzes] = useState([])
    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        getUserQuizzes()
    }, [])

    useEffect(() => {
        usersService
            .getUserById(id)
            .then(({ data }) => setUserProfile(data))
            .catch(err => console.log(err))
    }, [id])

    const getUserQuizzes = () => {
        quizzesService
            .getQuizByOwner(id)
            .then(({ data }) => setQuizzes(data))
            .catch(err => console.log(err))
    }

    const deleteUser = () => {
        usersService
            .deleteUserById(id)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }


    return (
        userProfile ?
            <Container className='mt-4'>
                <Row className='justify-content-center'>
                    <Card className={`ProfileCard ${themeValue} card my-5 text-center`}>
                        <Card.Img variant="top" className='AvatarImg' src={userProfile.avatar} alt={userProfile.username} />
                        <Card.Body>
                            <Card.Title>{userProfile.username}</Card.Title>
                            <Card.Text>
                                Points: {userProfile.points}
                            </Card.Text>
                            {
                                user?.role === 'ADMIN' ?
                                    <>
                                        <Card.Text className='mb-4'>
                                            Role: {userProfile.role}
                                        </Card.Text>
                                        <hr />
                                        <Link to={`/profile/edit/${id}`} >
                                            <Button className='mx-4' type="submit" variant='warning' >Edit User</Button>
                                        </Link>
                                        <Link onClick={deleteUser}  >
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
                            <h2 className='text-center'>Quizzes by {userProfile.username}</h2>
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
            :
            <SpinnerLoader />
    )
}

export default ProfilePage