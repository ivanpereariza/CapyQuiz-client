import { useContext, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Ranking from "../../components/Ranking/Ranking"
import { AuthContext } from "../../contexts/auth.context"
import { ThemeContext } from "../../contexts/theme.context"

const RankingPage = () => {

    const { themeValue } = useContext(ThemeContext)
    const theme = themeValue === 'light' ? 'dark' : 'light'
    const { user } = useContext(AuthContext)

    const [inRanking, setInRanking] = useState(false)

    const checkIfRanking = (ranking) => {
        ranking.map(elm => elm.points && user?._id === elm._id && setInRanking(true))
    }
    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col md={{ offset: 2, span: 9 }}>
                    <Row className="align-items-center">
                        <Col md={{ span: 9 }}>
                            <h1>CapyQuiz Ranking</h1>
                        </Col>
                        <Col md={{ span: 3 }} >
                            {
                                inRanking && <Button variant={`outline-${theme}`} href={`#${user?._id}`}>Check your position!</Button>
                            }
                        </Col>
                    </Row>
                    <hr className={`${themeValue} hr`} />

                </Col>
            </Row>
            <Ranking checkIfRanking={checkIfRanking} />
        </Container>
    )
}

export default RankingPage