import { Link, useNavigate } from "react-router-dom";

import "../styles/AdminSidebar.css";

function AdminSidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <aside className="admin-sidebar">

      <div className="sidebar-top">

        <h2 className="admin-logo">
          Admin Panel
        </h2>

        <nav className="admin-menu">

          <Link
            to="/admin"
            className="admin-link"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/usuarios"
            className="admin-link"
          >
            Usuarios
          </Link>

          <Link
            to="/admin/hoteles"
            className="admin-link"
          >
            Hoteles
          </Link>

          <Link
            to="/admin/reservas"
            className="admin-link"
          >
            Reservas
          </Link>

        </nav>

      </div>

      <button
        onClick={logout}
        className="logout-admin"
      >

        Cerrar sesión

      </button>

    </aside>

  );

}

export default AdminSidebar;