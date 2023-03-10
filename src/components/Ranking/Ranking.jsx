import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import usersService from "../../services/users.services"
import RankingCard from "../RankingCard/RankingCard"
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader"

const Ranking = () => {

    const [ranking, setRanking] = useState()

    useEffect(() => {
        getRankingUsers()
    }, [])

    const getRankingUsers = () => {
        usersService
            .getUsersByPoints()
            .then(({ data }) => setRanking(data))
            .catch(err => console.log(err))
    }

    console.log(ranking)
    return (
        <>
            {
                ranking ?
                    <>
                        <Row className="text-center">
                            <Col xs={{ span: 1, offset: 1 }}>
                            </Col>
                            <Col xs={{ span: 9 }}>
                                <Row>
                                    <Col xs={{ span: 4 }}>
                                        <p>User</p>
                                    </Col>
                                    <Col xs={{ span: 4 }}>
                                        <p>Quizzes completed</p>
                                    </Col>
                                    <Col xs={{ span: 4 }}>
                                        <p className="me-4">Points</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {
                            ranking.map((elm, idx) => {
                                return (


                                    <Row key={idx} className='align-items-center'>
                                        <Col xs={{ span: 1, offset: 1 }}>
                                            <p className="m-auto text-end"> {idx + 1}</p>
                                        </Col>
                                        <Col xs={{ span: 9 }}>
                                            <RankingCard user={elm} idx={idx} />
                                        </Col>

                                    </Row>

                                )
                            })
                        }
                    </>
                    :
                    <SpinnerLoader />
            }
        </>
    )
}

export default Ranking