import { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import PlayQuiz from "../../components/PlayQuiz/PlayQuiz"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../../contexts/auth.context"
import quizzesService from "../../services/quizzes.services"
import shuffleArray from "../../utils/shuffleArray"

const PlayQuizPage = () => {

    const { id } = useParams()

    const { user } = useContext(AuthContext)

    const [quiz, setQuiz] = useState([])
    const [quizLoader, setQuizLoader] = useState(true)

    useEffect(() => {
        getQuizById()
    }, [])

    useEffect(() => {
        shuffleAnswers()
    }, [quiz])


    const shuffleAnswers = () => {
        quiz?.questionsArr?.map(question => {
            shuffleArray(question.answersOptions)
            console.log(question.answersOptions)
        })
    }


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
        <Container className="mt-4">

            {
                quizLoader ?
                    <SpinnerLoader />
                    :

                    <PlayQuiz quiz={quiz} user={user} />

            }

        </Container>
    )
}

export default PlayQuizPage