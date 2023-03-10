import { Col, Container, Row } from "react-bootstrap"
import Ranking from "../../components/Ranking/Ranking"

const RankingPage = () => {
    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <Ranking />
                </Col>
            </Row>
        </Container>
    )
}

export default RankingPage