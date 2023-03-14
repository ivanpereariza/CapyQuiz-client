import { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SignupForm from '../../components/SignupForm/SignupForm'
import { ThemeContext } from '../../contexts/theme.context'

function SignupPage() {

    const { themeValue } = useContext(ThemeContext)
    return (
        <Container className="py-4">

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Signup</h1>

                    <hr className={`${themeValue} hr`} />

                    <SignupForm />

                </Col>
            </Row>

        </Container>
    )
}

export default SignupPage