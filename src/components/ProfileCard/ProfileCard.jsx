import { Card, Container, Row } from 'react-bootstrap'
import './ProfileCard.css'

const ProfileCard = ({ user }) => {

    const { data } = user
    const { avatar, role, points, username } = data

    return (
        <Container>
            <Row className='justify-content-center'>
                <Card className='ProfileCard'>
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
