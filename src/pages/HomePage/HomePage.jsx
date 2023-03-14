import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import { Button, Card, CardImg, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import quizzesService from "../../services/quizzes.services"
import './HomePage.css'
import StarRating from "../../components/StarRating/StarRating"
import QuizCard from "../../components/QuizCard/QuizCard"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"

const HomePage = () => {

    const { themeValue } = useContext(ThemeContext)

    const [popularQuizzesArr, setPopularQuizzesArr] = useState()
    const [dailyQuiz, setDailyQuiz] = useState()

    const theme = themeValue === 'light' ? 'dark' : 'light'

    useEffect(() => {
        popularQuizzes()
        getDailyQuiz()
    }, [])

    const popularQuizzes = () => {
        quizzesService
            .getThreeMorePopularQuizzes()
            .then(({ data }) => {
                console.log(data)
                setPopularQuizzesArr(data)
            })
            .catch(err => console.log(err))
    }

    const getDailyQuiz = () => {
        quizzesService
            .getDailyQuiz()
            .then(({ data }) => setDailyQuiz(data))
            .catch(err => console.log(err))
    }


    return (
        <Container fluid className="py-4">

            <Row className="mt-5 align-items-center" >
                <Col md={{ span: 5 }} className='mx-5 '>
                    <h1 style={{ fontSize: '4rem' }}>Welcome to CapyQuiz :3</h1>
                    <hr className={`${themeValue} hr`} />
                    <h2 style={{ fontSize: '3rem' }}>Welcome to our quiz app! Test your knowledge with our fun and engaging quizzes on various topics. Sign up to track your progress and earn badges. Take a quiz now and challenge yourself!</h2>
                    <Row>
                        <Col md={{ span: 6 }} >
                            <Link to={'/signup'} className="d-grid">
                                <Button variant={`outline-${theme} mt-4`}>Sign Up for Free!</Button>
                            </Link>
                        </Col>
                        <Col md={{ span: 6 }} >
                            <Link to={'/login'} className="d-grid">
                                <Button variant={`outline-${theme} mt-4`}>Log In</Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col md={{ span: 6 }} >
                    {
                        dailyQuiz ?
                            <QuizCard quiz={dailyQuiz} />
                            :
                            <SpinnerLoader />
                    }
                </Col>
            </Row>
            <section style={{ marginTop: '150px' }}>
                <Card className={`${themeValue} card mt-5 p-5`}>
                    <Card.Body>
                        <h2 >Most popular quizzes from CapyQuiz !</h2>
                        <Row>
                            {
                                popularQuizzesArr && popularQuizzesArr.map(quiz => {
                                    return (
                                        <Col key={quiz._id} md={{ span: 4 }} className='mt-4'>
                                            <Card className={`${themeValue} card m-3 p-3`}>
                                                <CardImg className="QuizImg" src={quiz.quizImg} alt={quiz.title}></CardImg>
                                                <Card.Title className="px-5 pt-5">{quiz.title}</Card.Title>
                                                <div className="d-flex justify-content-center">
                                                    <StarRating fireFinalActions={false} readOnly={true} rating={quiz.ratingAvg} />
                                                </div>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>

                    </Card.Body>

                </Card>
            </section>
        </Container>
    )
}

export default HomePage