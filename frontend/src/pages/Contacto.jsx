import Navbar from "../components/Navbar";

import "../styles/Contacto.css";

function Contacto() {

  return (

    <div className="contacto-page">

      <Navbar />

      {/* HERO */}

      <section className="contacto-hero">

        <div className="contacto-overlay">

          <h1>
            Contáctanos
          </h1>

          <p>
            Estamos disponibles 24/7
            para ayudarte con tus reservas,
            hoteles y experiencias.
          </p>

        </div>

      </section>

      {/* CONTENIDO */}

      <section className="contacto-container">

        {/* INFO */}

        <div className="contacto-info">

          <h2>
            Información de contacto
          </h2>

          <div className="info-card">

            <h3>
              📍 Dirección
            </h3>

            <p>
              Bogotá D.C, Colombia
            </p>

          </div>

          <div className="info-card">

            <h3>
              📞 Teléfono
            </h3>

            <p>
              +57 300 000 0000
            </p>

          </div>

          <div className="info-card">

            <h3>
              ✉️ Correo
            </h3>

            <p>
              contacto@gestorhoteles.com
            </p>

          </div>

          <div className="info-card">

            <h3>
              🕒 Horario
            </h3>

            <p>
              Atención 24 horas
            </p>

          </div>

        </div>

        {/* FORM */}

        <div className="contacto-form-card">

          <h2>
            Envíanos un mensaje
          </h2>

          <form className="contacto-form">

            <input
              type="text"
              placeholder="Nombre completo"
            />

            <input
              type="email"
              placeholder="Correo electrónico"
            />

            <input
              type="text"
              placeholder="Asunto"
            />

            <textarea
              placeholder="Escribe tu mensaje..."
            />

            <button>
              Enviar mensaje
            </button>

          </form>

        </div>

      </section>

    </div>

  );

}

export default Contacto;