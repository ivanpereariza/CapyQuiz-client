import { useContext } from "react"
import { Modal } from "react-bootstrap"
import { ThemeContext } from "../../contexts/theme.context"
import CreateQuizForm from "../CreateQuizForm/CreateQuizForm"

const NewQuizModal = ({ fireFinalActions, setShowModal, showModal }) => {

    const { themeValue } = useContext(ThemeContext)

    const headerbg = themeValue === 'dark' ? '#3a3a3a' : '#bebebe'
    const bg = themeValue === 'dark' ? '#272727' : '#D5D5D5'
    const color = themeValue === 'dark' ? 'white' : 'black'

    return (
        <Modal
            size="lg"
            scrollable={true}
            show={showModal}
            onHide={() => setShowModal(false)}>
            <Modal.Header closeButton closeVariant={color} style={{
                backgroundColor: headerbg,
                color: color,
                borderBlockColor: color
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
    )
}

export default NewQuizModal