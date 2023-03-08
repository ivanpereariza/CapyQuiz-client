import { Col, Container, Row } from "react-bootstrap"
import EditQuizForm from "../../components/EditQuizForm/EditQuizForm"

const EditQuizPage = () => {
    return (
        <Container>
            <Row>

                <Col md={{ offset: 2, span: 8 }}>
                    <h1>Edit Quiz</h1>
                    <hr />
                    <EditQuizForm />
                </Col>
            </Row>
        </Container>
    )
}

export default EditQuizPage