import { useContext, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { ThemeContext } from "../../contexts/theme.context"
import commentsService from "../../services/comments.services"
import FormError from "../FormError/FormError"

const EditCommentForm = ({ getComments, setEditComment, id, message }) => {

    const [commentData, getCommentData] = useState(message)
    const [errors, setErrors] = useState([])

    const { themeValue, theme } = useContext(ThemeContext)


    const handleComment = e => {
        const { value } = e.target
        getCommentData(value)
    }

    const handleSubmit = e => {

        e.preventDefault()

        commentsService
            .editComment(id, { message: commentData })
            .then(() => {
                getComments()
                setEditComment(false)
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Edit your comment:</Form.Label>
                    <Form.Control as="textarea" rows={2} onChange={handleComment} value={commentData} className={`${themeValue} comment`} />
                </Form.Group>

                {errors.length > 0 && <FormError>{errors.map((elm, idx) => <p key={idx}>{elm}</p>)}</FormError>}
                <Row>
                    <Col className="d-grid" >
                        <Button type="submit" variant={`outline-${theme} mt-1`}>Comment</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default EditCommentForm