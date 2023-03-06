import axios from "axios"

class QuizzesServices {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/quiz`
        })
    }

    createNewQuiz(quizData) {
        return this.api.post('/saveQuiz', quizData)
    }
}

const quizzesService = new QuizzesServices()

export default quizzesService