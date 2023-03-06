import './ProfileCard.css'

const ProfileCard = ({ user }) => {

    console.log(user)
    const { data } = user
    const { avatar, role, points, username } = data



    return (
        <div>
            <img className='AvatarImg' src={avatar} alt={username} />
            <p>{username} profile</p>
            <p>Points: {points}</p>
            <p>Role: {role}</p>
        </div>
    )
}

export default ProfileCard