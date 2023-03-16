import { useContext, useEffect, useState } from "react"
import { Button, Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import { ThemeContext } from "../../contexts/theme.context"
import commentsService from "../../services/comments.services"
import quizzesService from "../../services/quizzes.services"
import EditCommentForm from "../EditCommentForm/EditCommentForm.jsx"
import './Comments.css'

const Comments = ({ quizId }) => {

    const [comments, setComments] = useState()
    const [editComment, setEditComment] = useState(false)
    const [messageData, setMessageData] = useState()

    const { themeValue } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getComments()
    }, [quizId])

    const getComments = () => {
        quizzesService
            .getComments(quizId)
            .then(({ data }) => setComments(data.comments))
            .catch(err => console.log(err))
    }

    const deleteComment = (id) => {
        commentsService
            .deleteComment(id)
            .then(() => getComments())
            .catch(err => console.log(err))
    }

    const editCommentInput = (id, message) => {
        setMessageData({ id, message })
        setEditComment(true)
    }
    console.log(user.role)

    return (
        <>
            {
                editComment ?
                    <EditCommentForm getComments={getComments} setEditComment={setEditComment} {...messageData} />
                    :
                    comments?.length > 0 &&
                    <>
                        <h5>Comments</h5>
                        <hr className={`${themeValue} hr`} />
                        {
                            comments.map((elm, idx) => {
                                return (
                                    <Card className={`${themeValue} mt-3`} key={idx}>
                                        <div className="p-3">
                                            <Row className="align-items-center">
                                                <Col className="me-4 my-1" lg={{ span: 1 }}>
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        overlay={<Tooltip id={`tooltip-bottom`}>
                                                            {elm.owner.username}
                                                        </Tooltip>}
                                                    >
                                                        <Link to={`/profile/${elm.owner._id}`}>
                                                            <img className={`${themeValue} ownerAvatar`} src={elm.owner.avatar} alt="avatar" />
                                                        </Link>
                                                    </OverlayTrigger>
                                                </Col>
                                                <Col lg={{ span: 8 }} className='my-1'>
                                                    {elm.message}
                                                </Col>
                                                {
                                                    (user?._id === elm.owner._id || user?.role === 'ADMIN' || user?.role === 'EDITOR') &&
                                                    <Col className="my-1">
                                                        <Row>
                                                            <Col xs={{ span: 2 }} lg={{ span: 6 }}>
                                                                <Button onClick={() => editCommentInput(elm._id, elm.message)} className='CommentButtons d-flex justify-content-center' variant="warning">
                                                                    <div>
                                                                        <img src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678873300/editwhite_ctrekv.png"
                                                                            className="mx-auto" alt="edit" />
                                                                    </div>
                                                                </Button>
                                                            </Col>
                                                            <Col xs={{ span: 2 }} lg={{ span: 6 }}>
                                                                <Button onClick={() => deleteComment(elm._id)} className='CommentButtons d-flex justify-content-center' variant="danger">
                                                                    <div>
                                                                        <img src="https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678874366/xwhite2_l8yqvt.png"
                                                                            className="mx-auto" alt="delete" />
                                                                    </div>
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                }
                                            </Row>

                                        </div>
                                    </Card>
                                )
                            })

                        }
                    </>
            }
        </>
    )
}

export default Comments