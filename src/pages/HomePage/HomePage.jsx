import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import StarRating from "../../components/StarRating/StarRating"

const HomePage = () => {


    const { themeValue } = useContext(ThemeContext)
    const theme = themeValue === 'light' ? 'dark' : 'light'

    return (
        <Container className={`mt-4`}>
            <h1>Welcome to CapyQuiz :3</h1>
            <Link to="/quizzes" >
                <Button type="submit" variant={`outline-${theme} mt-4`}>Go Quizzes!</Button>
            </Link>
        </Container>
    )
}

export default HomePage