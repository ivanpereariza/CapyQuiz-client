import { useContext } from "react"
import { Modal } from "react-bootstrap"
import { ThemeContext } from "../../contexts/theme.context"

const QuizDetailsModal = ({ setShowModalDetails, showModalDetails }) => {

    const { themeValue } = useContext(ThemeContext)

    const bg = themeValue === 'dark' ? '#272727' : '#D5D5D5'
    const color = themeValue === 'dark' ? 'white' : 'black'

    return (
        <Modal
            size="lg"
            show={showModalDetails}
            onHide={() => setShowModalDetails(false)}>
            <Modal.Header closeButton closeVariant={color} style={{
                backgroundColor: bg,
                color: color,
            }}>
                <Modal.Title>Quiz details</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{
                backgroundColor: bg,
                color: color
            }}>
            </Modal.Body>
        </Modal>
    )
}

export default QuizDetailsModal