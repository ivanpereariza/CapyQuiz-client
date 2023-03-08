import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Navigate } from "react-router-dom"

const ShowQuestion = ({ questionsArr, id }) => {

    const [i, setI] = useState(0)
    const [segs, setSegs] = useState(0)
    const [points, setPoints] = useState(0)
    const [totalPoints, setTotalPoints] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(questionsArr[i])

    const changeIndex = () => {
        setI(previousState => previousState + 1)

    }

    const counter = () => {
        setSegs(previousState => previousState + 0.1)

    }

    useEffect(() => {
        setInterval(() => {
            counter()
        }, 100)
    }, [])

    useEffect(() => {
        setTotalPoints(previousState => previousState + points)
    }, [points])

    useEffect(() => {
        if (i < questionsArr.length) setCurrentQuestion(questionsArr[i])
        else clearInterval(6)
    }, [i])

    useEffect(() => {
        if (segs > 23) {
            changeIndex()
            setSegs(0)
            setPoints(0)
        }
    }, [segs])

    const handleAnswer = e => {

        const { value } = e.target

        if (value === currentQuestion.correctAnswer) {
            setPoints(Math.floor((18 - segs) * 10))
            //hay que ir sumando los puntos al usuario
            setSegs(18)
        } else {
            setPoints(0)
            setSegs(18)
        }

    }

    return (


        <div>
            {i === (questionsArr.length - 1) && segs > 22 ?
                <Navigate to={`/quizzes/results/${id}`} />
                :
                segs >= 0 && segs < 3 ?
                    <p>{currentQuestion.question} </p>
                    :
                    segs >= 3 && segs < 18 ?
                        <>
                            <p >{currentQuestion.question} </p>
                            <Button onClick={handleAnswer} value={currentQuestion.answersOptions[0]}>{currentQuestion.answersOptions[0]}</Button>
                            <Button onClick={handleAnswer} value={currentQuestion.answersOptions[1]}>{currentQuestion.answersOptions[1]}</Button>
                            <Button onClick={handleAnswer} value={currentQuestion.answersOptions[2]}>{currentQuestion.answersOptions[2]}</Button>
                            <Button onClick={handleAnswer} value={currentQuestion.answersOptions[3]}>{currentQuestion.answersOptions[3]}</Button>
                        </>
                        :
                        points ?
                            <p>You win {points} points</p>
                            :
                            <p>Incorrect answer! the correct answer was {currentQuestion.correctAnswer}</p>


            }

        </div>

    )

}

export default ShowQuestion