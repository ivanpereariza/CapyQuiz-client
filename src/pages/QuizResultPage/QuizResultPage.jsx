import { useContext, useEffect, useState } from "react"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../../contexts/auth.context"
import quizzesService from "../../services/quizzes.services"
import { Link, useParams } from "react-router-dom"
import BarChart from "../../components/BarChart/BarChart"
import { Card, Col, Container, Row } from "react-bootstrap"
import { ThemeContext } from "../../contexts/theme.context"
import PointsTable from "../../components/PointsTable/PointsTable"
import getAverageRating from "../../utils/getAverageRating"
import getAveragePoints from "../../utils/getAveragePoints"
import { MessageContext } from "../../contexts/message.context"
import StarRating from "../../components/StarRating/StarRating"
import CommentsForm from "../../components/CommentsForm/CommentsForm"
import { MessagesConstants } from "../../consts"

const QuizResultPage = () => {

    const { id } = useParams()

    const { user } = useContext(AuthContext)
    const { themeValue, theme: themeColor } = useContext(ThemeContext)
    const { emitMessage } = useContext(MessageContext)


    const [quiz, setQuiz] = useState('')
    const [points, setPoints] = useState(false)
    const [average, setAverage] = useState(0)
    const [readyRating, setReadyRating] = useState(false)
    const [rating, setRating] = useState(0)

    useEffect(() => {
        getQuizz()
    }, [])

    useEffect(() => {
        quiz && setAverage(getAveragePoints(quiz))
        quiz && setReadyRating(true)
        setRating(quiz.rating?.find(rating => rating.owner === user._id)?.rate)
    }, [quiz])

    useEffect(() => {
        const pointsObj = user.quizzes.filter(elm => elm.quiz === id)
        if (pointsObj[0]) setPoints(pointsObj[0])
    }, [user])

    const getQuizz = () => {
        quizzesService
            .getQuizById(id)
            .then(({ data }) => setQuiz(data))
            .catch(err => console.log(err))
    }

    const handleRatingChange = e => {
        rateQuiz(e)
    }

    const rateQuiz = (rate) => {
        const existingRating = quiz.rating?.find(rating => rating.owner === user._id)
        if (existingRating) {
            existingRating.rate = rate
            quizzesService
                .editQuizById(id, { rating: quiz.rating })
                .then(() => {
                    const average = Math.round(getAverageRating(quiz))
                    return quizzesService.editQuizById(id, { ratingAvg: +average }, { new: true })
                })
                .then(() => emitMessage(MessagesConstants.SAVE_RATE))
                .catch(err => console.log(err))
        } else {
            quiz.rating.push({ owner: user._id, rate })
            quizzesService
                .editQuizById(id, { rating: quiz.rating })
                .then(() => {
                    const average = Math.round(getAverageRating(quiz))
                    return quizzesService.editQuizById(id, { ratingAvg: +average }, { new: true })
                })
                .then(() => emitMessage(MessagesConstants.SAVE_RATE))
                .catch(err => console.log(err))
        }
    }

    const fireFinalActions = (ratingValue) => {
        setRating(ratingValue)
        handleRatingChange(ratingValue)
    }

    return (
        <Container className="py-4">
            {
                user && quiz ?
                    <>
                        {
                            points.points || points.points === 0 ?
                                <Container >
                                    <Card >
                                        <Card.Body className={`${themeValue} card  `}>
                                            <Row  >
                                                <Col>
                                                    <BarChart className='justify-content-center' points={points} average={average} />
                                                </Col>
                                                <Col>
                                                    <PointsTable id={id} />
                                                    <Row>
                                                        <Col md={{ span: 6 }}>
                                                            {
                                                                readyRating && <StarRating fireFinalActions={fireFinalActions} rating={rating} readOnly={false} />
                                                            }
                                                        </Col>
                                                        <Col md={{ span: 6 }}>
                                                            <Link to={`/profile/${quiz.owner._id}`}>
                                                                <p className={`text-${themeColor}`}>{quiz.owner.username}
                                                                    <img className={`${themeValue} ownerAvatar `} src={quiz.owner.avatar} alt={quiz.owner.username} /></p>
                                                            </Link>
                                                        </Col>
                                                    </Row>
                                                    <CommentsForm quizId={quiz._id} />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Container>
                                :
                                <SpinnerLoader />
                        }

                    </>
                    :
                    <SpinnerLoader />
            }

        </Container>
    )
}

export default QuizResultPage