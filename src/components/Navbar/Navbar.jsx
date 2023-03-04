
import { useContext } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const NavBar = () => {

    const { user, logout } = useContext(AuthContext)


    return (
        <Navbar bg='dark' variant='dark' expand="md" className='mb-4'>
            <Navbar.Brand href="#home">Quiz App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/">
                        <Nav.Link as="span">Home</Nav.Link>
                    </Link>
                    {
                        user
                            ?
                            <>
                                <Link to="/">
                                    <Nav.Link as="span" onClick={logout}>Log Out</Nav.Link>
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
    )
}

export default NavBar