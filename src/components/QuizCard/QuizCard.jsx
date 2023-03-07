import React from 'react'
import './QuizCard.css'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"

const QuizCard = ({ quiz }) => {

    const { themeValue } = useContext(ThemeContext)
    const { title, theme, description, questionsArr, owner, quizImg } = quiz
    let time = 'mins'
    let estimatedTime = (30 * questionsArr.length) / 60
    if (estimatedTime < 1) {
        estimatedTime *= 60
        time = 'secs'
    }

    return (
        <Link to={`/`}>
            <Card className={`${themeValue} card my-3`}>
                <Card.Body>
                    <Card.Img className='mb-3' variant='top' src={quizImg} alt="Quiz Img" />
                    <Card.Title className='mb-4'> {title}</Card.Title>
                    <Card.Text>Theme: {theme}</Card.Text>
                    <Card.Text>Description: {description}</Card.Text>
                    <Card.Text>Estimated Time: {estimatedTime} {time}</Card.Text>
                    <Card.Text>Author: {owner.username} <img className='ownerAvatar' src={`${owner.avatar}`} alt="owner avatar" /></Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default QuizCard