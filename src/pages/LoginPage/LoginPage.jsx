import { useContext } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
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

                    <div className="mt-3">
                        <p >Not already signed up? <Link to={'/signup'} >
                            <strong style={{ textDecoration: 'underline', color: 'blue' }}>Go sign up!</strong></Link></p>
                    </div>

                </Col>
            </Row>

        </Container>
    )
}

export default LoginPage