import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import CreateQuizForm from "../../components/CreateQuizForm/CreateQuizForm"

const CreateQuizPage = () => {

    const navigate = useNavigate()

    const fireFinalActions = () => {
        navigate('/quizzes')
    }

    return (
        <Container className="my-4">

            <Row>

                <Col md={{ offset: 2, span: 8 }}>

                    <h1>Create Quiz</h1>

                    <hr />

                    <CreateQuizForm fireFinalActions={fireFinalActions} />
                </Col>
            </Row>

        </Container>
    )
}

export default CreateQuizPage