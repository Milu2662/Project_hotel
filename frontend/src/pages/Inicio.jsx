import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import "../styles/Inicio.css";

function Inicio() {

  const token =
    localStorage.getItem("token");

  return (

    <div className="inicio-page">

      <Navbar />

      {/* HERO */}

      <section className="inicio-hero">

        <div className="inicio-overlay">

          <div className="inicio-content">

            <span className="inicio-badge">
              Luxury Hotels Experience
            </span>

            <h1>
              Encuentra el hotel perfecto
              para tus próximas vacaciones
            </h1>

            <p>
              Reserva hoteles premium,
              suites exclusivas y experiencias
              inolvidables en toda Colombia.
            </p>

            <div className="inicio-buttons">

              <Link
                to="/hoteles"
                className="hero-btn primary-btn"
              >
                Buscar hoteles
              </Link>

              {!token && (

                <Link
                  to="/register"
                  className="inicio-secondary-btn"
                >
                  Crear cuenta
                </Link>

              )}

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="features-section">

        <div className="feature-card">

          <h3>
            🏨 Hoteles premium
          </h3>

          <p>
            Descubre hoteles exclusivos
            con las mejores comodidades.
          </p>

        </div>

        <div className="feature-card">

          <h3>
            ⭐ Reservas rápidas
          </h3>

          <p>
            Reserva habitaciones en segundos
            desde cualquier lugar.
          </p>

        </div>

        <div className="feature-card">

          <h3>
            🌎 Experiencias únicas
          </h3>

          <p>
            Viaja por Colombia disfrutando
            lujo y confort.
          </p>

        </div>

      </section>

    </div>

  );

}

export default Inicio;