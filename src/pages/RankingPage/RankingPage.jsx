import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Ranking from "../../components/Ranking/Ranking"
import { AuthContext } from "../../contexts/auth.context"
import { ThemeContext } from "../../contexts/theme.context"
import usersService from "../../services/users.services"

const RankingPage = () => {

    const { themeValue, theme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)

    const [index, setIndex] = useState()

    const checkIfRanking = (ranking) => {
        ranking.map((elm, idx) => elm.points && user?._id === elm._id && setIndex(idx))
    }

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

        <Container className="py-4">
            <Row className="mb-4">
                <Col md={{ offset: 2, span: 9 }}>
                    <Row className="align-items-center">
                        <Col md={{ span: 9 }}>
                            <h1>CapyQuiz Ranking</h1>
                        </Col>
                        <Col md={{ span: 3 }} >
                            {
                                (index || index === 0) && <Button variant={`outline-${theme}`} href={`#${index > 0 ? index - 1 : index}`}>Check your position!</Button>
                            }
                        </Col>
                    </Row>
                    <hr className={`${themeValue} hr`} />

                </Col>
            </Row>
            <Ranking ranking={ranking} />
        </Container>
    )
}


export default RankingPage