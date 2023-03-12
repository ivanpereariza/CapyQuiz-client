import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import usersService from "../../services/users.services"

const ProfilePage = () => {

    const { id } = useParams()

    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        usersService
            .getUserById(id)
            .then(user => setUserProfile(user))
            .catch(err => console.log(err))
    }, [id])


    return (
        userProfile ?
            <ProfileCard userProfile={userProfile} className="mt-4" />
            :
            <SpinnerLoader />
    )
}

export default ProfilePage