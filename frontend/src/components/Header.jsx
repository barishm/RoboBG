import { Navbar, Nav, Container, Button, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../app/redux/authSlice";
import { setLanguage } from "../app/redux/languageSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { username, role } = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.language.lang);

  const navigate = useNavigate();

  const handleChangeLanguage = (language) => {
    dispatch(setLanguage(language));
  };

  const handleLogin = () => {
    navigate("/login"); // Navigate to /login
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const logoutUser = () => {
    dispatch(logOut());
  };

  return (
    <Navbar expand="md" className="bg-white">
      <Container>
        <Navbar.Brand href="/">RoboBG</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>{lang === "en" ? <>Home</> : <>Начало</>}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/robots">
              <Nav.Link>{lang === "en" ? <>All Robots</> : <>Всички роботи</>}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/compare">
              <Nav.Link>{lang === "en" ? <>Compare</> : <>Сравни</>}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>{lang === "en" ? <>Contact us</> : <>Контакти</>}</Nav.Link>
            </LinkContainer>
            {(role === "ADMIN" || role === "MODERATOR") && (
              <LinkContainer to="/dashboard">
                <Nav.Link>{lang === "en" ? <>Dashboard</> : <>Табло за управление</>}</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Nav className="ms-auto">
            {username ? (
              <>
                <Col xs="auto" style={{ display: "flex", alignItems: "center" }}>
                  <div className="dropdown">
                    <img className="dropdown-toggle rounded-3 me-md-1" data-bs-toggle="dropdown" aria-expanded="false"  style={{width:"45px",height:"45px",cursor: 'pointer'}} src="images/user2.jpg" />
                    <ul className="dropdown-menu">
                      <li>
                        <span className="dropdown-item-text">@{username}</span>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={logoutUser}>
                        {lang === "en" ? <>Sign out</> : <>Отписване</>}
                        </button>
                      </li>
                    </ul>
                  </div>
                </Col>
              </>
            ) : (
              <Col xs="auto">
                <Button variant="light" size="md" className="rounded-5 mb-2 mb-md-0 me-md-2" onClick={handleLogin}>
                {lang === "en" ? <>Sign in</> : <>Впиши се</>}
                </Button>
              </Col>
            )}
            <div className="dropdown" style={{ display: "flex", alignItems: "center" }}>
            <button className="btn btn-light rounded-5 dropdown-toggle" data-bs-toggle="dropdown"><i className="fa-solid fa-globe" style={{color:"rgb(60,60,60)"}}></i></button>
            <ul className="dropdown-menu">
              <li>
                        <button className="dropdown-item" onClick={() => handleChangeLanguage('bg')}>
                          Български
                        </button>
                      </li> <li>
                        <button className="dropdown-item" onClick={() => handleChangeLanguage('en')}>
                          English
                        </button>
                      </li>
                    </ul>
            </div>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
