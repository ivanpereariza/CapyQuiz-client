import { Col, Container, Row } from "react-bootstrap"
import LoginForm from "../../components/LoginForm/LoginForm"

const LoginPage = () => {
    return (
        <Container className="py-4">

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Login</h1>

                    <hr />

                    <LoginForm />

                </Col>
            </Row>

        </Container>
    )
}

export default LoginPage