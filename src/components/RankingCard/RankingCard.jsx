import { Card, Col, Row } from 'react-bootstrap'
import './RankingCard.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme.context'

const RankingCard = ({ avatar, points, _id, quizzes, username, idx }) => {


    const { themeValue } = useContext(ThemeContext)

    const themeText = themeValue === 'dark' ? 'light' : 'dark'

    const quizzStyles = [{
        cardColor: 'warning',
        cardPadding: '4',
        width: '65px',
        height: '65px',
        fs: '2'
    },
    {
        cardColor: 'secondary',
        cardPadding: '4',
        width: '65px',
        height: '65px',
        fs: '2'
    },
    {
        cardColor: '',
        cardPadding: '2',
        width: '45px',
        height: '45px',
        fs: '4'
    },
    {
        cardColor: themeValue,
        cardPadding: '1',
        width: '40px',
        height: '40px',
        fs: '5'
    },]

    const opacityCard = idx === 0 || idx === 1 || idx === 2 ? 'bg-opacity-75' : undefined

    return (
        <Link to={`/profile/${_id}`} id={_id}>
            <Card bg={`${idx < 4 ? quizzStyles[idx].cardColor : quizzStyles[3].cardColor} ${opacityCard}`} className={`RankingCard mb-2 py-${idx < 4 ? quizzStyles[idx].cardPadding : quizzStyles[3].cardPadding}`} style={{ backgroundColor: idx === 2 && '#cd7f32' }}>
                <Card.Body>
                    <Row className='align-items-center text-center'>
                        <Col xs={{ span: 4 }}>
                            <Row className='align-items-center'>
                                <Col md={{ span: 4 }}>
                                    <img style={{ width: idx < 4 ? quizzStyles[idx].width : quizzStyles[3].width, height: idx < 4 ? quizzStyles[idx].height : quizzStyles[3].height }} src={avatar} alt={username} />
                                </Col>
                                <Col md={{ span: 8 }}   >
                                    <p className={`text-${themeText} m-auto fs-${idx < 4 ? quizzStyles[idx].fs : quizzStyles[3].fs}`}>{username}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ span: 4 }}>
                            <p className={`text-${themeText} m-auto fs-${idx < 4 ? quizzStyles[idx].fs : quizzStyles[3].fs}`}>{quizzes.length}</p>
                        </Col>
                        <Col xs={{ span: 4 }}>
                            <p className={`text-${themeText} m-auto fs-${idx < 4 ? quizzStyles[idx].fs : quizzStyles[3].fs}`}>{points}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Link >
    )
}

export default RankingCard