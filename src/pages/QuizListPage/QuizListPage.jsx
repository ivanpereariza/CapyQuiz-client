import React, { useEffect, useState, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NewQuizModal from '../../components/NewQuizModal/NewQuizModal'
import NewQuizzButton from '../../components/NewQuizzButton/NewQuizzButton'
import QuizList from '../../components/QuizList/QuizList'
import SearchBar from '../../components/SearchBar/SearchBar'
import { AuthContext } from '../../contexts/auth.context'
import quizzesService from '../../services/quizzes.services'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ThemeContext } from '../../contexts/theme.context'
import { SliderConstants } from '../../consts'

const QuizListPage = () => {

    const [quizzes, setQuizzes] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [ratingValue, setRatingValue] = useState([0, 5])
    const [searchValue, setSearchValue] = useState('')

    const { user } = useContext(AuthContext)
    const { themeValue } = useContext(ThemeContext)

    useEffect(() => {
        loadQuizzes()
    }, [])

    useEffect(() => {
        filteredQuizzes()
    }, [searchValue, ratingValue])



    const loadQuizzes = () => {
        quizzesService
            .getAllQuizzes()
            .then(({ data }) => setQuizzes(data))
            .catch(err => console.log(err))
    }

    const handleSearchBar = e => {
        setSearchValue(e.target.value)
    }

    const handleRatingBar = e => {
        setRatingValue(e)
    }
    const filteredQuizzes = () => {
        quizzesService
            .searchQuizzes(searchValue, ratingValue[0], ratingValue[1])
            .then(({ data }) => setQuizzes(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        setShowModal(false)
        loadQuizzes()
    }

    return (
        <>
            <Container className='py-4'>
                <h1>Check the quizzes created by the community!</h1>
                <hr className={`${themeValue} hr`} />
                <Row className='align-items-center'>
                    <Col md={{ span: 4 }} className='my-3'>
                        <SearchBar handleSearchBar={handleSearchBar} searchValue={searchValue} />
                    </Col>
                    <Col md={{ span: 5 }} className='my-3'>
                        <Row >
                            <Col md={{ span: 5 }}>
                                <h5>Filter by rating:</h5>
                            </Col>
                            <Col md={{ span: 7 }}>
                                <Slider
                                    value={ratingValue}
                                    onChange={handleRatingBar}
                                    range
                                    min={0}
                                    max={5}
                                    marks={SliderConstants.SLIDER_MARKS}

                                />
                            </Col>
                        </Row>
                    </Col>
                    {
                        user &&
                        <Col md={{ span: 2, offset: 1 }} className='my-3'>
                            <NewQuizzButton setShowModal={setShowModal} />
                        </Col>
                    }
                </Row>
                <QuizList quizzes={quizzes} fireFinalActions={fireFinalActions} />
            </Container >

            <NewQuizModal fireFinalActions={fireFinalActions} setShowModal={setShowModal} showModal={showModal} />

        </>
    )
}

export default QuizListPage