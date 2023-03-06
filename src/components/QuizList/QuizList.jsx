import React from 'react'
import { Col, Row } from 'react-bootstrap'
import QuizCard from '../QuizCard/QuizCard'

const QuizList = ({ quizzes }) => {
    return (
        <Row>
            {
                quizzes.map(quiz => {
                    return (
                        <Col md={{ span: 3 }} key={quiz._id}>
                            <QuizCard quiz={quiz} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default QuizList