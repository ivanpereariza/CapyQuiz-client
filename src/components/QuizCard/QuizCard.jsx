import React, { useEffect, useState } from 'react'
import './QuizCard.css'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import getEstimatedTime from '../../utils/getEstimatedTime'
import quizzesService from '../../services/quizzes.services'
import { AuthContext } from '../../contexts/auth.context'
import StarRating from '../StarRating/StarRating'
import { ModalQuizContext } from '../../contexts/modalQuiz.context'


const QuizCard = ({ quiz, fireFinalActions }) => {

    const navigate = useNavigate()
    const { themeValue, theme: themeColor } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)
    const { openModalDetails } = useContext(ModalQuizContext)

    const { title, theme, questionsArr, quizImg, _id, ratingAvg, owner } = quiz

    const time = getEstimatedTime(questionsArr)
    const [played, setPlayed] = useState(false)

    useEffect(() => {
        checkIfPlayed()
    }, [user])

    const deleteQuiz = (_id) => {
        quizzesService
            .deleteQuizById(_id)
            .then(() => {
                fireFinalActions()
                navigate(`/quizzes`)
            })
            .catch(err => console.log(err))
    }

    const checkIfPlayed = () => {
        user?.quizzes.map(elm => {
            return elm.quiz === _id && setPlayed(true)
        })
    }


    return (

        <Card className={`${themeValue} card ${played && 'played'} my-3`} style={{ height: '32rem' }}>
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Link onClick={() => openModalDetails(_id)} >
                    <Card.Img className='mb-3 QuizImg' variant='top' src={quizImg} alt="Quiz Img" />
                    <Card.Title className={`text-${themeColor} mb-4`} > {title}</Card.Title>
                    <Card.Text className={`text-${themeColor}`}><b>Theme:</b> {theme}</Card.Text>
                    <Card.Text className={`text-${themeColor}`}><b>Estimated Time:</b> {time}</Card.Text>
                    <StarRating fireFinalActions={false} readOnly={true} rating={ratingAvg} />
                    {
                        played && <p className={`text-${themeColor} text-center fs-4`}><b>Played ✓</b></p>
                    }
                </Link >
                <div>
                    {
                        user?.role === 'ADMIN' || user?.role === 'EDITOR' || user?._id === owner ?
                            <Row >
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

export default QuizCard