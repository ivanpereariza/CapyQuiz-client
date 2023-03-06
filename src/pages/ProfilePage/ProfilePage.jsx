import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import usersService from "../../services/users.services"

const ProfilePage = () => {

    const { id } = useParams()

    const [user, setUser] = useState()


    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        usersService
            .getUserById(id)
            .then(user => setUser(user))
            .catch(err => console.log(err))

    }

    return (
        user ? <ProfileCard user={user} /> : <SpinnerLoader />
    )
}

export default ProfilePage