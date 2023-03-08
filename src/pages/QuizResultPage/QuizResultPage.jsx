import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import QuizResults from "../../components/QuizResults/QuizResults"
import { AuthContext } from "../../contexts/auth.context"
import quizzesService from "../../services/quizzes.services"

const QuizResultPage = () => {

    const { id } = useParams()

    const { user } = useContext(AuthContext)

    const [quiz, setQuiz] = useState({})

    useEffect(() => {
        getQuizz()
    }, [])

    const getQuizz = () => {
        quizzesService
            .getQuizById(id)
            .then(({ data }) => setQuiz(data))
            .catch(err => console.log(err))
    }

    return (
        <QuizResults quiz={quiz} user={user} />
    )
}

export default QuizResultPage