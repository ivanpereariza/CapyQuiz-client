import React from 'react'
import { Accordion, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader'
import './../QuizDetails/QuizDetails.css'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import getEstimatedTime from '../../utils/getEstimatedTime'
import Comments from '../Comments/Comments'
import { ModalQuizContext } from '../../contexts/modalQuiz.context'

const QuizDetails = ({ quiz }) => {

    const { themeValue } = useContext(ThemeContext)
    const { setShowModalDetails } = useContext(ModalQuizContext)

    const theme = themeValue === 'light' ? 'dark' : 'light'

    const time = getEstimatedTime(quiz?.questionsArr)

    return (
        <Container className='d-flex justify-content-center'>
            {
                quiz ?
                    <div className='justify-content-center'>
                        <img className='QuizDetailsImg d-block mx-auto' src={quiz.quizImg} alt={quiz.title} />
                        <h3 className='my-4'> {quiz.title}</h3>
                        <p><b>Theme:</b> {quiz.theme}</p>
                        <p><b>Description:</b> {quiz.description}</p>
                        <p><b>Questions:</b> {quiz.questionsArr.length}</p>
                        <p><b>Estimated Time:</b> {time}</p>
                        {
                            quiz.owner ?
                                <div className='d-flex justify-content-start'>
                                    <p className='pt-2'><b>Author:</b> {quiz.owner.username}</p>
                                    <Link to={`/profile/${quiz.owner._id}`} className='d-grid mb-5' >
                                        <img className={`${themeValue} ownerAvatar `} src={`${quiz.owner.avatar}`} alt={quiz.owner.username} />
                                    </Link>
                                </div>
                                :
                                undefined
                        }

                        <Link to={`/quizzes/play/${quiz._id}`} className='d-grid mb-5' >
                            <Button type="submit" onClick={() => setShowModalDetails(false)} variant={`outline-${theme} mt-4`}>Start Game!</Button>
                        </Link>

                        <Comments quizId={quiz._id} />


                    </div>
                    :
                    <SpinnerLoader />
            }

        </Container >
    )
}

export default QuizDetails