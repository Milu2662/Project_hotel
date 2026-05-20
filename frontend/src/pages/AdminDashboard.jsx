import "../styles/AdminDashboard.css";

import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {

  return (

    <div className="dashboard-page">

      <div className="admin-layout">

        <AdminSidebar />

        <main className="dashboard-content">

          <div className="dashboard-header">

            <h1>
              Panel Administrativo
            </h1>

            <p>
              Gestiona hoteles,
              reservas y usuarios.
            </p>

          </div>

          <div className="dashboard-cards">

            <div className="dashboard-card">

              <h2>
                Reservas
              </h2>

              <p>
                Administra reservas
                y extras.
              </p>

            </div>

            <div className="dashboard-card">

              <h2>
                Usuarios
              </h2>

              <p>
                Gestiona clientes,
                admins y recepcionistas.
              </p>

            </div>

            <div className="dashboard-card">

              <h2>
                Hoteles
              </h2>

              <p>
                Crea hoteles y
                habitaciones.
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>

  );

}

export default AdminDashboard;