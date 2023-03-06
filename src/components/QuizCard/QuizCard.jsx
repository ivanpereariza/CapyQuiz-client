import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const QuizCard = ({ quiz }) => {

    const { title, theme, description, questionsArr } = quiz
    let time = 'mins'
    let estimatedTime = (30 * questionsArr.length) / 60
    if (estimatedTime < 1) {
        estimatedTime *= 60
        time = 'secs'
    }

    return (
        <Link to={`/`}>
            <Card className='my-3'>
                <Card.Body>
                    <Card.Title> {title}</Card.Title>
                    <Card.Text>Theme: {theme}</Card.Text>
                    <Card.Text>Description: {description}</Card.Text>
                    <Card.Text>Estimated Time: {estimatedTime} {time}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default QuizCard