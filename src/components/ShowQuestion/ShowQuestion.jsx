import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import quizzesService from "../../services/quizzes.services"
import usersService from "../../services/users.services"
import AnswerCard from "../AnswerCard/AnswerCard"
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import wrong from './../../assets/audios/wrong.mp3'
import correct from './../../assets/audios/correct.mp3'


const ShowQuestion = ({ questionsArr, id, user, owner, showTimer }) => {

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
        setIsPlaying(false)
        setCurrentTrack('')
        if (i < questionsArr.length) setCurrentQuestion(questionsArr[i])
        else clearInterval(6)
    }, [i])

    useEffect(() => {
        showTimer(segs)
        if (!clicked && segs >= 18 && segs <= 18.1) {
            setCurrentTrack(wrong)
            setIsPlaying(true)
        }

        if (segs > 21) {
            changeIndex()
            setSegs(0)
            setPoints(0)
            setClicked(false)
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

        setClicked(true)
        const value = e.target.innerText

        if (value === currentQuestion.correctAnswer) {
            setCurrentTrack(correct)
            setIsPlaying(true)
            setPoints(Math.floor((18 - segs) * 10))
            setSegs(18)
        } else {
            setCurrentTrack(wrong)
            setIsPlaying(true)
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
            <audio id="audio-player" src={currentTrack} controls={false} autoPlay={isPlaying} loop={false} />
            {
                segs >= 0 && segs < 3 ?
                    <h1 className="text-center my-4">{currentQuestion.question} </h1>
                    :
                    segs >= 3 && segs < 18 ?
                        <Card className={`${themeValue} card my-3`}>
                            <Card.Body >
                                <h1 className="text-center my-3">{currentQuestion.question}</h1>
                                <hr />
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