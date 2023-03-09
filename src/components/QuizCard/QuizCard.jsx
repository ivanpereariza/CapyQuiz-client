import React from 'react'
import './QuizCard.css'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import getEstimatedTime from '../../utils/getEstimatedTime'
import quizzesService from '../../services/quizzes.services'

const QuizCard = ({ quiz, openModalDetails, user, fireFinalActions }) => {
    const navigate = useNavigate()
    const { themeValue } = useContext(ThemeContext)
    const themeColor = themeValue === 'light' ? 'dark' : 'light'

    const { title, theme, description, questionsArr, owner, quizImg, _id } = quiz

    const time = getEstimatedTime(questionsArr)

    const deleteQuiz = (_id) => {
        quizzesService
            .deleteQuizById(_id)
            .then(() => {
                fireFinalActions()
                navigate(`/quizzes`)
            })
            .catch(err => console.log(err))
    }


    return (

        <Card className={`${themeValue} card my-3`} style={{ minHeight: '35rem' }}>
            <Card.Body>
                <Link onClick={() => openModalDetails(_id)}>
                    <Card.Img className='mb-3 QuizImg' variant='top' src={quizImg} alt="Quiz Img" />
                    <Card.Title className={`text-${themeColor} mb-4`} > {title}</Card.Title>
                    <Card.Text className={`text-${themeColor}`}><b>Theme:</b> {theme}</Card.Text>
                    <Card.Text className={`text-${themeColor}`}><b>Description:</b> {description}</Card.Text>
                    <Card.Text className={`text-${themeColor}`}><b>Estimated Time:</b> {time}</Card.Text>
                    {
                        owner ?
                            <Card.Text className={`text-${themeColor} mb-4`}><b>Author:</b> {owner?.username} <img className='ownerAvatar' src={`${owner?.avatar}`} alt={owner.username} /></Card.Text>
                            :
                            undefined
                    }
                </Link >
                {
                    user?.role === 'ADMIN' || user?.role === 'EDITOR' ?
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

export default QuizCard