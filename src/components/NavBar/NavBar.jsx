import { useContext, useEffect, useState } from 'react'
import { Badge, Dropdown, Nav, Navbar } from 'react-bootstrap'
import '../NavBar/NavBar.css'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { ThemeContext } from '../../contexts/theme.context'
import socket from '../../services/socket.services'
import notificationService from '../../services/notifications.services'
import { ModalQuizContext } from '../../contexts/modalQuiz.context'

function NavBar() {

    const location = useLocation()

    const [notifications, setNotifications] = useState([])


    const { user, logout } = useContext(AuthContext)
    const { themeValue, switchTheme } = useContext(ThemeContext)
    const { openModalDetails } = useContext(ModalQuizContext)

    const themeText = themeValue === 'light' ? 'Dark Mode' : 'Light Mode'
    const linkTheme = themeValue === 'light' ? 'lightTheme' : 'darkTheme'


    // useEffect(() => {
    //     socket.on('connect', () => {
    //         socket.emit('clientConnected')
    //     })

    //     socket.on("getNotification", (data) => {
    //         if (user?._id === data.ownerId)
    //             setNotifications((prev) => [...prev, data])
    //     })
    // }, [socket, user])

    useEffect(() => {
        getNotifications()
    }, [user])

    const getNotifications = () => {
        if (user) {
            notificationService
                .getNotificationsById(user?._id)
                .then(({ data }) => setNotifications(data))
                .catch(err => console.log(err))
        }
    }

    const deleteNotification = (id) => {
        notificationService
            .deleteNotification(id)
            .then(() => getNotifications())
            .catch(err => console.log(err))
    }

    const handleNotification = (elm) => {
        openModalDetails(elm.quiz._id)
        deleteNotification(elm._id)
    }

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" variant={themeValue} className={`${themeValue} navbar`} >
            <Navbar.Brand >
                <Link to='/'>
                    <img className='navBrand' src={themeValue === 'light' ?
                        'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678794304/capyquizlight_rcixoj.png'
                        : 'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678794305/capyquizdark_zn00pe.png'} alt="logo" />
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/" >
                        <Nav.Link className={location.pathname === '/' && `active ${linkTheme}`} as="span">Home</Nav.Link>
                    </Link>
                    <Link to="/quizzes">
                        <Nav.Link className={location.pathname === '/quizzes' && `active ${linkTheme}`} as="span">Quizzes</Nav.Link>
                    </Link>
                    <Link to="/ranking">
                        <Nav.Link className={location.pathname === '/ranking' && `active ${linkTheme}`} as="span">Ranking</Nav.Link>
                    </Link>
                    {
                        user
                            ?
                            <Link to="/quizzes/create">
                                <Nav.Link className={location.pathname === '/quizzes/create' && `active ${linkTheme}`} as="span" >Create Quiz</Nav.Link>
                            </Link>
                            :
                            null
                    }
                </Nav>
                <Nav >

                    {
                        user
                            ?
                            <>

                                {
                                    notifications.length > 0 &&
                                    <Dropdown className='align-items-center d-flex pointerCursor' drop={'start'}>
                                        <Dropdown.Toggle as='span' align='end' variant={`${themeValue}`} id="dropdown-basic">
                                            <img className='notiIcon' src={themeValue === 'light' ?
                                                'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678964675/bell_2_fv0pon.png'
                                                :
                                                'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678964740/bell_2_dark_apmevk.png'
                                            } alt="" /> <Badge bg='danger'>{notifications.length}</Badge>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu align='start' variant={`${themeValue}`} className={`${themeValue} m-3`}>
                                            {notifications.map(elm => (
                                                <Dropdown.Item onClick={() => handleNotification(elm)} as={'span'} key={elm._id}>
                                                    <p className='my-2'>You have a new comment on {elm.quiz.theme} quiz</p>
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }

                                <Dropdown className='mx-5' drop={'start'}>
                                    <Dropdown.Toggle as='span' align='end' variant="secondary">
                                        <img className={`${themeValue} navAvatar pointerCursor`} src={user ? user.avatar : ''} alt="profile" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align='start' variant={`${themeValue}`} className={`${themeValue}  mx-3 my-3`}>
                                        <Dropdown.Item as={'span'}>
                                            <Link to={`/profile/${user?._id}`}>
                                                <Nav.Link as="span" >
                                                    <img className='navIcons me-3' src={themeValue === 'light' ?
                                                        'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678794002/user_lcaahi.png'
                                                        : 'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678794005/userdark_sam2dj.png'}
                                                        alt='profile icon' />
                                                    My Profile</Nav.Link>
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item as={'span'}>
                                            <Link to={`/profile/edit/${user?._id}`}>
                                                <Nav.Link as="span" >
                                                    <img className='navIcons me-3' src={themeValue === 'light' ?
                                                        'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678793758/settings_bsla16.png'
                                                        : 'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678793759/settingsDark_s71the.png'}
                                                        alt='edit profile icon' />
                                                    Edit Profile</Nav.Link>
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item as={'span'}>
                                            <Link >
                                                <Nav.Link as="span" onClick={switchTheme}>
                                                    <img className='navIcons me-3' src={themeValue === 'light' ?
                                                        'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678794164/moon_zaai1r.png'
                                                        : 'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678794166/sun_1_uumeli.png'}
                                                        alt='theme icon' />
                                                    {themeText}</Nav.Link>
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item as={'span'}>
                                            <Link to="/">
                                                <Nav.Link as="span" onClick={logout}>
                                                    <img className='navIcons me-3' src={themeValue === 'light' ?
                                                        'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678793753/exit_uzwdji.png'
                                                        : 'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678793755/exitwhite_a4mp3h.png'}
                                                        alt='logout icon'
                                                    />Log Out</Nav.Link>
                                            </Link>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </>
                            :
                            <>
                                <Link >
                                    <Nav.Link as="span" onClick={switchTheme}>
                                        <img className='navIcons me-3' src={themeValue === 'light' ?
                                            'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678794164/moon_zaai1r.png'
                                            : 'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678794166/sun_1_uumeli.png'}
                                            alt='theme icon' />
                                        {themeText}</Nav.Link>
                                </Link>
                                <Link to="/login">
                                    <Nav.Link as="span">Log In</Nav.Link>
                                </Link>
                                <Link to="/signup" className='me-5'>
                                    <Nav.Link as="span">Sign Up</Nav.Link>
                                </Link>
                            </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default NavBar;