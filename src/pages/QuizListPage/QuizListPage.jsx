import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import QuizCard from '../../components/QuizCard/QuizCard'
import QuizList from '../../components/QuizList/QuizList'
import SearchBar from '../../components/SearchBar/SearchBar'
import quizzesService from '../../services/quizzes.services'

const QuizListPage = () => {

    const [quizzes, setQuizzes] = useState([])
    const [quizzesBackUp, setQuizzesBackUp] = useState([])

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
        const filteredQuizzes = quizzesBackUp.filter(elm => elm.title.toLowerCase().includes(e.target.value) || elm.theme.toLowerCase().includes(e.target.value))
        setQuizzes(filteredQuizzes)
    }

    return (
        <Container>
            <h1>Check the quizzes created by the community!</h1>
            <SearchBar handleSearchBar={handleSearchBar} />
            <QuizList quizzes={quizzes} />

        </Container>
    )
}

export default QuizListPage