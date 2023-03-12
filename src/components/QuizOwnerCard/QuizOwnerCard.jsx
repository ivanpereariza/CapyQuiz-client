import React, { useEffect, useState } from 'react'
import './QuizOwnerCard.css'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import getEstimatedTime from '../../utils/getEstimatedTime'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import quizzesService from '../../services/quizzes.services'
import getAverageRating from '../../utils/getAverageRating'
import { Rating } from '@mui/material'
import { StarOutline } from '@mui/icons-material'

const QuizOwnerCard = ({ quiz, getUserQuizzes }) => {

    const { user } = useContext(AuthContext)
    const { themeValue } = useContext(ThemeContext)
    const themeColor = themeValue === 'light' ? 'dark' : 'light'
    const starColor = themeValue === 'light' ? '' : 'white'

    const [rating, setRating] = useState(0)
    const [ratingLoading, setRatingLoading] = useState(true)


    const { title, theme, description, questionsArr, quizImg, _id, owner } = quiz

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
        setRating(getAverageRating(quiz))
        setRatingLoading(false)
    }, [quiz])

    return (
        <Card className={`${themeValue} card my-3`} style={{ minHeight: '35rem' }}>
            <Card.Body>
                <Card.Img className='mb-3 QuizImg' variant='top' src={quizImg} alt="Quiz Img" />
                <Card.Title className='mb-3'> {title}</Card.Title>
                <Card.Text><b>Theme:</b> {theme}</Card.Text>
                <Card.Text><b>Description:</b> {description}</Card.Text>
                <Card.Text><b>Estimated Time:</b> {time}</Card.Text>
                {
                    !ratingLoading && <Card.Text><Rating emptyIcon={<StarOutline style={{ color: starColor }} />} name="half-rating-read" defaultValue={rating} precision={0.5} readOnly /></Card.Text>
                }
                <hr />
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

            </Card.Body>
        </Card >
    )
}

export default QuizOwnerCard