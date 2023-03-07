import React from 'react'
import './QuizCard.css'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import getEstimatedTime from '../../utils/getEstimatedTime'

const QuizCard = ({ quiz, openModalDetails }) => {

    const { themeValue } = useContext(ThemeContext)
    const { title, theme, description, questionsArr, owner, quizImg, _id } = quiz

    const time = getEstimatedTime(questionsArr)


    return (
        <Link onClick={() => openModalDetails(_id)}>
            <Card className={`${themeValue} card my-3`} style={{ height: '35rem' }}>
                <Card.Body>
                    <Card.Img className='mb-3' variant='top' src={quizImg} alt="Quiz Img" />
                    <Card.Title className='mb-4'> {title}</Card.Title>
                    <Card.Text><b>Theme:</b> {theme}</Card.Text>
                    <Card.Text><b>Description:</b> {description}</Card.Text>
                    <Card.Text><b>Estimated Time:</b> {time}</Card.Text>
                    {
                        owner ?
                            <Card.Text><b>Author:</b> {owner?.username} <img className='ownerAvatar' src={`${owner?.avatar}`} alt={owner.username} /></Card.Text>
                            :
                            undefined
                    }
                </Card.Body>
            </Card>
        </Link>
    )
}

export default QuizCard