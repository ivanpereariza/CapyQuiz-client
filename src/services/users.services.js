import axios from "axios"

class UsersServices {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })
    }

    getUserById(id) {
        return this.api.get(`/userById/${id}`)
    }

    editUserById(id, userData) {
        return this.api.put(`/edit/${id}`, userData)
    }

    deleteUserById(id) {
        return this.api.delete(`/delete/${id}`)
    }
}

const usersService = new UsersServices()

export default usersService