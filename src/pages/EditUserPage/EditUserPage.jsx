import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import EditUserCard from "../../components/EditUserCard/EditUserCard"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
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
                    <Container className="mt-4">
                        <Row>
                            <Col md={{ offset: 3, span: 6 }} >
                                <h1>{`Edit ${user.data.username}`}</h1>
                                <hr />
                                <EditUserCard user={user} />
                            </Col>
                        </Row>
                    </Container>
                    :
                    <SpinnerLoader />
            }


        </>
    )
}

export default EditUserPage