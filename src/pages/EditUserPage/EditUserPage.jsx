import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import EditUserCard from "../../components/EditUserCard/EditUserCard"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import usersService from "../../services/users.services"
import getUser from "../../utils/getUser"

const EditUserPage = () => {

    const { id } = useParams()

    const [user, setUser] = useState()


    useEffect(() => {
        getUser(id, setUser)
    }, [])


    return (
        <>
            {
                user ?
                    <>
                        <div>{`Edit ${user.data.username}`}</div>
                        <EditUserCard user={user} />
                    </>
                    :
                    <SpinnerLoader />
            }


        </>
    )
}

export default EditUserPage