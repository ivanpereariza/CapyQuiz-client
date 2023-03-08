import { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import PlayQuiz from "../../components/PlayQuiz/PlayQuiz"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../../contexts/auth.context"
import quizzesService from "../../services/quizzes.services"

const PlayQuizPage = () => {

    const { id } = useParams()

    const { user } = useContext(AuthContext)

    const [quiz, setQuiz] = useState([])
    const [quizLoader, setQuizLoader] = useState(true)

    useEffect(() => {
        getQuizById()
    }, [])

    const getQuizById = () => {
        quizzesService
            .getQuizById(id)
            .then(({ data }) => {
                setQuiz(data)
                setQuizLoader(false)
            })
            .catch(err => console.log(err))

    }

    return (
        <Container>
            <Row>

                <Col md={{ offset: 1, span: 10 }}>
                    {
                        quizLoader ?
                            <SpinnerLoader />
                            :
                            <>

                                <h1>Play Quiz {quiz.title}</h1>

                                <hr />

                                <PlayQuiz quiz={quiz} user={user} />
                            </>
                    }
                </Col>
            </Row>


        </Container>
    )
}

export default PlayQuizPage