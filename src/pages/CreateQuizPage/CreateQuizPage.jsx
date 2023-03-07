import { Col, Container, Row } from "react-bootstrap"
import CreateQuizForm from "../../components/CreateQuizForm/CreateQuizForm"

const CreateQuizPage = () => {
    return (
        <Container className="mt-4">

            <Row>

                <Col md={{ offset: 2, span: 8 }}>

                    <h1>Create Quiz</h1>

                    <hr />

                    <CreateQuizForm />
                </Col>
            </Row>

        </Container>
    )
}

export default CreateQuizPage