import { useContext, useEffect, useState } from "react"
import { Button, Form, Row } from "react-bootstrap"
import quizzesService from "../../services/quizzes.services"
import CreateQuestionsQuizForm from "../CreateQuestionsQuizForm/CreateQuestionsQuizForm"
import { AuthContext } from './../../contexts/auth.context'

const CreateQuizForm = () => {

    const { user } = useContext(AuthContext)



    const [generalData, setGeneralData] = useState({
        title: '',
        theme: '',
        description: '',
        owner: undefined
    })

    useEffect(() => {
        setGeneralData({ ...generalData, owner: user?._id })
    }, [user])

    const [questionsArr, setQuestionsArr] = useState([{
        question: '',
        correctAnswer: '',
        answersOptions: ['', '', '']
    },])

    const handleGeneralChange = e => {
        const { name, value } = e.target
        setGeneralData({ ...generalData, [name]: value })
    }
    const handleQuestionChange = (e, index) => {
        const { name, value } = e.target
        const updatedQuestionsArr = [...questionsArr]
        updatedQuestionsArr[index] = { ...updatedQuestionsArr[index], [name]: value }
        setQuestionsArr(updatedQuestionsArr)
    }
    const handleAddQuestion = () => {
        const newArr = [...questionsArr]
        newArr.push({ question: '', correctAnswer: '', answersOptions: ['', '', ''] })
        setQuestionsArr(newArr)
    }
    const handleRemoveQuestion = index => {
        const updatedQuestionsArr = [...questionsArr]
        updatedQuestionsArr.splice(index, 1)
        setQuestionsArr(updatedQuestionsArr)
    }
    const handleAnswerOptionChange = (e, questionIndex, optionIndex) => {
        const { value } = e.target
        const updatedQuestionsArr = [...questionsArr]
        updatedQuestionsArr[questionIndex].answersOptions[optionIndex] = value
        setQuestionsArr(updatedQuestionsArr)
    }
    const handleSubmit = e => {
        e.preventDefault()

        quizzesService
            .createNewQuiz({ ...generalData, questionsArr })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }



    return (
        <Form className="mb-5" onSubmit={handleSubmit} >
            <Form.Group className="mb-3" controlId="title" >
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" name="title" value={generalData.title} onChange={handleGeneralChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="theme" >
                <Form.Label>Theme:</Form.Label>
                <Form.Control type="text" name="theme" value={generalData.theme} onChange={handleGeneralChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control type="text" name="description" value={generalData.description} onChange={handleGeneralChange} required />
            </Form.Group>

            <Button variant="dark" type="button" onClick={handleAddQuestion}>Add question</Button>

            {
                questionsArr.map((question, index) => {
                    return <CreateQuestionsQuizForm key={index} index={index} question={question} handleQuestionChange={handleQuestionChange} handleAnswerOptionChange={handleAnswerOptionChange} handleRemoveQuestion={handleRemoveQuestion} />
                })
            }

            <Button variant="dark" type="submit">Create Quiz</Button>

        </Form>
    )
}

export default CreateQuizForm
