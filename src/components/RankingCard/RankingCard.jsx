import { Card, Col, Row } from 'react-bootstrap'
import './RankingCard.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme.context'
import { RankingStyles } from '../../consts'

const RankingCard = ({ avatar, points, _id, quizzes, username, idx }) => {


    const { themeValue, theme: themeText } = useContext(ThemeContext)

    const opacityCard = idx === 0 || idx === 1 || idx === 2 ? 'bg-opacity-75' : undefined

    return (
        <Link to={`/profile/${_id}`} id={idx}>
            <Card bg={`${idx < 3 ? RankingStyles.TOP_STYLES[idx].cardColor : themeValue} ${opacityCard}`} className={`RankingCard mb-2 py-${idx < 4 ? RankingStyles.TOP_STYLES[idx].cardPadding : RankingStyles.TOP_STYLES[3].cardPadding}`} style={{ backgroundColor: idx === 2 && '#cd7f32' }}>
                <Card.Body>
                    <Row className='align-items-center text-center'>
                        <Col xs={{ span: 4 }}>
                            <Row className='align-items-center'>
                                <Col md={{ span: 4 }}>
                                    <img style={{ width: idx < 4 ? RankingStyles.TOP_STYLES[idx].width : RankingStyles.TOP_STYLES[3].width, height: idx < 4 ? RankingStyles.TOP_STYLES[idx].height : RankingStyles.TOP_STYLES[3].height }} src={avatar} alt={username} />
                                </Col>
                                <Col md={{ span: 8 }}   >
                                    <p className={`text-${themeText} m-auto fs-${idx < 4 ? RankingStyles.TOP_STYLES[idx].fs : RankingStyles.TOP_STYLES[3].fs}`}>{username}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ span: 4 }}>
                            <p className={`text-${themeText} m-auto fs-${idx < 4 ? RankingStyles.TOP_STYLES[idx].fs : RankingStyles.TOP_STYLES[3].fs}`}>{quizzes.length}</p>
                        </Col>
                        <Col xs={{ span: 4 }}>
                            <p className={`text-${themeText} m-auto fs-${idx < 4 ? RankingStyles.TOP_STYLES[idx].fs : RankingStyles.TOP_STYLES[3].fs}`}>{points}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Link >
    )
}

export default RankingCard