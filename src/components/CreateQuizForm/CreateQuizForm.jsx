import { useContext, useState } from "react"
import { Button, Form, Row } from "react-bootstrap"
import CreateQuestionsQuizForm from "../CreateQuestionsQuizForm/CreateQuestionsQuizForm"
import { AuthContext } from './../../contexts/auth.context'

const CreateQuizForm = () => {

    const { user } = useContext(AuthContext)

    const [createQuiz, setCreateQuiz] = useState({
        title: '',
        theme: '',
        description: '',
        questionsArray: []
    })

    const [createQuestions, setCreateQuestions] = useState({
        question: '',
        correctAnswer: ''
    })

    const [answerOptionsValue, setAnswerOptionsValue] = useState(['', '', ''])

    const handleInputChange = e => {
        const { name, value } = e.target
        setCreateQuiz({ ...createQuiz, [name]: value })

    }

    return (
        <Form >
            <Form.Group className="mb-3" controlId="title" >
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" name="title" value={createQuiz.title} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="theme" >
                <Form.Label>Theme:</Form.Label>
                <Form.Control type="text" name="theme" value={createQuiz.theme} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control type="text" name="description" value={createQuiz.description} onChange={handleInputChange} />
            </Form.Group>

            <CreateQuestionsQuizForm createQuestions={createQuestions} answerOptionsValue={answerOptionsValue}
                setCreateQuestions={setCreateQuestions} setAnswerOptionsValue={setAnswerOptionsValue} />

            <Button variant="dark" type="submit">Create Quiz</Button>
        </Form>
    )
}

export default CreateQuizForm