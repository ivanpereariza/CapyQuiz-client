import { useContext, useEffect, useState } from "react"
import { Outlet, Navigate, useParams } from "react-router-dom"
import SpinnerLoader from "../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../contexts/auth.context"
import quizzesService from "../services/quizzes.services"

const PrivateEditQuiz = () => {

    const { id } = useParams()

    const { user, isLoading } = useContext(AuthContext)

    const [quiz, setQuiz] = useState({})
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(true)

    useEffect(() => {
        getQuiz()
    }, [])

    const getQuiz = () => {
        setIsLoadingQuiz(true)
        quizzesService
            .getQuizById(id)
            .then(({ data }) => {
                setQuiz(data)
                setIsLoadingQuiz(false)
            })
            .catch(err => console.log(err))
    }

    if (isLoading || isLoadingQuiz) {
        return <SpinnerLoader />
    }

    if (!user) {

        return <Navigate to="/login" />

    } else if (user?._id === quiz.owner?._id || user.role === "ADMIN" || user.role === "EDITOR") {

        return <Outlet />

    } else return <Navigate to="/" />
}


export default PrivateEditQuiz