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
    let cardPadding
    let width
    let height
    let fs

    if (idx === 0) {
        cardColor = 'warning'
        cardPadding = '4'
        width = '65px'
        height = '65px'
        fs = '2'
    }
    else if (idx === 1) {
        cardColor = 'secondary'
        cardPadding = '3'
        width = '55px'
        height = '55px'
        fs = '3'
    }
    else if (idx === 2) {
        cardColor = ''
        cardPadding = '2'
        width = '45px'
        height = '45px'
        fs = '4'
    }
    else {
        cardColor = themeValue
        cardPadding = '1'
        width = '40px'
        height = '40px'
        fs = '5'

    }

    const opacitiCard = idx === 0 || idx === 1 || idx === 2 ? 'bg-opacity-75' : undefined

    return (
        <Link to={`/profile/${_id}`} id={_id}>
            <Card bg={`${cardColor} ${opacitiCard}`} className={`RankingCard mb-2 py-${cardPadding}`} style={{ backgroundColor: idx === 2 && '#cd7f32' }}>
                <Card.Body>
                    <Row className='align-items-center text-center'>
                        <Col xs={{ span: 4 }}>
                            <Row className='align-items-center'>
                                <Col md={{ span: 4 }}>
                                    <img style={{ width: width, height: height }} src={avatar} />
                                </Col>
                                <Col md={{ span: 8 }}   >
                                    <p className={`text-${themeText} m-auto fs-${fs}`}>{username}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ span: 4 }}>
                            <p className={`text-${themeText} m-auto fs-${fs}`}>{quizzes.length}</p>
                        </Col>
                        <Col xs={{ span: 4 }}>
                            <p className={`text-${themeText} m-auto fs-${fs}`}>{points}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Link >
    )
}

export default RankingCard