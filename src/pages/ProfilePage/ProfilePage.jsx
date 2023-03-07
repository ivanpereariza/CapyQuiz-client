import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import getUser from './../../utils/getUser'
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"

const ProfilePage = () => {

    const { id } = useParams()

    const [user, setUser] = useState()

    useEffect(() => {
        getUser(id, setUser)
    }, [])


    return (
        user ? <ProfileCard userProfile={user} className="my-4" /> : <SpinnerLoader />
    )
}

export default ProfilePage