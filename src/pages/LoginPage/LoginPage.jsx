import { useContext } from "react"
import { Col, Container, Row } from "react-bootstrap"
import LoginForm from "../../components/LoginForm/LoginForm"
import { ThemeContext } from "../../contexts/theme.context"

const LoginPage = () => {

    const { themeValue } = useContext(ThemeContext)
    return (
        <Container className="py-4">

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Login</h1>

                    <hr className={`${themeValue} hr`} />

                    <LoginForm />

                </Col>
            </Row>

        </Container>
    )
}

export default LoginPage