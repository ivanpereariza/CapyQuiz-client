import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import quizzesService from "../../services/quizzes.services"
import usersService from "../../services/users.services"
import AnswerCard from "../AnswerCard/AnswerCard"
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import { AuthContext } from "../../contexts/auth.context"
import { MessageContext } from "../../contexts/message.context"
import { MessagesConstants, GameConstants } from "../../consts"


const ShowQuestion = ({ questionsArr, id, owner, showTimer }) => {

    const [i, setI] = useState(0)
    const [segs, setSegs] = useState(0)
    const [points, setPoints] = useState(0)
    const [totalPoints, setTotalPoints] = useState(0)
    const [currentUser, setCurrentUser] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(questionsArr[i])

    const [clicked, setClicked] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState('')

    const { themeValue } = useContext(ThemeContext)
    const { authenticateUser, user } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)

    const navigate = useNavigate()

    const changeIndex = () => {
        setI(previousState => previousState + 1)
    }

    const counter = () => {
        setSegs(previousState => previousState + GameConstants.GAME_INTERVAL_ON_SEGS)
    }

    useEffect(() => {
        setInterval(() => {
            counter()
        }, GameConstants.GAME_INTERVAL)
    }, [])

    useEffect(() => {
        setTotalPoints(previousState => previousState + points)
    }, [points])

    useEffect(() => {
        setCurrentUser(user)

    }, [user])


    useEffect(() => {
        setIsPlaying(false)
        setCurrentTrack('')
        if (i < questionsArr.length) setCurrentQuestion(questionsArr[i])
        else clearInterval(6)
    }, [i])

    useEffect(() => {
        showTimer(segs)
        if (!clicked && segs >= GameConstants.GAME_QUESTION_TIMER && segs <= GameConstants.GAME_TOTAL_TIMER_PLUS_INTERVAL_SEGS) {
            setCurrentTrack('https://res.cloudinary.com/dkfzj9tmk/video/upload/v1678794420/wrong_c80euq.mp3')
            setIsPlaying(true)
        }

        if (segs > GameConstants.GAME_TOTAL_TIMER) {
            changeIndex()
            setSegs(0)
            setPoints(0)
            setClicked(false)
        }
        if (i === (questionsArr.length - 1) && segs >= GameConstants.GAME_TOTAL_TIMER && currentUser) {
            saveQuizOnUser()
            savePointOwner()
        }
        if (i === (questionsArr.length - 1) && segs >= GameConstants.GAME_TOTAL_TIMER && !currentUser) {
            navigate('/signup')
            emitMessage(MessagesConstants.INVITE_TO_SIGNUP)
        }
    }, [segs])

    const handleAnswer = e => {

        setClicked(true)
        const value = e.currentTarget.getAttribute("value")

        if (value === currentQuestion.correctAnswer) {
            setCurrentTrack('https://res.cloudinary.com/dkfzj9tmk/video/upload/v1678794420/correct_s7e21k.mp3')
            setIsPlaying(true)
            setPoints(Math.floor(((GameConstants.GAME_QUESTION_TIMER) - segs) * GameConstants.POINTS_PER_SECOND))
            setSegs(GameConstants.GAME_QUESTION_TIMER)
        } else {
            setCurrentTrack('https://res.cloudinary.com/dkfzj9tmk/video/upload/v1678794420/wrong_c80euq.mp3')
            setIsPlaying(true)
            setPoints(0)
            setSegs(GameConstants.GAME_QUESTION_TIMER)
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
                .then(() => usersService.resetUserToken(currentUser._id))
                .then(({ data }) => {
                    localStorage.setItem('authToken', data.authToken)
                    authenticateUser()
                })
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
            <audio id="audio-player" src={currentTrack} controls={false} autoPlay={isPlaying} loop={false} />
            {
                segs >= 0 && segs < GameConstants.GAME_SHOW_QUESTION_TIMER ?
                    <>
                        <h1 className="text-center my-4">{currentQuestion.question} </h1>
                        <Row >
                            <Col md={{ span: 4, offset: 4 }} className='d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
                                <Card className={`${themeValue} card my-3 `}>
                                    <Card.Body >
                                        <Card.Title className="text-center">Question {i + 1} of {questionsArr.length}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                    :
                    segs >= GameConstants.GAME_SHOW_QUESTION_TIMER && segs < GameConstants.GAME_QUESTION_TIMER ?
                        <Card className={`${themeValue} card my-3`}>
                            <Card.Body >
                                <h2 className="text-center my-3">{currentQuestion.question}</h2>
                                <hr className={`${themeValue} hr`} />
                                <Row>
                                    {
                                        currentQuestion.allAnswers.map((answer, i) => {
                                            return <AnswerCard answer={answer} handleAnswer={handleAnswer} key={i} index={i} />
                                        })
                                    }
                                </Row>
                            </Card.Body>
                        </Card>
                        :
                        points ?
                            <Row >
                                <Col md={{ span: 4, offset: 4 }} className='d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
                                    <Card className={`${themeValue} card my-3 `}>
                                        <Card.Body >
                                            <Card.Title className="text-center">You win <b>{points}</b> points!</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            :
                            <>
                                < Row >
                                    <Col md={{ span: 8, offset: 2 }} className='d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
                                        <Card className={`${themeValue} card my-3`}>
                                            <Card.Body >
                                                <Card.Title className="text-center">Incorrect answer! the correct answer was <b>{currentQuestion.correctAnswer}</b></Card.Title>
                                            </Card.Body>
                                        </Card >
                                    </Col>
                                </Row>
                            </>
            }

        </div >

    )

}

export default ShowQuestion