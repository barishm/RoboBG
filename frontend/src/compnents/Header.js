import {Link} from "react-router-dom";

const Header = () => {

    return (
      <nav class="navbar navbar-expand-sm bg-body-tertiary">
      <div class="container-fluid">
        <Link class="navbar-brand" href="#">RoboBG</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link class="nav-link active" aria-current="page" to="/">Начало</Link>
            <Link class="nav-link" to="/compare">Сравни Роботи</Link>
          </div>
        </div>
      </div>
    </nav>
    );


}
export default Header;