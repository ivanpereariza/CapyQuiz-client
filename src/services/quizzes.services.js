import axios from "axios"

class QuizzesServices {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/quiz`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getAllQuizzes() {
        return this.api.get('/getAllQuizzes')
    }

    createNewQuiz(quizData) {
        return this.api.post('/saveQuiz', quizData)
    }

    getQuizById(id) {
        return this.api.get(`/quizById/${id}`)
    }

    getQuizByOwner(id) {
        return this.api.get(`/quizByOwner/${id}`)
    }
    editQuizById(id, quizData) {
        return this.api.put(`/edit/${id}`, quizData)
    }
    deleteQuizById(id) {
        return this.api.delete(`/delete/${id}`)
    }
    addPointsToArr(id, points) {
        return this.api.put(`/addPoints/${id}`, { points })
    }
}

const quizzesService = new QuizzesServices()

export default quizzesService