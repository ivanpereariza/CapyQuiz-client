import { useContext } from 'react'
import { Dropdown, Nav, Navbar } from 'react-bootstrap'
import '../NavBar/NavBar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import logo from '../../assets/img/CapyQuiz.png'
import { ThemeContext } from '../../contexts/theme.context'

function NavBar() {

    const { user, logout } = useContext(AuthContext)
    const { themeValue, switchTheme } = useContext(ThemeContext)
    const themeText = themeValue === 'light' ? '☾ Dark Mode' : '☼ Light Mode'

    return (
        <Navbar collapseOnSelect expand="lg" variant={themeValue} className={`${themeValue} navbar`} >
            <Navbar.Brand >
                <Link to='/'>
                    <img className='navBrand' src={logo} alt="logo" />
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/">
                        <Nav.Link as="span">Home</Nav.Link>
                    </Link>
                    <Link to="/quizzes">
                        <Nav.Link as="span">Quizzes</Nav.Link>
                    </Link>
                    {
                        user
                            ?
                            <Link to="/quizzes/create">
                                <Nav.Link as="span" >Create Quiz</Nav.Link>
                            </Link>
                            :
                            null
                    }
                </Nav>
                <Nav>

                    {
                        user
                            ?
                            <>
                                <Link>
                                    <Dropdown className='mx-5' drop={'start'}>
                                        <Dropdown.Toggle as='span' align='end' variant="secondary">
                                            <img className='navAvatar' src={user?.avatar} alt="profile" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu align='start' variant={`${themeValue}`} className={`${themeValue}  mx-3 my-3`}>
                                            <Dropdown.Item as={'span'}>
                                                <Link to={`/profile/${user?._id}`}>
                                                    <Nav.Link as="span" >My Profile</Nav.Link>
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item as={'span'}>
                                                <Link to={`/profile/edit/${user?._id}`}>
                                                    <Nav.Link as="span" >Edit Profile</Nav.Link>
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item as={'span'}>
                                                <Link >
                                                    <Nav.Link as="span" onClick={switchTheme} className="d-flex">{themeText}</Nav.Link>
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item as={'span'}>
                                                <Link to="/">
                                                    <Nav.Link as="span" onClick={logout}>Log Out</Nav.Link>
                                                </Link>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Link>

                            </>
                            :
                            <>
                                <Link >
                                    <Nav.Link as="span" onClick={switchTheme} className="d-flex">{themeText}</Nav.Link>
                                </Link>
                                <Link to="/login">
                                    <Nav.Link as="span">Log In</Nav.Link>
                                </Link>
                                <Link to="/signup">
                                    <Nav.Link as="span">Sign Up</Nav.Link>
                                </Link>
                            </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;