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
    editComment(id, message) {
        return this.api.put(`/edit/${id}`, message)
    }
    deleteComment(id) {
        return this.api.delete(`/delete/${id}`)
    }
}


const commentsService = new CommentsService()

export default commentsService