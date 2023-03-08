import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import usersService from "../../services/users.services"

const ShowQuestion = ({ questionsArr, id, user, owner }) => {

    const [i, setI] = useState(0)
    const [segs, setSegs] = useState(0)
    const [points, setPoints] = useState(0)
    const [totalPoints, setTotalPoints] = useState(0)
    const [currentUser, setCurrentUser] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(questionsArr[i])

    const navigate = useNavigate()

    const changeIndex = () => {
        setI(previousState => previousState + 1)

    }

    const counter = () => {
        setSegs(previousState => previousState + 0.1)

    }

    useEffect(() => {
        getUser()
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
        if (i === (questionsArr.length - 1) && segs > 22) {
            saveQuizOnUser()
            savePointOwner()
            navigate(`/quizzes/results/${id}`)
        }
    }, [segs])

    const getUser = () => {
        usersService
            .getUserById(user._id)
            .then(({ data }) => setCurrentUser(data))
            .catch(err => console.log(err))
    }

    const handleAnswer = e => {

        const { value } = e.target

        if (value === currentQuestion.correctAnswer) {
            setPoints(Math.floor((18 - segs) * 10))
            setSegs(18)
        } else {
            setPoints(0)
            setSegs(18)
        }
    }

    const saveQuizOnUser = () => {
        let played = false
        currentUser.quizzes.forEach(elm => {
            if (elm.quiz === id) return played = true
            return
        })
        if (!played) {
            usersService
                .addQuizToUserById(currentUser._id, { quiz: id, points: totalPoints })
                .then(() => {
                    return usersService.addPointsToUser(currentUser._id, totalPoints)
                })
                .then()
                .catch(err => console.log(err))
        }
    }

    const savePointOwner = () => {
        usersService
            .addPointsToUser(owner._id, 200)
            .then()
            .catch(err => console.log(err))
    }

    return (


        <div>
            {
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