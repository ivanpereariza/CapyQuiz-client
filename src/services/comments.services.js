import axios from 'axios'

class CommentsService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/comments`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    saveComment(owner, message, quizId) {
        return this.api.post(`/create/${quizId}`, { comment: { owner, message } })
    }
}


const commentsService = new CommentsService()

export default commentsService