import { Navbar, Nav, Container, Button, Col } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { logOut } from '../app/redux/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const {username,role} = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Navigate to /login
  };

  const goToProfile = () => {
    navigate('/profile');
  }

  const logoutUser = () => {
    dispatch(logOut());
  }

  return (
    <Navbar expand="md" className="bg-white">
      <Container>
        <Navbar.Brand href="/">RoboBG</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/robots">
            <Nav.Link>All Robots</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/compare">
            <Nav.Link>Compare</Nav.Link>
            </LinkContainer>
            {role && role === "ADMIN" || role && role === "MODERATOR" &&(
              <LinkContainer to="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Nav className="ms-auto">
          {username ? (<>
              <Navbar.Text className="me-3">
              Signed in as:
            </Navbar.Text>
              <Col xs="auto">
              <div className="dropdown">
                <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <strong>@{username}</strong>
                </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={logoutUser}>Sign out</button></li>
                <li><button className="dropdown-item" onClick={goToProfile}>Profile</button></li>
              </ul>
              </div>
              </Col>
              </>
            ) : (
              <Col xs="auto">
              <Button variant="dark" onClick={handleLogin}>Sign In</Button>
              </Col>
            )}
      </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
);


}
export default Header;