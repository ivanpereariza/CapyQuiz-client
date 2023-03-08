import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import getUser from './../../utils/getUser'
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"

const ProfilePage = () => {

    const { id } = useParams()

    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        getUser(id, setUserProfile)
    }, [id])


    return (
        userProfile ? <ProfileCard userProfile={userProfile} className="mt-4" /> : <SpinnerLoader />
    )
}

export default ProfilePage