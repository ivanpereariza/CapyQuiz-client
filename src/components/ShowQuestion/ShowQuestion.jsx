import { useEffect, useState } from "react"
import { Button, Container, Row } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import quizzesService from "../../services/quizzes.services"
import usersService from "../../services/users.services"
import AnswerCard from "../AnswerCard/AnswerCard"

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
        if (segs > 21) {
            changeIndex()
            setSegs(0)
            setPoints(0)
        }
        if (i === (questionsArr.length - 1) && segs > 20) {
            saveQuizOnUser()
            savePointOwner()

        }
    }, [segs])

    const getUser = () => {
        usersService
            .getUserById(user._id)
            .then(({ data }) => setCurrentUser(data))
            .catch(err => console.log(err))
    }

    const handleAnswer = e => {

        const value = e.target.innerText

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
                .then(() => quizzesService.addPointsToArr(id, totalPoints))
                .then(() => usersService.addPointsToUser(currentUser._id, totalPoints))
                .catch(err => console.log(err))
        }
    }

    const savePointOwner = () => {
        usersService
            .addPointsToUser(owner._id, 200)
            .then(() => navigate(`/quizzes/results/${id}`))
            .catch(err => console.log(err))
    }

    return (


        <div>
            {
                segs >= 0 && segs < 3 ?
                    <h1 className="text-center my-4">{currentQuestion.question} </h1>
                    :
                    segs >= 3 && segs < 18 ?
                        <>
                            <h1 className="text-center my-5">{currentQuestion.question}</h1>
                            <Row>
                                {
                                    currentQuestion.answersOptions.map((answer, i) => {
                                        return <AnswerCard answer={answer} handleAnswer={handleAnswer} key={i} index={i} />
                                    })
                                }
                            </Row>

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