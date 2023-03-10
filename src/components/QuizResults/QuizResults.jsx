import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader"
import BarChart from "../BarChart/BarChart"
import { Container } from "react-bootstrap"

const QuizResults = ({ quiz, user }) => {

    const { id } = useParams()

    const [points, setPoints] = useState(false)
    const [average, setAverage] = useState(0)

    useEffect(() => {

        setAverage(getAverage())

    }, [quiz])

    useEffect(() => {

        const pointsObj = user?.quizzes.filter(elm => elm.quiz === id)
        if (pointsObj[0]) setPoints(pointsObj[0])

    }, [user])

    const getAverage = () => {
        let totalPoints
        if (quiz.points.length > 1) totalPoints = quiz.points.reduce((acc, curr) => acc + curr)
        if (quiz.points.length === 1) return totalPoints = quiz.points[0]

        return totalPoints / quiz.points.length
    }

    return (
        <>
            {
                points.points || points.points === 0 ?
                    <Container>
                        <BarChart points={points} average={average} />
                        <p>Your punctuation: {points.points}</p>
                        <p>The average punctuation:{Math.floor(average)}</p>

                    </Container>
                    :
                    <SpinnerLoader />
            }

        </>
    )
}

export default QuizResults