import { Button, Col, Form, Row } from "react-bootstrap"
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"

const QuestionsQuizForm = ({ index, handleQuestionChange, handleAnswerOptionChange, question, handleRemoveQuestion }) => {
    const { themeValue } = useContext(ThemeContext)

    return (
        <>
            <hr className="mt-4" />
            <h3>Question {index + 1}    <Button variant="danger" type="button" className=" mx-3 rounded-circle text-light" onClick={() => handleRemoveQuestion(index)}>Ｘ</Button></h3>
            <Form.Group className="mb-3" controlId={`question-${index}`} >
                <Form.Control className={`${themeValue} secondary`} placeholder="Question" type="text" name="question" value={question.question} onChange={(event) => handleQuestionChange(event, index)} required />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId={`correctAnswer-${index}`}>
                    <Form.Control className={`${themeValue} secondary`} placeholder="Correct answer" type="text" name="correctAnswer" value={question.correctAnswer} onChange={(event) => handleQuestionChange(event, index)} required />
                </Form.Group>

                <Form.Group as={Col} controlId={`answersOptions-${index}-0`}>
                    <Form.Control className={`${themeValue} secondary`} placeholder="Answer option" type="text" name="answersOptions1" value={question.answersOptions[0]} onChange={(event) => handleAnswerOptionChange(event, index, 0)} required />
                </Form.Group>

                <Form.Group as={Col} controlId={`answersOptions-${index}-1`}>
                    <Form.Control className={`${themeValue} secondary`} placeholder="Answer option" type="text" name="answersOptions2" value={question.answersOptions[1]} onChange={(event) => handleAnswerOptionChange(event, index, 1)} required />
                </Form.Group>

                <Form.Group as={Col} controlId={`answersOptions-${index}-2`}>
                    <Form.Control className={`${themeValue} secondary`} placeholder="Answer option" type="text" name="answersOptions3" value={question.answersOptions[2]} onChange={(event) => handleAnswerOptionChange(event, index, 2)} required />
                </Form.Group>
            </Row>
        </>

    )
}

export default QuestionsQuizForm