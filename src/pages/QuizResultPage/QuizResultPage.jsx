import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import QuizResults from "../../components/QuizResults/QuizResults"
import { AuthContext } from "../../contexts/auth.context"
import quizzesService from "../../services/quizzes.services"
import usersService from "../../services/users.services"

const QuizResultPage = () => {

    const { id } = useParams()

    const { user } = useContext(AuthContext)

    const [quiz, setQuiz] = useState('')
    const [currentUser, setCurrentUser] = useState(false)


    useEffect(() => {
        getQuizz()
        getUser()
    }, [])

    const getQuizz = () => {
        quizzesService
            .getQuizById(id)
            .then(({ data }) => setQuiz(data))
            .catch(err => console.log(err))
    }

    const getUser = () => {
        usersService
            .getUserById(user._id)
            .then(({ data }) => setCurrentUser(data))
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                currentUser && quiz ?
                    <QuizResults quiz={quiz} user={currentUser} />
                    :
                    <p></p>
            }

        </>
    )
}

export default QuizResultPage