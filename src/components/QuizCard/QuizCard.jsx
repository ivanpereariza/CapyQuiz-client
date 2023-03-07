import React from 'react'
import './QuizCard.css'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"

const QuizCard = ({ quiz, openModalDetails }) => {

    const { themeValue } = useContext(ThemeContext)
    const { title, theme, description, questionsArr, owner, quizImg, _id } = quiz

    let time = 'mins'
    let estimatedTime = (30 * questionsArr.length) / 60
    if (estimatedTime < 1) {
        estimatedTime *= 60
        time = 'secs'
    }

    return (
        <Link onClick={() => openModalDetails(_id)}>
            <Card className={`${themeValue} card my-3`}>
                <Card.Body>
                    <Card.Img className='mb-3' variant='top' src={quizImg} alt="Quiz Img" />
                    <Card.Title className='mb-4'> {title}</Card.Title>
                    <Card.Text>Theme: {theme}</Card.Text>
                    <Card.Text>Description: {description}</Card.Text>
                    <Card.Text>Estimated Time: {estimatedTime} {time}</Card.Text>
                    {
                        owner ?
                            <Card.Text>Author: {owner?.username} <img className='ownerAvatar' src={`${owner?.avatar}`} alt={owner.username} /></Card.Text>
                            :
                            undefined
                    }
                </Card.Body>
            </Card>
        </Link>
    )
}

export default QuizCard