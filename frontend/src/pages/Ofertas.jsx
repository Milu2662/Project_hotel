import Navbar from "../components/Navbar";

import "../styles/Ofertas.css";

function Ofertas() {

  const ofertas = [
    {
      titulo: "30% OFF Cartagena",
      descripcion:
        "Reserva suites premium frente al mar y obtén descuentos exclusivos.",
      imagen:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      precio: "$450.000",
    },
    {
      titulo: "Desayuno Gratis",
      descripcion:
        "Obtén desayuno buffet incluido reservando 3 noches o más.",
      imagen:
        "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=2070&auto=format&fit=crop",
      precio: "$320.000",
    },
    {
      titulo: "Spa & Relax",
      descripcion:
        "Disfruta experiencias luxury con spa, jacuzzi y masajes.",
      imagen:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
      precio: "$600.000",
    },
  ];

  return (

    <div className="ofertas-page">

      <Navbar />

      {/* HERO */}

      <section className="ofertas-hero">

        <div className="hero-overlay">

          <h1>
            Ofertas Exclusivas
          </h1>

          <p>
            Descubre promociones únicas
            para tus próximas vacaciones.
          </p>

        </div>

      </section>

      {/* GRID OFERTAS */}

      <section className="ofertas-container">

        <h2>
          Promociones destacadas
        </h2>

        <div className="ofertas-grid">

          {ofertas.map((oferta, index) => (

            <div
              className="oferta-card"
              key={index}
            >

              <img
                src={oferta.imagen}
                alt={oferta.titulo}
              />

              <div className="oferta-info">

                <h3>
                  {oferta.titulo}
                </h3>

                <p>
                  {oferta.descripcion}
                </p>

                <span>
                  Desde {oferta.precio}
                </span>

                <button>
                  Reservar ahora
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>

  );

}

export default Ofertas;