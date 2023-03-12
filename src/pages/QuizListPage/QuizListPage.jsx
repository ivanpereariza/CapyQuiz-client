import { Slider } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NewQuizModal from '../../components/NewQuizModal/NewQuizModal'
import NewQuizzButton from '../../components/NewQuizzButton/NewQuizzButton'
import QuizDetailsModal from '../../components/QuizDetailsModal/QuizDetailsModal'
import QuizList from '../../components/QuizList/QuizList'
import SearchBar from '../../components/SearchBar/SearchBar'
import { AuthContext } from '../../contexts/auth.context'
import quizzesService from '../../services/quizzes.services'
import getAverageRating from '../../utils/getAverageRating'




const QuizListPage = () => {

    const [quizzes, setQuizzes] = useState('')
    const [quizzesBackUp, setQuizzesBackUp] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showModalDetails, setShowModalDetails] = useState(false)
    const [selectedQuiz, setSelectedQuiz] = useState('')
    const [ratingValue, setRatingValue] = useState([0, 5])
    const [searchValue, setSearchValue] = useState('')


    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadQuizzes()

    }, [])


    const loadQuizzes = () => {
        quizzesService
            .getAllQuizzes()
            .then(({ data }) => {
                setQuizzes(data)
                setQuizzesBackUp(data)
            })
            .catch(err => console.log(err))
    }

    const handleSearchBar = e => {
        setSearchValue(e.target.value)

        // handleFilters()
        const filteredQuizzes = quizzesBackUp.filter(elm => elm.title.toLowerCase().includes(e.target.value.toLowerCase())
            || elm.theme.toLowerCase().includes(e.target.value.toLowerCase()))
        setQuizzes(filteredQuizzes)
    }

    const handleRatingBar = (e, newValue) => {
        setRatingValue(newValue)
        // handleFilters()
        const filteredQuizzes = quizzesBackUp.filter(elm => getAverageRating(elm) >= e.target.value[0] && getAverageRating(elm) <= e.target.value[1])
        setQuizzes(filteredQuizzes)
    }

    // const handleFilters = () => {
    //     const filteredQuizzes = quizzesBackUp.filter(elm => elm.title.toLowerCase().includes(searchValue.toLowerCase())
    //         || elm.theme.toLowerCase().includes(searchValue.toLowerCase())).filter(elm => getAverageRating(elm) >= ratingValue[0] && getAverageRating(elm) <= ratingValue[1])
    //     setQuizzes(filteredQuizzes)

    // }


    const fireFinalActions = () => {
        setShowModal(false)
        loadQuizzes()
    }

    const openModalDetails = (id) => {
        setShowModalDetails(true)
        setSelectedQuiz(id)
    }

    return (
        <>
            <Container className='mt-4'>
                <h1>Check the quizzes created by the community!</h1>
                <hr />
                <Row className='align-items-center'>
                    <Col md={{ span: 4 }}>
                        <SearchBar handleSearchBar={handleSearchBar} />
                    </Col>
                    <Col md={{ span: 3, offset: 1 }}>
                        <div>
                            <h4>Filter by rating:</h4>
                            <Slider
                                getAriaLabel={() => 'Ranking range'}
                                value={ratingValue}
                                onChange={handleRatingBar}
                                valueLabelDisplay="auto"
                                max={5}
                                min={0}
                                color={'primary'}
                            />
                        </div>
                    </Col>
                    {
                        user ?
                            <Col className='d-flex' md={{ span: 2, offset: 2 }} >
                                <NewQuizzButton setShowModal={setShowModal} />
                            </Col>
                            :
                            undefined
                    }
                </Row>
                <QuizList quizzes={quizzes} openModalDetails={openModalDetails} user={user} fireFinalActions={fireFinalActions} />
            </Container>

            <QuizDetailsModal selectedQuiz={selectedQuiz} showModalDetails={showModalDetails} setShowModalDetails={setShowModalDetails} user={user} />

            <NewQuizModal fireFinalActions={fireFinalActions} setShowModal={setShowModal} showModal={showModal} />

        </>
    )
}

export default QuizListPage