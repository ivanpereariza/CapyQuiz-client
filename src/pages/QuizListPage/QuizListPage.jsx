import React, { useEffect, useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import CreateQuizForm from '../../components/CreateQuizForm/CreateQuizForm'
import NewQuizzButton from '../../components/NewQuizzButton/NewQuizzButton'
import QuizList from '../../components/QuizList/QuizList'
import SearchBar from '../../components/SearchBar/SearchBar'
import quizzesService from '../../services/quizzes.services'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"

const QuizListPage = () => {

    const [quizzes, setQuizzes] = useState([])
    const [quizzesBackUp, setQuizzesBackUp] = useState([])
    const [showModal, setShowModal] = useState(false)

    const { themeValue } = useContext(ThemeContext)

    const bg = themeValue === 'dark' ? '#272727' : '#D5D5D5'
    const color = themeValue === 'dark' ? 'white' : 'black'

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
        const filteredQuizzes = quizzesBackUp.filter(elm => elm.title.toLowerCase().includes(e.target.value.toLowerCase())
            || elm.theme.toLowerCase().includes(e.target.value.toLowerCase()))
        setQuizzes(filteredQuizzes)
    }

    const fireFinalActions = () => {
        setShowModal(false)
        loadQuizzes()
    }

    return (
        <>
            <Container>
                <h1>Check the quizzes created by the community!</h1>
                <Row>
                    <Col md={{ span: 4 }}>
                        <SearchBar handleSearchBar={handleSearchBar} />
                    </Col>
                    <Col className='d-flex' md={{ span: 4 }} >
                        <NewQuizzButton setShowModal={setShowModal} />
                    </Col>
                </Row>
                <QuizList quizzes={quizzes} />
            </Container>


            <Modal
                size="lg"
                scrollable={true}
                show={showModal}
                onHide={() => setShowModal(false)}>
                <Modal.Header closeButton closeVariant={color} style={{
                    backgroundColor: bg,
                    color: color,
                }}>
                    <Modal.Title>New Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: bg,
                    color: color
                }}>
                    <CreateQuizForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default QuizListPage