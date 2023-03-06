import { useContext } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import '../NavBar/NavBar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import logo from '../../assets/img/CapyQuiz.png'

function NavBar() {

    const { user, logout } = useContext(AuthContext)

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
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
                                <Link to="/">
                                    <Nav.Link as="span" onClick={logout}>Log Out</Nav.Link>
                                </Link>
                                <Link to={`/profile/${user?._id}`}>
                                    <img className='navAvatar' src={user?.avatar} alt="profile" />
                                </Link>


                            </>
                            :
                            <>
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