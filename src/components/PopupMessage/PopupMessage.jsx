import { useContext } from "react"
import { MessageContext } from "../../contexts/message.context"
import { Toast, ToastContainer } from 'react-bootstrap';

const PopupMessage = () => {


    const { toastMessage, closeToast, showToast } = useContext(MessageContext)

    return (
        <ToastContainer className="p-3 position-fixed" position={'top-center'}>
            <Toast onClose={closeToast} show={showToast} delay={3000} autohide>
                <Toast.Body className="text-center">{toastMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default PopupMessage