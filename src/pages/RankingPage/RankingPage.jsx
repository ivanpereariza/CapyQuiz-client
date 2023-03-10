import { useContext } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Ranking from "../../components/Ranking/Ranking"
import { AuthContext } from "../../contexts/auth.context"
import { ThemeContext } from "../../contexts/theme.context"

const RankingPage = () => {

    const { themeValue } = useContext(ThemeContext)
    const theme = themeValue === 'light' ? 'dark' : 'light'
    const { user } = useContext(AuthContext)
    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col md={{ offset: 2, span: 9 }}>
                    <Row className="align-items-center">
                        <Col md={{ span: 9 }}>
                            <h1>CapyQuiz Ranking</h1>
                        </Col>
                        <Col md={{ span: 3 }} >
                            <Button variant={`outline-${theme}`} href={`#${user?._id}`}>Check your position!</Button>
                        </Col>
                    </Row>
                    <hr />

                </Col>
            </Row>
            <Ranking />
        </Container>
    )
}

export default RankingPage