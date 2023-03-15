import React, { useEffect, useState } from 'react'
import './QuizOwnerCard.css'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import getEstimatedTime from '../../utils/getEstimatedTime'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import quizzesService from '../../services/quizzes.services'
import StarRating from '../StarRating/StarRating'

const QuizOwnerCard = ({ quiz, getUserQuizzes }) => {

    const { user } = useContext(AuthContext)
    const { themeValue, theme: themeColor } = useContext(ThemeContext)

    const [ratingLoading, setRatingLoading] = useState(true)


    const { title, theme, description, questionsArr, quizImg, _id, owner, ratingAvg } = quiz

    const time = getEstimatedTime(questionsArr)
    const navigate = useNavigate()

    const deleteQuiz = (_id) => {
        quizzesService
            .deleteQuizById(_id)
            .then(() => {
                getUserQuizzes()
                navigate(`/profile/${user._id}`)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        setRatingLoading(false)
    }, [quiz])

    return (
        <Card className={`${themeValue} card my-3`} style={{ minHeight: '40rem' }}>
            <Card.Body className='d-flex flex-column justify-content-between'>
                <div className='mt-0'>
                    <Card.Img className='mb-3 QuizImg' variant='top' src={quizImg} alt="Quiz Img" />
                    <Card.Title className='mb-3'> {title}</Card.Title>
                    <Card.Text><b>Theme:</b> {theme}</Card.Text>
                    <Card.Text><b>Description:</b> {description}</Card.Text>
                    <Card.Text><b>Estimated Time:</b> {time}</Card.Text>
                    {
                        !ratingLoading && <StarRating fireFinalActions={false} readOnly={true} rating={ratingAvg} />

                    }
                </div>
                <div>
                    <hr className={`${themeValue} hr`} />
                    <Link to={`/quizzes/play/${_id}`} className='d-grid ' >
                        <Button type="submit" variant={`outline-${themeColor} mb-3`}>Start Game!</Button>
                    </Link>
                    {
                        user.role === 'ADMIN' || user.role === 'EDITOR' || user._id === owner._id ?
                            <Row>
                                <Col md={{ span: 6 }}>
                                    <Link to={`/quizzes/edit/${_id}`} className='d-grid ' >
                                        <Button type="submit" variant={`warning `}>Edit Quiz</Button>
                                    </Link>
                                </Col>
                                <Col md={{ span: 6 }}>
                                    <Link onClick={() => deleteQuiz(_id)} className='d-grid ' >
                                        <Button type="submit" variant={`danger `}>Delete Quiz</Button>
                                    </Link>
                                </Col>
                            </Row>
                            :
                            undefined
                    }
                </div>

            </Card.Body>
        </Card >
    )
}

export default QuizOwnerCard