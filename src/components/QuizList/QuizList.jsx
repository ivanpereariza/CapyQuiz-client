import React from 'react'
import { Col, Row } from 'react-bootstrap'
import QuizCard from '../QuizCard/QuizCard'

const QuizList = ({ quizzes, openModalDetails }) => {
    return (
        <Row>
            {
                quizzes.map(quiz => {
                    return (
                        <Col md={{ span: 4 }} key={quiz._id}>
                            <QuizCard openModalDetails={openModalDetails} quiz={quiz} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default QuizList