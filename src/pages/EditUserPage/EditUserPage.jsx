import { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import EditUserCard from "../../components/EditUserCard/EditUserCard"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../../contexts/auth.context"
import { MessageContext } from "../../contexts/message.context"
import usersService from "../../services/users.services"


const EditUserPage = () => {

    const { id } = useParams()

    const [userProfile, setUserProfile] = useState()

    const { user, isLoading } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)


    useEffect(() => {
        usersService
            .getUserById(id)
            .then(user => setUserProfile(user))
            .catch(err => console.log(err))
    }, [id])


    if (isLoading) {
        return <SpinnerLoader />
    }

    if (user._id === id || user.role === "ADMIN") {

        return (
            <>
                {
                    userProfile ?
                        <Container className="mt-4">
                            <Row>
                                <Col md={{ offset: 3, span: 6 }} >
                                    <h1>{`Edit ${userProfile.data.username}`}</h1>
                                    <hr />
                                    <EditUserCard userProfile={userProfile} />
                                </Col>
                            </Row>
                        </Container>
                        :
                        <SpinnerLoader />
                }


            </>
        )

    } else {
        emitMessage('Forbidden access to this page ⛔')
        return <Navigate to="/" />
    }

}

export default EditUserPage