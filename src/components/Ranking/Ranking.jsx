import { Col, Row } from "react-bootstrap"
import RankingCard from "../RankingCard/RankingCard"
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader"

const Ranking = ({ ranking }) => {




    return (
        <>
            {
                ranking ?
                    <>
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
                                                <RankingCard {...elm} idx={idx} />
                                            </Col>

                                        </Row>

                                    )
                                }
                                return undefined

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