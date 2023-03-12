import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader"
import BarChart from "../BarChart/BarChart"
import { Card, Col, Container, Row } from "react-bootstrap"
import { ThemeContext } from "../../contexts/theme.context"
import PointsTable from "../PointsTable/PointsTable"
import { Rating } from "@mui/material"
import getAverageRating from "../../utils/getAverageRating"
import getAveragePoints from "../../utils/getAveragePoints"
import quizzesService from "../../services/quizzes.services"
import { MessageContext } from "../../contexts/message.context"
import { StarOutline } from "@mui/icons-material"
import './../QuizResults/QuizResults.css'


const QuizResults = ({ quiz, user }) => {

    const { themeValue } = useContext(ThemeContext)
    const { emitMessage } = useContext(MessageContext)

    const starColor = themeValue === 'light' ? '' : 'white'
    const themeColor = themeValue === 'light' ? 'dark' : 'light'


    const { id } = useParams()

    const [points, setPoints] = useState(false)
    const [average, setAverage] = useState(0)
    const [rating, setRating] = useState(0)

    useEffect(() => {
        setAverage(getAveragePoints(quiz))
        setRating(getAverageRating(quiz))
    }, [quiz])

    useEffect(() => {
        const pointsObj = user?.quizzes.filter(elm => elm.quiz === id)
        if (pointsObj[0]) setPoints(pointsObj[0])
    }, [user])

    const handleRatingChange = e => {
        const { value } = e.target
        rateQuiz(+value)
    }

    const rateQuiz = (rate) => {

        const existingRating = quiz.rating.find(rating => rating.owner === user._id)

        if (existingRating) {
            existingRating.rate = rate
            quizzesService
                .editQuizById(id, { rating: quiz.rating })
                .then(({ data }) => emitMessage('Rate updated'))
                .catch(err => console.log(err))
        } else {
            quiz.rating.push({ owner: user._id, rate })
            quizzesService
                .editQuizById(id, { rating: quiz.rating })
                .then(({ data }) => emitMessage('Rate updated'))
                .catch(err => console.log(err))
        }
    }

    return (
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
                                        <PointsTable points={quiz.points} />
                                        <Row>
                                            <Col md={{ span: 6 }}>
                                                <Rating emptyIcon={<StarOutline style={{ color: starColor }} />} name="half-rating" defaultValue={rating} precision={1} onChange={handleRatingChange} />
                                            </Col>
                                            <Col md={{ span: 6 }}>
                                                <Link to={`/profile/${quiz.owner._id}`}>
                                                    <p className={`text-${themeColor}`}>{quiz.owner.username} <img className="ownerAvatar" src={quiz.owner.avatar} alt={quiz.owner.username} /></p>
                                                </Link>

                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                    :
                    <SpinnerLoader />
            }

        </>
    )
}

export default QuizResults