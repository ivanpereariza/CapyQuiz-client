import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import usersService from "../../services/users.services"
import RankingCard from "../RankingCard/RankingCard"
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader"

const Ranking = ({ checkIfRanking }) => {

    const [ranking, setRanking] = useState()

    useEffect(() => {
        getRankingUsers()
    }, [])

    const getRankingUsers = () => {
        usersService
            .getUsersByPoints()
            .then(({ data }) => {
                setRanking(data)
                checkIfRanking(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                ranking ?
                    <div>
                        <Row className="text-center mb-3">
                            <Col xs={{ span: 1, offset: 1 }}>
                            </Col>
                            <Col xs={{ span: 9 }}>
                                <Row>
                                    <Col xs={{ span: 4 }}>
                                        <p className="fs-3">User</p>
                                    </Col>
                                    <Col xs={{ span: 4 }}>
                                        <p className="fs-3">Quizzes completed</p>
                                    </Col>
                                    <Col xs={{ span: 4 }}>
                                        <p className="me-4 fs-3">Points</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {
                            ranking.map((elm, idx) => {
                                if (elm.points) {
                                    return (


                                        <Row key={idx} className='align-items-center'>
                                            <Col xs={{ span: 1, offset: 1 }}>
                                                <p className="m-auto text-end fs-3"> {idx + 1}</p>
                                            </Col>
                                            <Col xs={{ span: 9 }}>
                                                <RankingCard user={elm} idx={idx} />
                                            </Col>

                                        </Row>

                                    )
                                }

                            })
                        }
                    </div>
                    :
                    <SpinnerLoader />
            }
        </>
    )
}

export default Ranking