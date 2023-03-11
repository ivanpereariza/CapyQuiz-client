import { useContext, useEffect, useState } from "react"
import { Container, Modal } from "react-bootstrap"
import { ThemeContext } from "../../contexts/theme.context"
import quizzesService from "../../services/quizzes.services"
import QuizDetails from "../QuizDetails/QuizDetails"

const QuizDetailsModal = ({ setShowModalDetails, showModalDetails, selectedQuiz, user }) => {

    const [quiz, setQuiz] = useState(undefined)

    const { themeValue } = useContext(ThemeContext)

    const headerbg = themeValue === 'dark' ? '#3a3a3a' : '#bebebe'
    const bg = themeValue === 'dark' ? '#272727' : '#D5D5D5'
    const color = themeValue === 'dark' ? 'white' : undefined


    useEffect(() => {
        getQuiz()
    }, [showModalDetails])

    const getQuiz = () => {
        if (selectedQuiz)
            quizzesService
                .getQuizById(selectedQuiz)
                .then(({ data }) => setQuiz(data))
                .catch(err => console.log(err))
    }

    return (
        <>
            {

                selectedQuiz &&
                <Modal
                    size="lg"
                    show={showModalDetails}
                    onHide={() => setShowModalDetails(false)}>
                    <Modal.Header closeButton closeVariant={color} style={{
                        backgroundColor: headerbg,
                        color: color,
                        borderBlockColor: color
                    }}>
                        <Modal.Title>Quiz details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{
                        backgroundColor: bg,
                        color: color
                    }}>
                        <QuizDetails quiz={quiz} user={user} />
                    </Modal.Body>
                </Modal>

            }
        </>
    )
}

export default QuizDetailsModal