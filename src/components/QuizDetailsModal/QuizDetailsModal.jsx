import { useContext, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { ThemeContext } from "../../contexts/theme.context"
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader"
import quizzesService from "../../services/quizzes.services"

const QuizDetailsModal = ({ setShowModalDetails, showModalDetails, selectedQuiz }) => {

    const [quiz, setQuiz] = useState(undefined)

    const { themeValue } = useContext(ThemeContext)

    const bg = themeValue === 'dark' ? '#272727' : '#D5D5D5'
    const color = themeValue === 'dark' ? 'white' : 'black'


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

                selectedQuiz ?
                    <Modal
                        size="lg"
                        show={showModalDetails}
                        onHide={() => setShowModalDetails(false)}>
                        <Modal.Header closeButton style={{
                            backgroundColor: bg,
                            color: color,
                        }}>
                            <Modal.Title>Quiz details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{
                            backgroundColor: bg,
                            color: color
                        }}>
                            <h3>Title: {quiz?.title}</h3>
                        </Modal.Body>
                    </Modal>
                    :
                    <SpinnerLoader />
            }
        </>
    )
}

export default QuizDetailsModal