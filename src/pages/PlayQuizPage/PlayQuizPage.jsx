import { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import PlayQuiz from "../../components/PlayQuiz/PlayQuiz"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../../contexts/auth.context"
import { MessageContext } from "../../contexts/message.context"
import quizzesService from "../../services/quizzes.services"
import shuffleArray from "../../utils/shuffleArray"

const PlayQuizPage = () => {

    const { id } = useParams()

    const [quiz, setQuiz] = useState([])
    const [dailyQuiz, setDailyQuiz] = useState('')
    const [quizLoader, setQuizLoader] = useState(true)

    const { user, isLoading } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)

    useEffect(() => {
        getQuizById()
        getDailyQuiz()
    }, [])

    const shuffleAnswers = (data) => {
        setQuiz({
            ...data, questionsArr: data?.questionsArr?.map(question => {
                return question = { ...question, allAnswers: shuffleArray([...question.answersOptions, question.correctAnswer]) }
            })
        })
    }

    const getQuizById = () => {
        quizzesService
            .getQuizById(id)
            .then(({ data }) => {
                shuffleAnswers(data)
                setQuizLoader(false)
            })
            .catch(err => console.log(err))
    }

    const getDailyQuiz = () => {
        quizzesService
            .getDailyQuiz()
            .then(({ data }) => setDailyQuiz(data))
            .catch(err => console.log(err))
    }

    if (isLoading || quizLoader) {
        return <SpinnerLoader />
    }

    if (user || dailyQuiz._id === quiz._id) {
        return (


            <Container className="py-4">

                {
                    quizLoader ?
                        <SpinnerLoader />
                        :

                        <PlayQuiz quiz={quiz} />

                }

            </Container>
        )

    } else {
        emitMessage('Must be logged in to access to this page')
        return <Navigate to="/login" />
    }

}

export default PlayQuizPage