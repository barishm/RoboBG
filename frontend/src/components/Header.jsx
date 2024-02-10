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
                <Navbar.Text >{lang === "en" ? <>Signed in as:</> : <>Вписан като:</>}</Navbar.Text>
                <Col xs="auto" style={{ display: "flex", alignItems: "center" }} className="ms-2">
                  <div className="dropdown">
                    <button
                      className="btn btn-dark dropdown-toggle btn-sm rounded-3"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <strong>@{username}</strong>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={logoutUser}>
                        {lang === "en" ? <>Sign out</> : <>Отписване</>}
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={goToProfile}>
                        {lang === "en" ? <>Profile</> : <>Профил</>}
                        </button>
                      </li>
                    </ul>
                  </div>
                </Col>
              </>
            ) : (
              <Col xs="auto">
                <Button variant="dark" size="sm" className="rounded-3" onClick={handleLogin}>
                {lang === "en" ? <>Sign in</> : <>Впиши се</>}
                </Button>
              </Col>
            )}
            <div className="dropdown" style={{ display: "flex", alignItems: "center" }}>
            <button className="btn btn-dark btn-sm ms-2 rounded-3 dropdown-toggle" data-bs-toggle="dropdown"><i className="fa-solid fa-globe" style={{color:"#ffffff"}}></i>{lang === "en" ? <> English</> : <> Български</>}</button>
            <ul className="dropdown-menu">
              {lang === "en" ? <li>
                        <button className="dropdown-item" onClick={() => handleChangeLanguage('bg')}>
                          Български
                        </button>
                      </li> : <li>
                        <button className="dropdown-item" onClick={() => handleChangeLanguage('en')}>
                          English
                        </button>
                      </li>}
                    </ul>
            </div>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
