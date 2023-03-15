import { useContext, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { MessageContext } from "../../contexts/message.context"
import { ThemeContext } from "../../contexts/theme.context"
import commentsService from "../../services/comments.services"
import FormError from "../FormError/FormError"

const CommentsForm = ({ quizId }) => {

    const [commentData, setCommentData] = useState('')
    const [errors, setErrors] = useState([])

    const { themeValue } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)


    const theme = themeValue === 'light' ? 'dark' : 'light'


    const handleComment = e => {
        const { value } = e.target
        setCommentData(value)
    }

    const handleSubmit = e => {

        e.preventDefault()

        commentsService
            .saveComment(user?._id, commentData, quizId)
            .then(() => {
                setCommentData('')
                emitMessage('Thanks for your comment! Saved correctly 👍')

            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    return (

        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Leave your comment about this quiz!</Form.Label>
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

export default CommentsForm