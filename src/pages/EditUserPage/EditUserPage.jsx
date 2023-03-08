import { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import EditUserCard from "../../components/EditUserCard/EditUserCard"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../../contexts/auth.context"
import getUser from "../../utils/getUser"

const EditUserPage = () => {

    const { id } = useParams()

    const [userProfile, setUserProfile] = useState()

    const { user, isLoading } = useContext(AuthContext)


    useEffect(() => {
        getUser(id, setUserProfile)
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

    } else return <Navigate to="/" />

}

export default EditUserPage