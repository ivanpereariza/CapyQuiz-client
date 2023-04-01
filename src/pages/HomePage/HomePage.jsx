import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import { Button, Card, CardImg, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import quizzesService from "../../services/quizzes.services"
import './HomePage.css'
import StarRating from "../../components/StarRating/StarRating"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import { AuthContext } from "../../contexts/auth.context"
import Gallery from "../../components/Carousel/Carousel"


const HomePage = () => {

    const { themeValue, theme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    const [popularQuizzesArr, setPopularQuizzesArr] = useState()
    const [dailyQuiz, setDailyQuiz] = useState()



    useEffect(() => {
        popularQuizzes()
        getDailyQuiz()
    }, [])

    const popularQuizzes = () => {
        quizzesService
            .getThreeMorePopularQuizzes()
            .then(({ data }) => {
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
        <Container fluid className="pt-4 pb-0" >

            <Row className="mt-5  align-items-center justify-content-evenly" >
                <Col xl={{ span: 5 }} className='mb-4'>
                    <h1 style={{ fontSize: '4rem' }}><b> Welcome to CapyQuiz 😄</b></h1>
                    <hr className={`${themeValue} hr`} />
                    <h2 style={{ fontSize: '2.5rem' }}>Test your knowledge with our fun and engaging quizzes on various topics. Take a quiz now and challenge yourself!</h2>
                    {
                        !user &&
                        <Row>
                            <Col md={{ span: 6 }} >
                                <Link to={'/signup'} className="d-grid">
                                    <Button variant={`outline-${theme} mt-4 mx-3`} style={{ padding: '10px 0px' }}>Sign Up for Free!</Button>
                                </Link>
                            </Col>
                            <Col md={{ span: 6 }} >
                                <Link to={'/login'} className="d-grid">
                                    <Button variant={`outline-${theme} mt-4 mx-3`} style={{ padding: '10px 0px' }}>Log In</Button>
                                </Link>
                            </Col>
                        </Row>
                    }
                </Col>
                <Col xl={{ span: 4, offset: 1 }} >
                    {
                        dailyQuiz ?
                            <Card className={`${themeValue} card `} style={{ padding: '0px 15px 15px 15px ' }}>
                                <h1 className="px-5 pt-4 text-center fs-2 mx-4">Quiz of the day <br /> Try it without log in!</h1>

                                <Card className={`${themeValue} card m-3 p-3`}>
                                    <div className="d-flex justify-content-center">
                                        <img className="QuizImg" src={dailyQuiz.quizImg} alt={dailyQuiz.title} />
                                    </div>
                                    <Card.Title className="px-5 pt-5">{dailyQuiz.title}</Card.Title>
                                    <Link to={`/quizzes/play/${dailyQuiz._id}`} className='d-grid mt-5' >
                                        <Button type="submit" variant={`outline-${theme} mt-4`}>Start Game!</Button>
                                    </Link>
                                </Card>
                            </Card>
                            :
                            <SpinnerLoader />
                    }
                </Col>
            </Row>
            <section style={{ marginTop: '150px' }}>
                <Card className={`${themeValue} card mt-5 p-5`}>
                    <Card.Body>
                        <h2 className=" mb-4">Most popular quizzes from CapyQuiz !</h2>
                        <hr className={`${themeValue} hr`} />
                        <Row className="justify-content-between">
                            {
                                popularQuizzesArr && popularQuizzesArr.map(quiz => {
                                    return (
                                        <Col key={quiz._id} xl={{ span: 4 }} className='mt-4'>
                                            <Card className={`${themeValue} card my-3 p-3`}>
                                                <div className="d-flex justify-content-center">
                                                    <img className="QuizImg" src={quiz.quizImg} alt={quiz.title} />
                                                </div>
                                                <Card.Title className="pt-5">{quiz.title}</Card.Title>
                                                <div className="d-flex justify-content-center">
                                                    <StarRating fireFinalActions={false} readOnly={true} rating={quiz.ratingAvg} />
                                                </div>
                                                {
                                                    user &&
                                                    <Link to={`/quizzes/play/${quiz._id}`} className='d-grid mt-5' >
                                                        <Button type="submit" variant={`outline-${theme} mt-4`}>Start Game!</Button>
                                                    </Link>
                                                }
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>

                    </Card.Body>

                </Card>
            </section>

            <section >
                <h2 className="ms-5 my-5">Gallery</h2>
                <Gallery />
            </section>

            <section style={{ backgroundColor: '#D2B48C', marginTop: '40px', border: 'solid 1px black', borderRadius: '8px', padding: '50px' }}>
                <h2 className="mb-5 text-dark">About us</h2>
                <hr className="text-dark" />
                <Row >
                    <Col md={{ span: 3, offset: 1 }} >
                        <div className='d-flex justify-content-center'>
                            <img style={{ height: '400px', objectFit: 'contain', border: 'solid 1px black' }} src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678979767/IMG_3467_b8kf7u.jpg" alt="Gonzalo Rincón" />
                        </div>
                    </Col>
                    <Col md={{ span: 7, offset: 1 }}>
                        <h2 className="text-center mt-3 text-dark">Ivan Pereiro & Gonzalo Rincón</h2>
                        <h4 className=" text-dark" style={{ paddingTop: '40px' }}>
                            We are two guys who have recently completed a web developer Bootcamp in Madrid, and this is our final project. We are excited to share our journey with you and tell you a little bit more about ourselves.
                            <br />
                            Working together on this project has been a great experience. We have learned to work collaboratively and communicate effectively. Our goal was to create an engaging quiz platform that allows users to challenge themselves while having fun. We wanted to create a project that showcases our skills and reflects our passion for web development.
                            <br />
                            During the development process, we encountered various challenges, but we were able to overcome them by working together and sharing our knowledge. We are proud of what we have achieved, and we are excited to see how our project will be received by the public.
                        </h4>
                    </Col>
                </Row>

            </section>

        </Container >
    )
}

export default HomePage