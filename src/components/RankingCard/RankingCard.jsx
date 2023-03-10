import { Card, Col, Row } from 'react-bootstrap'
import './RankingCard.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme.context'

const RankingCard = ({ user, idx }) => {

    const { avatar, points, _id, quizzes, username } = user

    const { themeValue } = useContext(ThemeContext)

    const themeText = themeValue === 'dark' ? 'light' : 'dark'

    let cardColor

    if (idx === 0) cardColor = 'warning'
    else if (idx === 1) cardColor = 'secondary'
    else if (idx === 2) cardColor = ''
    else cardColor = themeValue

    const opacitiCard = idx === 0 || idx === 1 || idx === 2 ? 'bg-opacity-75' : undefined

    return (
        <Link to={`/profile/${_id}`} >
            <Card bg={`${cardColor} ${opacitiCard}`} className='RankingCard mb-2' style={{ backgroundColor: idx === 2 && '#cd7f32' }}>
                <Card.Body>
                    <Row className='align-items-center text-center'>
                        <Col xs={{ span: 4 }}>
                            <Row className='align-items-center'>
                                <Col md={{ span: 4 }}>
                                    <img src={avatar} />
                                </Col>
                                <Col md={{ span: 8 }}   >
                                    <p className={`text-${themeText} m-auto`}>{username}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ span: 4 }}>
                            <p className={`text-${themeText} m-auto`}>{quizzes.length}</p>
                        </Col>
                        <Col xs={{ span: 4 }}>
                            <p className={`text-${themeText} m-auto`}>{points}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Link >
    )
}

export default RankingCard