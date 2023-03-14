import { useContext } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import CreateQuizForm from "../../components/CreateQuizForm/CreateQuizForm"
import { ThemeContext } from "../../contexts/theme.context"

const CreateQuizPage = () => {

    const { themeValue } = useContext(ThemeContext)
    const navigate = useNavigate()

    const fireFinalActions = () => {
        navigate('/quizzes')
    }

    return (
        <Container className="py-4">
            <Row>
                <Col md={{ offset: 2, span: 8 }}>

                    <h1>Create Quiz</h1>
                    <hr className={`${themeValue} hr`} />
                    <CreateQuizForm fireFinalActions={fireFinalActions} />

                </Col>
            </Row>
        </Container>
    )
}

export default CreateQuizPage