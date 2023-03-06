import { Card, Container, Row } from 'react-bootstrap'
import './ProfileCard.css'
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme.context"

const ProfileCard = ({ user }) => {

    const { data } = user
    const { avatar, role, points, username } = data

    const { themeValue } = useContext(ThemeContext)


    return (
        <Container>
            <Row className='justify-content-center'>
                <Card className={`ProfileCard ${themeValue} card mt-5`}>
                    <Card.Img variant="top" className='AvatarImg' src={avatar} alt={username} />
                    <Card.Body>
                        <Card.Title>{username}</Card.Title>
                        <Card.Text>
                            Points: {points}
                        </Card.Text>
                        <Card.Text>
                            Role: {role}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default ProfileCard
