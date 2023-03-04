import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"

const CreateQuestionsQuizForm = ({ index, handleQuestionChange, handleAnswerOptionChange, question, handleRemoveQuestion }) => {


    return (
        <>
            <h3>Question {index + 1}</h3>
            <Form.Group className="mb-3" controlId={`question-${index}`} >
                <Form.Label>Question:</Form.Label>
                <Form.Control type="text" name="question" value={question.question} onChange={(event) => handleQuestionChange(event, index)} required />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId={`correctAnswer-${index}`}>
                    <Form.Label>Correct answer:</Form.Label>
                    <Form.Control type="text" name="correctAnswer" value={question.correctAnswer} onChange={(event) => handleQuestionChange(event, index)} required />
                </Form.Group>

                <Form.Group as={Col} controlId={`answersOptions-${index}-0`}>
                    <Form.Label>Answer option 1:</Form.Label>
                    <Form.Control type="text" name="answersOptions1" value={question.answersOptions[0]} onChange={(event) => handleAnswerOptionChange(event, index, 0)} required />
                </Form.Group>

                <Form.Group as={Col} controlId={`answersOptions-${index}-1`}>
                    <Form.Label>Answer option 2:</Form.Label>
                    <Form.Control type="text" name="answersOptions2" value={question.answersOptions[1]} onChange={(event) => handleAnswerOptionChange(event, index, 1)} required />
                </Form.Group>

                <Form.Group as={Col} controlId={`answersOptions-${index}-2`}>
                    <Form.Label>Answer option 3:</Form.Label>
                    <Form.Control type="text" name="answersOptions3" value={question.answersOptions[2]} onChange={(event) => handleAnswerOptionChange(event, index, 2)} required />
                </Form.Group>
            </Row>

            <Button variant="dark" type="button" onClick={() => handleRemoveQuestion(index)}>Delete question</Button>
        </>

    )
}

export default CreateQuestionsQuizForm