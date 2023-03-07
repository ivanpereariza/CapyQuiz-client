import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import getEstimatedTime from '../../utils/getEstimatedTime'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const QuizOwnerCard = ({ quiz }) => {

    const { themeValue } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)
    const themeColor = themeValue === 'light' ? 'dark' : 'light'
    const { title, theme, description, questionsArr, quizImg, _id, owner } = quiz

    const time = getEstimatedTime(questionsArr)

    return (
        <Card className={`${themeValue} card my-3`} style={{ height: '35rem' }}>
            <Card.Body>
                <Card.Img className='mb-3' variant='top' src={quizImg} alt="Quiz Img" />
                <Card.Title className='mb-3'> {title}</Card.Title>
                <Card.Text><b>Theme:</b> {theme}</Card.Text>
                <Card.Text><b>Description:</b> {description}</Card.Text>
                <Card.Text><b>Estimated Time:</b> {time}</Card.Text>
                <hr />
                <Link to={`/quizzes/play/${_id}`} className='d-grid ' >
                    <Button type="submit" variant={`outline-${themeColor} mb-3`}>Start Game!</Button>
                </Link>
                {
                    user.role === 'ADMIN' || user.role === 'EDITOR' || user._id === owner._id ?
                        <Link to={`/quizzes/edit/${_id}`} className='d-grid ' >
                            <Button type="submit" variant={`outline-${themeColor} `}>Edit Quiz</Button>
                        </Link>
                        :
                        undefined
                }

            </Card.Body>
        </Card>
    )
}

export default QuizOwnerCard