import { useContext, useEffect, useState } from "react"
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ThemeContext } from "../../contexts/theme.context"
import quizzesService from "../../services/quizzes.services"

const Comments = ({ quizId }) => {

    const [comments, setComments] = useState()

    const { themeValue } = useContext(ThemeContext)

    useEffect(() => {
        getComments()
    }, [quizId])

    const getComments = () => {
        quizzesService
            .getComments(quizId)
            .then(({ data }) => setComments(data.comments))
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                comments?.length > 0 &&
                <>

                    <p><b>Comments</b></p>
                    <hr className={`${themeValue} hr`} />
                    {
                        comments?.map((elm, idx) => {
                            return (
                                <Card className={`${themeValue} mt-3`} key={idx}>
                                    <div className="p-3">
                                        <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id={`tooltip-bottom`}>
                                                {elm.owner.username}
                                            </Tooltip>}
                                        >
                                            <Link to={`/profile/${elm.owner._id}`}>
                                                <img className={`${themeValue} ownerAvatar`} src={elm.owner.avatar} alt="" />
                                            </Link>
                                        </OverlayTrigger>
                                        {elm.message}
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