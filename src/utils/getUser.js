import usersService from "../services/users.services"

const getUser = (id, setUserProfile) => {
    usersService
        .getUserById(id)
        .then(user => setUserProfile(user))
        .catch(err => console.log(err))
}

export default getUser 