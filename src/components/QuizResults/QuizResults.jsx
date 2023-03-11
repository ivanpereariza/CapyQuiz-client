import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader"
import BarChart from "../BarChart/BarChart"
import { Card, Col, Container, Row } from "react-bootstrap"
import { ThemeContext } from "../../contexts/theme.context"
import PointsTable from "../PointsTable/PointsTable"


const QuizResults = ({ quiz, user }) => {

    const { themeValue } = useContext(ThemeContext)

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
                    <Container >
                        <Card >
                            <Card.Body className={`${themeValue} card  `}>
                                <Row  >
                                    <Col>
                                        <BarChart className='justify-content-center' points={points} average={average} />
                                    </Col>
                                    <Col>
                                        <PointsTable points={quiz.points} />
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