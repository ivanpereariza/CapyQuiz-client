import { Alert } from "react-bootstrap"

const FormError = ({ children }) => {
    return (
        <Alert variant={"danger"}>
            {children}
        </Alert>
    )
}

export default FormError