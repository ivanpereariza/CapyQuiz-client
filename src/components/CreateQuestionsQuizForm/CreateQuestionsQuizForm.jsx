import { useState } from "react"
import { Col, Form, Row } from "react-bootstrap"

const CreateQuestionsQuizForm = ({ createQuestions, answerOptionsValue, setCreateQuestions, setAnswerOptionsValue }) => {




    const handleInputChange = e => {

        const { name, value } = e.target

        setAnswerOptionsValue([...answerOptionsValue, [name] = value])
        setCreateQuestions({ ...createQuestions, [name]: value })
    }

    return (
        <>
            <Form.Group className="mb-3" controlId="question">
                <Form.Label>Question:</Form.Label>
                <Form.Control type="text" name="question" value={createQuestions.question} onChange={handleInputChange} />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="correctAnswer">
                    <Form.Label>Correct answer:</Form.Label>
                    <Form.Control type="text" name="correctAnswer" value={createQuestions.correctAnswer} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="answerOption1">
                    <Form.Label>Answer option 1:</Form.Label>
                    <Form.Control type="text" name="answersOptions1" value={answerOptionsValue[0]} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="answerOption2">
                    <Form.Label>Answer option 2:</Form.Label>
                    <Form.Control type="url" name="answersOptions2" value={answerOptionsValue[1]} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="answerOption3">
                    <Form.Label>Answer option 3:</Form.Label>
                    <Form.Control type="url" name="answersOptions3" value={answerOptionsValue[2]} onChange={handleInputChange} />
                </Form.Group>
            </Row>
        </>

    )
}

export default CreateQuestionsQuizForm