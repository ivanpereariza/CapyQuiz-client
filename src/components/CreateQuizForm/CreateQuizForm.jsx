import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import quizzesService from "../../services/quizzes.services"
import QuestionsQuizForm from "../QuestionsQuizForm/QuestionsQuizForm"
import { ThemeContext } from "../../contexts/theme.context"
import uploadServices from "../../services/upload.services"

const CreateQuizForm = ({ fireFinalActions }) => {

    const { themeValue } = useContext(ThemeContext)

    const [generalData, setGeneralData] = useState({
        title: '',
        theme: '',
        description: '',
        avatar: '',
    })

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

        questionsArr.map(elm => elm.answersOptions.push(elm.correctAnswer))

        const formData = new FormData()
        formData.append('imageData', e.target.imageData.files[0])

        uploadServices
            .uploadImage(formData)
            .then(({ data }) => quizzesService.createNewQuiz({ ...generalData, questionsArr, quizImg: data.cloudinary_url }))
            .then(() => fireFinalActions())
            .catch(err => console.log(err))
    }



    return (
        <Form className="mb-5" onSubmit={handleSubmit} >
            <Form.Group className="mb-3" controlId="title" >
                <Form.Label>Title:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="text" name="title" value={generalData.title} onChange={handleGeneralChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageData">
                <Form.Label>Quiz image:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="file" name="imageData" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="theme" >
                <Form.Label>Theme:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="text" name="theme" value={generalData.theme} onChange={handleGeneralChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control className={`${themeValue} secondary`} type="text" name="description" value={generalData.description} onChange={handleGeneralChange} required />
            </Form.Group>



            {
                questionsArr.map((question, index) => {
                    return <QuestionsQuizForm key={index} index={index} question={question} handleQuestionChange={handleQuestionChange} handleAnswerOptionChange={handleAnswerOptionChange} handleRemoveQuestion={handleRemoveQuestion} />
                })
            }
            <div className="d-flex justify-content-center">
                <Button variant="warning" type="button" className="text-center rounded-circle text-light my-3" onClick={handleAddQuestion}>✚</Button>
            </div>
            <div className="d-grid ">
                <Button variant="success" type="submit" className="mx-4 mt-3">Create Quiz</Button>
            </div>

        </Form>
    )
}

export default CreateQuizForm
