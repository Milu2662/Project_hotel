import {
  Link
} from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href = "/";
  };

  return (

    <nav className="navbar">

      {/* LOGO */}

      <div className="navbar-logo">

        <Link to="/">
          Gestor Hoteles BD
        </Link>

      </div>

      {/* LINKS */}

      <div className="navbar-links">

        <Link to="/">
          Inicio
        </Link>

        <Link to="/hoteles">
          Hoteles
        </Link>

        <Link to="/ofertas">
          Ofertas
        </Link>

        <Link to="/contacto">
          Contacto
        </Link>

        {user && (

          <Link to="/mis-reservas">
            Mis Reservas
          </Link>

        )}

      </div>

      {/* AUTH */}

      <div className="navbar-auth">

        {!user ? (

          <>

            {
  !localStorage.getItem("token") ? (

    <>

      <Link to="/login">
        Login
      </Link>

      <Link to="/registro">
        Registro
      </Link>

    </>

  ) : (

    <>

      <Link to="/mis-reservas">
        Mis Reservas
      </Link>

      <button
        className="logout-btn"
        onClick={() => {

          localStorage.removeItem("token");

          localStorage.removeItem("user");

          window.location.href = "/";

        }}
      >

        Cerrar sesión

      </button>

    </>

  )
}

          </>

        ) : (

          <button
            onClick={logout}
            className="logout-btn"
          >

            Cerrar sesión

          </button>

        )}

      </div>

    </nav>

  );

}

export default Navbar;