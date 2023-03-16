import React from 'react'
import { Col, Row } from 'react-bootstrap'
import QuizCard from '../QuizCard/QuizCard'
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader'

const QuizList = ({ quizzes, fireFinalActions }) => {
    return (
        <Row>
            {
                quizzes.length ?
                    quizzes.map(quiz => {
                        return (
                            <Col md={{ span: 6 }} key={quiz._id} lg={{ span: 6 }} xl={{ span: 4 }}>
                                <QuizCard quiz={quiz} fireFinalActions={fireFinalActions} />
                            </Col>
                        )
                    })
                    :
                    Array.isArray(quizzes) ?
                        <h2>Quizzes not found...</h2>
                        :
                        <SpinnerLoader />
            }
        </Row>
    )
}

export default QuizList