import { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import EditUserCard from "../../components/EditUserCard/EditUserCard"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../../contexts/auth.context"
import { MessageContext } from "../../contexts/message.context"



const EditUserPage = () => {

    const { id } = useParams()

    const { user, isLoading } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)



    if (isLoading) {
        return <SpinnerLoader />
    }

    if (user._id === id || user.role === "ADMIN") {

        return (
            <>
                {
                    id ?
                        <Container className="mt-4">
                            <Row>
                                <Col md={{ offset: 3, span: 6 }} >
                                    <h1>Edit Profile</h1>
                                    <hr />
                                    <EditUserCard id={id} />
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