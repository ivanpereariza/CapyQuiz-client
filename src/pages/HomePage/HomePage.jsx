import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <Container className="mt-5">
            <h1>Welcome to CapyQuiz :3</h1>
            <Link to="/quizzes" >
                <Button className="mt-3" variant="dark" type="submit">Go Quizzes!</Button>
            </Link>
        </Container>
    )
}

export default HomePage