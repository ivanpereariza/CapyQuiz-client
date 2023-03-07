import usersService from "../services/users.services"

const getUser = (id, setUser) => {
    usersService
        .getUserById(id)
        .then(user => setUser(user))
        .catch(err => console.log(err))
}

export default getUser 