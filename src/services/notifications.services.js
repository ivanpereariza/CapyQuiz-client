import axios from "axios"

class NotificationService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/notifications`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getNotificationsById(id) {
        return this.api.get(`/getNotifications/${id}`)
    }
    createNotification(quizId, ownerId) {
        return this.api.post('/create', { quizId, ownerId })
    }

    deleteNotification(id) {
        return this.api.delete(`/delete/${id}`)
    }

}

const notificationService = new NotificationService

export default notificationService