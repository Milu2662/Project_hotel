import { useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import "../styles/AdminDashboard.css";
import "../styles/AdminSidebar.css";

function Admin() {

  const navigate = useNavigate();

  useEffect(() => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (
      !user ||
      user.id_tipo_usuario !== 2
    ) {

      navigate("/login");

    }

  }, [navigate]);

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}

      <aside className="admin-sidebar">

        <div>

          <h2 className="admin-logo">
            Admin Panel
          </h2>

          <nav className="admin-menu">

            <Link
              to="/admin"
              className="admin-link active"
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
          className="logout-admin"
          onClick={logout}
        >
          Cerrar sesión
        </button>

      </aside>

      {/* MAIN */}

      <main className="admin-main">

        <div className="admin-header">

          <h1>
            Gestión Hotelera
          </h1>

          <p>
            Administra reservas,
            usuarios y hoteles
            desde un solo lugar.
          </p>

        </div>

        {/* STATS */}

        <div className="admin-stats">

          <div className="admin-card">

            <h2>👥</h2>

            <p>
              Gestión completa
              de usuarios
            </p>

          </div>

          <div className="admin-card">

            <h2>🏨</h2>

            <p>
              Administración
              de hoteles
            </p>

          </div>

          <div className="admin-card">

            <h2>📅</h2>

            <p>
              Control total
              de reservas
            </p>

          </div>

        </div>

        {/* TABLE */}

        <div className="admin-table-container">

          <h2>
            Accesos rápidos
          </h2>

          <table className="admin-table">

            <thead>

              <tr>

                <th>
                  Módulo
                </th>

                <th>
                  Acción
                </th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>
                  Usuarios
                </td>

                <td>

                  <Link
                    to="/admin/usuarios"
                  >
                    Ir al módulo
                  </Link>

                </td>

              </tr>

              <tr>

                <td>
                  Hoteles
                </td>

                <td>

                  <Link
                    to="/admin/hoteles"
                  >
                    Ir al módulo
                  </Link>

                </td>

              </tr>

              <tr>

                <td>
                  Reservas
                </td>

                <td>

                  <Link
                    to="/admin/reservas"
                  >
                    Ir al módulo
                  </Link>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </main>

    </div>

  );

}

export default Admin;