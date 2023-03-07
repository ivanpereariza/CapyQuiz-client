import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import getEstimatedTime from '../../utils/getEstimatedTime'
import { Link } from 'react-router-dom'

const QuizOwnerCard = ({ quiz }) => {

    const { themeValue } = useContext(ThemeContext)
    const themeColor = themeValue === 'light' ? 'dark' : 'light'
    const { title, theme, description, questionsArr, quizImg, _id } = quiz

    const time = getEstimatedTime(questionsArr)

    return (
        <Card className={`${themeValue} card my-3`} style={{ height: '35rem' }}>
            <Card.Body>
                <Card.Img className='mb-3' variant='top' src={quizImg} alt="Quiz Img" />
                <Card.Title className='mb-4'> {title}</Card.Title>
                <Card.Text><b>Theme:</b> {theme}</Card.Text>
                <Card.Text><b>Description:</b> {description}</Card.Text>
                <Card.Text><b>Estimated Time:</b> {time}</Card.Text>
                <hr />
                <Link to={`/quizzes/play/${quiz._id}`} className='d-grid mb-5' >
                    <Button type="submit" variant={`outline-${themeColor} mt-4`}>Start Game!</Button>
                </Link>
                <Link to={`/quizzes/edit/${quiz._id}`} className='d-grid mb-5' >
                    <Button type="submit" variant={`outline-${themeColor} mt-4`}>Edit Quiz</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default QuizOwnerCard