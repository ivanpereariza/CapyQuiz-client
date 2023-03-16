import { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import EditQuizForm from "../../components/EditQuizForm/EditQuizForm"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { MessagesConstants } from "../../consts"
import { AuthContext } from "../../contexts/auth.context"
import { MessageContext } from "../../contexts/message.context"
import { ThemeContext } from "../../contexts/theme.context"
import quizzesService from "../../services/quizzes.services"

const EditQuizPage = () => {

    const { id } = useParams()

    const { user, isLoading } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)
    const { themeValue } = useContext(ThemeContext)

    const [owner, setOwner] = useState()

    const [isLoadingQuiz, setIsLoadingQuiz] = useState(true)

    useEffect(() => {
        getOwner()
    }, [id])

    const getOwner = () => {
        setIsLoadingQuiz(true)
        quizzesService
            .getQuizOwner(id)
            .then(({ data }) => {
                setOwner(data)
                setIsLoadingQuiz(false)
            })
            .catch(err => console.log(err))
    }

    if (isLoading || isLoadingQuiz) {
        return <SpinnerLoader />
    }

    if (user?._id === owner?._id || user.role === "ADMIN" || user.role === "EDITOR") {

        return (
            <Container className="py-4">
                <Row>

                    <Col md={{ offset: 2, span: 8 }}>
                        <h1>Edit Quiz</h1>
                        <hr className={`${themeValue} hr`} />
                        <EditQuizForm />
                    </Col>
                </Row>
            </Container>
        )
    } else {
        emitMessage(MessagesConstants.FORBIDDEN_ACCESS)
        return <Navigate to="/quizzes" />
    }



}

export default EditQuizPage