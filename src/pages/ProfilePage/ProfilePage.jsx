import { useParams } from "react-router-dom"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import './ProfilePage.css'
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import { AuthContext } from '../../contexts/auth.context'
import { Link, useNavigate } from 'react-router-dom'
import usersService from '../../services/users.services'
import QuizOwnerCard from '../../components/QuizOwnerCard/QuizOwnerCard'

const ProfilePage = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const { themeValue } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        getUserWithQuizzes()
    }, [id])


    const getUserWithQuizzes = () => {
        usersService
            .getFullUserInfo(id)
            .then(({ data }) => setUserProfile(data))
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
            <Container>
                <Row className='justify-content-center py-4'>
                    <Col md={{ span: 5 }} style={{ position: 'fixed', top: 200, left: 170 }}>
                        <Card className={`ProfileCard ${themeValue} card my-5 text-center`}  >
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
                                            <hr className={`${themeValue} hr`} />
                                            <Link to={`/profile/edit/${id}`} className='d-grid mb-3' >
                                                <Button className='mx-4' type="submit" variant='warning' >Edit User</Button>
                                            </Link>
                                            <Link onClick={deleteUser} className='d-grid'  >
                                                <Button className='mx-4' type="submit" variant='danger' >Delete User</Button>
                                            </Link>
                                        </>
                                        :
                                        undefined
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{ span: 7, offset: 5 }}>
                        {
                            userProfile.quizzesDone.length ?
                                <Row className='justify-content-center'>
                                    <h2 className='text-center'>Quizzes by {userProfile.username}</h2>
                                    <hr className={`${themeValue} hr`} />
                                    {
                                        userProfile?.quizzesDone.map(quiz => {
                                            return (
                                                <Col md={{ span: 6 }} key={quiz._id}>
                                                    <QuizOwnerCard quiz={quiz} />
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                                :
                                undefined
                        }
                    </Col>
                </Row>
            </Container>
            :
            <SpinnerLoader />
    )
}

export default ProfilePage