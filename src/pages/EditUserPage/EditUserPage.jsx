import { useContext } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import EditUserCard from "../../components/EditUserCard/EditUserCard"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { MessagesConstants } from "../../consts"
import { AuthContext } from "../../contexts/auth.context"
import { MessageContext } from "../../contexts/message.context"
import { ThemeContext } from "../../contexts/theme.context"



const EditUserPage = () => {

    const { id } = useParams()

    const { user, isLoading } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)
    const { themeValue } = useContext(ThemeContext)



    if (isLoading) {
        return <SpinnerLoader />
    }

    if (user._id === id || user.role === "ADMIN") {

        return (
            <>
                {
                    id ?
                        <Container className="py-4">
                            <Row>
                                <Col md={{ offset: 3, span: 6 }} >
                                    <h1>Edit Profile</h1>
                                    <hr className={`${themeValue} hr`} />
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
        emitMessage(MessagesConstants.FORBIDDEN_ACCESS)
        return <Navigate to="/" />
    }

}

export default EditUserPage